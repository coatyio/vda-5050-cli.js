/*! Copyright (c) 2020 Siemens AG. Licensed under the MIT License. */

const fs = require("fs");
const glob = require("fast-glob");
const path = require("path");
const {
    quicktypeMultiFile,
    InputData,
    JSONSchemaInput,
    JSONSchemaStore,
} = require("quicktype-core");

const vda5050SchemaIdUri = "http://vda-5050-schema.org/";

/**
 * Generate programming language specific type definitions from given JSON schemas.
 *
 * @param {object} options the object of options as defined in `schema.config.js` (required)
 */
async function jsonSchemaToLang(options) {
    const [schemas, vdaVersion] = resolveInputSchemas(options);

    if (options.lang === "json") {
        fs.mkdirSync(options.out, { recursive: true });
        schemas.forEach(s => fs.writeFileSync(path.join(options.out, path.basename(s.file)), s.asString));
        if (!options.schema) {
            return `Exported ${schemas.length} VDA 5050 JSON schemas (${vdaVersion}) to folder '${options.out}'.`;
        }
        return `Exported ${schemas.length} JSON schemas to folder '${options.out}'.`;
    }

    const schemaInput = new JSONSchemaInput(new JSONSchemaStore());

    schemas.forEach(s => schemaInput.addSourceSync({ name: "", schema: s.asString }));

    const inputData = new InputData();
    inputData.addInput(schemaInput);

    const quickTypeOptions = {
        inputData,
        lang: options.lang,
        alphabetizeProperties: false,
        leadingComments: options.header || undefined,
        rendererOptions: options.langOptions,
    };

    // quicktype automatically squashes multiple generated output files into 
    // one file if the given target language supports it.
    const result = await quicktypeMultiFile(quickTypeOptions);

    if (result.get("stdout")) {
        const langExt = "." + options.lang;
        let outFile = options.out;
        if (!outFile.endsWith(langExt)) {
            outFile += langExt;
        }
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, result.get("stdout").lines.join("\n"));
        return `Generated file '${outFile}' from ${schemas.length} JSON schemas.`;
    } else {
        result.forEach((out, file) => {
            fs.mkdirSync(options.out, { recursive: true });
            fs.writeFileSync(path.join(options.out, file), out.lines.join("\n"));
        });
        return `Generated ${result.size} files in folder '${options.out}' from ${schemas.length} JSON schemas.`;
    }
}

function resolveInputSchemas(options) {
    const version = "v" + resolveVdaVersion(options.vda, options.vda5050SchemaDir);
    const schemas = [];

    // Glob expressions only accept POSIX-style syntax (even on Windows platforms).
    const schemaFiles = glob.sync(
        options.schema ?
            // Do not auto-convert backslashes as they denote escape characters in fast-glob.
            options.schema :
            path.join(options.vda5050SchemaDir, version, "*.schema.json").replace(/\\/g, "/"),
        { absolute: true });

    if (schemaFiles.length === 0) {
        throw new Error(options.schema ?
            "Failed to generate output types: No input JSON schemas found." :
            "Failed to generate output types: No VDA 5050 JSON schemas found."
        );
    }
    schemaFiles.forEach(file => {
        // Ensure uniform path delimiters, so file names can be compared lateron.
        file = path.resolve(file);
        schemas.push({ file, asString: fs.readFileSync(file, "utf-8") });
    });

    if (options.schema) {
        // Add all VDA 5050 JSON schemas which are referenced by custom schemas using $ref.
        const escapeRegex = s => s.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");
        let vda5050RefRegex = new RegExp(`"\\$ref":\\s*"${escapeRegex(vda5050SchemaIdUri)}(v\\d+.\\d+(?:.\\d+)?/\\S+\\.schema\\.json)#/\\S*"`, "gm");
        for (const schema of schemas) {
            for (const match of schema.asString.matchAll(vda5050RefRegex)) {
                const file = path.resolve(options.vda5050SchemaDir, match[1]);
                if (!schemas.some(s => s.file === file) && fs.existsSync(file)) {
                    schemas.push({ file, asString: fs.readFileSync(file, "utf-8") });
                }
            }
        }
    }

    return [schemas, version];
}

function resolveVdaVersion(version, vda5050SchemaDir) {
    const availableVersions = fs.readdirSync(vda5050SchemaDir, { withFileTypes: true })
        .filter(entry => entry.isDirectory())
        .map(entry => entry.name.substring(1))
        .sort();
    if (version === "*") {
        console.log(`Available VDA 5050 schema versions: ${availableVersions.join(",")} (latest)`);
        process.exit();
    } else if (version === "latest") {
        version = availableVersions[availableVersions.length - 1];
    } else {
        if (!availableVersions.includes(version)) {
            throw new Error(`Invalid VDA 5050 schema version specified. Available versions: ${availableVersions.join(",")} (latest)`);
        }
    }
    return version;
}

module.exports = jsonSchemaToLang;
