/*! Copyright (c) 2020 Siemens AG. Licensed under the MIT License. */

const { fork } = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
const yargs = require("yargs");

const brokerModulePath = require.resolve("./broker.js");
const vda5050SchemaDir = path.join(path.dirname(brokerModulePath), "../schema/");
const defaultBrokerConfig = require("./broker.config");
const defaultSchemaConfig = require("./schema.config");
const jsonSchemaToLang = require("./schema");
const pkg = require("../package.json");

// See https://patorjk.com/software/taag/#p=display&f=Epic&t=VDA%205050
const banner = String.raw`
          ______   _______    _______  _______  _______  _______ 
|\     /|(  __  \ (  ___  )  (  ____ \(  __   )(  ____ \(  __   )
| )   ( || (  \  )| (   ) |  | (    \/| (  )  || (    \/| (  )  |
| |   | || |   ) || (___) |  | (____  | | /   || (____  | | /   |
( (   ) )| |   | ||  ___  |  (_____ \ | (/ /) |(_____ \ | (/ /) |
 \ \_/ / | |   ) || (   ) |        ) )|   / | |      ) )|   / | |
  \   /  | (__/  )| )   ( |  /\____) )|  (__) |/\____) )|  (__) |
   \_/   (______/ |/     \|  \______/ (_______)\______/ (_______)
`;

const pargs = require("minimist")(process.argv.slice(2));

const quietOptionAlias = { shortName: "q", longName: "quiet" };
const shouldShowBanner = !pargs[quietOptionAlias.shortName] && !pargs[quietOptionAlias.longName];
const debugOptionAlias = { shortName: "d", longName: "debug" };
const shouldDebug = pargs[debugOptionAlias.shortName] || pargs[debugOptionAlias.longName];

if (shouldShowBanner) {
    console.log(banner);
}

yargs
    .wrap(Math.max(80, Math.min(100, yargs.terminalWidth())))
    .version()
    .alias("v", "version")
    .help()
    .alias("h", "help")
    .usage("Usage: $0 [command] [options]")
    .epilog(`For more information, visit ${pkg.homepage}`)
    .updateStrings({ "Options:": "General Options:" })
    .option({
        [quietOptionAlias.longName]: {
            alias: quietOptionAlias.shortName,
            description: "Suppress banner",
            type: "boolean",
            global: true,
        }
    })
    .option({
        [debugOptionAlias.longName]: {
            alias: debugOptionAlias.shortName,
            description: "Show stack trace on error",
            type: "boolean",
            global: true,
            hidden: true,
        }
    })
    .demandCommand(1)   // Show help if no command is given.
    .strictCommands()   // Raise error and show help if unknown command is given.
    .recommendCommands()
    .command({
        command: "broker",
        description: "Starts MQTT broker for TCP and WS protocols. For available options, use -h",
        builder: () => {
            const group = "Broker Options";
            return yargs
                .option(
                    {
                        "port": {
                            alias: "p",
                            description: "the TCP port to listen to",
                            type: "number",
                            default: 1883,
                            group,
                        },
                        "ws-port": {
                            description: "the Websocket port to listen to",
                            type: "number",
                            default: 9883,
                            group,
                        },
                        "verbose": {
                            description: "set the log level to INFO",
                            type: "boolean",
                            default: false,
                            group,
                        },
                        "very-verbose": {
                            description: "set the log level to DEBUG",
                            type: "boolean",
                            default: false,
                            group,
                        },
                        "config": {
                            alias: "c",
                            description: `the config file to use. For details, see ${pkg.repository.url}/blob/master/lib/broker.config.js`,
                            type: "string",
                            group,
                        },
                    },
                )
                .strictOptions();
        },
        handler: args => startBroker(args),
    })
    .command({
        command: "schema",
        description: "Creates programming language specific types from predefined VDA 5050 or custom JSON schemas. For available options, use -h",
        builder: () => {
            const group = "Schema Options";
            return yargs
                .option(
                    {
                        "lang": {
                            alias: "l",
                            description: "the target language, e.g. ts (default), js, swift, py, rb, java, go, cs, cpp, ...\nSpecify json to export raw JSON schemas",
                            type: "string",
                            group,
                        },
                        "vda": {
                            alias: "V",
                            description: "the VDA 5050 specification version to use (default latest)\nSpecify \"*\" to list all available versions",
                            type: "string",
                            group,
                        },
                        "schema": {
                            alias: "s",
                            description: "the (glob) path to custom JSON schema file(s)",
                            type: "string",
                            group,
                        },
                        "out": {
                            alias: "o",
                            description: "the path to the output file or folder",
                            type: "string",
                            group,
                        },
                        "config": {
                            alias: "c",
                            description: `the config file with (additional) options to use. For details, see ${pkg.repository.url}/blob/master/lib/schema.config.js`,
                            type: "string",
                            group,
                        },
                    },
                )
                .strictOptions()
                .conflicts("vda", "schema");
        },
        handler: args => convertSchema(args),
    })
    // If a command failed do not show yargs help.
    .fail((msg, err, yargs) => {
        if (err) {
            if (shouldDebug || !(err instanceof Error)) {
                console.error(err);
            } else {
                console.error(`${err.name}: ${err.message}`);
            }
            throw err;
        }
        yargs.showHelp();
        console.log();
        console.log(msg);
        process.exit(1);
    })
    // Not invoked on commands that return a rejected promise. Instead, the
    // rejected value is output by yargs directly.
    .onFinishCommand(result => result === undefined || result === null || console.log(result))
    .parse();

function startBroker(args) {
    return new Promise((resolve) => {
        let config = args.config ? require(path.resolve(args.config)) : {};
        if (args.port !== undefined) {
            config.port = args.port;
        }
        if (args.wsPort !== undefined) {
            config.wsPort = args.wsPort;
        }
        if (args.verbose) {
            config.verbose = args.verbose;
        }
        if (args.veryVerbose) {
            config.veryVerbose = args.veryVerbose;
        }
        config = Object.assign({}, defaultBrokerConfig, config);

        const configFile = path.resolve(os.tmpdir(),
            `vda-5050-aedes-cli-${Math.random().toString(16).substr(2, 8)}.config.json`);

        fs.writeFileSync(configFile, JSON.stringify(config, null, 4), "utf-8");

        // Catch all ways Node.js might exit.
        process.once("uncaughtException", () => process.exit(1));
        process.once("SIGQUIT", () => process.exit());
        process.once("SIGTERM", () => process.exit());
        process.once("SIGINT", () => process.exit());
        process.once("exit", () => {
            try { fs.unlinkSync(configFile); } catch { }
        });

        fork(brokerModulePath, [configFile]).once("exit", () => resolve());
    });
}

function convertSchema(args) {
    const config = args.config ? require(path.resolve(args.config)) : {};

    if (args.lang) {
        config.lang = args.lang;
    }
    if (args.out) {
        config.out = args.out;
    }
    if (args.vda) {
        config.vda = args.vda;
    }
    if (args.schema) {
        config.schema = args.schema;
    }

    return jsonSchemaToLang(Object.assign({ vda5050SchemaDir }, defaultSchemaConfig, config));
}
