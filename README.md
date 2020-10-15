# VDA 5050 Command Line Interface

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![release](https://img.shields.io/badge/release-Conventional%20Commits-yellow.svg)](https://conventionalcommits.org/)
[![npm version](https://badge.fury.io/js/vda-5050-cli.svg)](https://www.npmjs.com/package/vda-5050-cli)

## Table of Contents

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
  * [Broker](#broker)
  * [JSON schema](#json-schema)
* [Contributing](#contributing)
* [License](#license)

## Introduction

This package provides a command line interface (CLI) with tools useful for
developing client applications based on [VDA 5050](https://www.vda.de/)
"Interface for the communication between automated guided vehicles (AGV) and a
master control":

* Start an MQTT broker for development testing (not intended for use in a
  production environment).
* Create type definitions for various programming languages from predefined VDA
  5050 JSON schemas or from your custom schemas. Useful for defining VDA 5050
  (extension) object types in your application.
* Export VDA 5050 JSON schemas for a specific VDA 5050 specification version. To
  be used in your client application, e.g. by a code generator tool that creates
  code for validating VDA 5050 topic payloads before publishing or upon receipt.

The CLI can be used independently of or in combination with the
[vda-5050](https://www.npmjs.com/package/vda-5050) npm package, a
library for implementing VDA 5050 clients in TypeScript/JavaScript.

## Installation

Ensure that [Node.js](https://nodejs.org) version 10 or newer is installed.

Install the latest package version globally as follows:

```sh
npm install -g vda-5050-cli
```

## Usage

This command line tool accepts the following commands and options:

```text
$ vda-5050 -h

          ______   _______    _______  _______  _______  _______
|\     /|(  __  \ (  ___  )  (  ____ \(  __   )(  ____ \(  __   )
| )   ( || (  \  )| (   ) |  | (    \/| (  )  || (    \/| (  )  |
| |   | || |   ) || (___) |  | (____  | | /   || (____  | | /   |
( (   ) )| |   | ||  ___  |  (_____ \ | (/ /) |(_____ \ | (/ /) |
 \ \_/ / | |   ) || (   ) |        ) )|   / | |      ) )|   / | |
  \   /  | (__/  )| )   ( |  /\____) )|  (__) |/\____) )|  (__) |
   \_/   (______/ |/     \|  \______/ (_______)\______/ (_______)

Usage: vda-5050 [command] [options]

Commands:
  vda-5050 broker  Starts MQTT broker for TCP and WS protocols. For available options, use -h
  vda-5050 schema  Creates programming language specific types from VDA 5050 or custom JSON
                   schemas. For available options, use -h

General Options:
  -q, --quiet    Suppress banner                                                        [boolean]
  -v, --version  Show version number                                                    [boolean]
  -h, --help     Show help                                                              [boolean]

For more information, visit https://github.com/coatyio/vda-5050-cli.js
```

### Broker

```text
$ vda-5050 broker -h -q
vda-5050 broker

Starts MQTT broker for TCP and WS protocols. For available options, use -h

Broker Options
  -p, --port          the TCP port to listen to                          [number] [default: 1883]
      --ws-port       the Websocket port to listen to                    [number] [default: 9883]
      --verbose       set the log level to INFO                        [boolean] [default: false]
      --very-verbose  set the log level to DEBUG                       [boolean] [default: false]
  -c, --config        the config file to use. For details, see
                      https://github.com/coatyio/vda-5050-cli.js/blob/master/lib/broker.config.js
                                                                                         [string]
```

Some examples:

```sh
# Start MQTT broker on default TCP port (1883) and Websocket port (9883).
# Type Ctrl + C to stop the broker.
vda-5050 broker

# Start MQTT broker on specific TCP and Websocket ports.
vda-5050 broker -p 4242 --ws-port 4000

# Start MQTT broker with custom configuration file.
# Put (only) the options to override in a JSON or JavaScript config file.
# All options and their default values are defined here:
# https://github.com/coatyio/vda-5050-cli.js/blob/master/lib/broker.config.js
vda-5050 broker -c ~/vda-5050-broker.config.js
```

### JSON schema

```text
$ vda-5050 schema -h -q
vda-5050 schema

Creates programming language specific types from predefined VDA 5050 or custom JSON schemas. For
available options, use -h

Schema Options
  -l, --lang    the target language, e.g. ts (default), js, swift, py, rb, java, go, cs, cpp, ...
                Specify json to export raw JSON schemas                                  [string]
  -V, --vda     the VDA 5050 specification version to use (default latest)
                Specify * to list all available versions                                 [string]
  -s, --schema  the (glob) path to custom JSON schema file(s)                            [string]
  -o, --out     the path to the output file or folder                                    [string]
  -c, --config  the config file with (additional) options to use. For details, see
                https://github.com/coatyio/vda-5050-cli.js/blob/master/lib/schema.config.js
                                                                                         [string]
```

Some examples:

```sh
# List all available VDA 5050 schema versions.
vda-5050 schema --vda *

# Create TypeScript type definitions for the latest VDA 5050 specification version.
# Output is written to vda-5050-types.ts in the current working directory.
vda-5050 schema

# Create Swift type definitions for VDA 5050 specification version 2.0.
# Output is written to vda-5050-types.swift in the current working directory.
vda-5050 schema --lang swift --vda 2.0

# Create Python type definitions for latest VDA 5050 specification version
# in the output file custom.py under src/types.
vda-5050 schema --lang py --out src/types/custom

# Create Java type definitions from your custom JSON schemas in the
# output file custom.java under src/types.
# The input schema path supports glob patterns to specify multiple schema files,
# for details, see https://github.com/mrmlnc/fast-glob#pattern-syntax
# Use forward slash path syntax for input schemas, even on Windows.
vda-5050 schema -l java -s myschemas/**/*.schema.json -o src/types/custom

# Create type definitions using options from a configuration file.
# Put (only) the options to override in a JSON or JavaScript config file.
# All options and their default values are defined here:
# https://github.com/coatyio/vda-5050-cli.js/blob/master/lib/schema.config.js
vda-5050 schema  -c ~/vda-5050-scheme.config.js

# Export VDA 5050 schema definitions for specification version 2.0 into
# the given output folder.
vda-5050 schema -l json --vda 2.0 -o vda-5050/v2.0
```

Within your custom JSON schemas you can reference any common schema definition
of any available VDA 5050 specification version as follows:

```json
{ "$ref": "http://vda-5050-schema.org/v<VDA 5050 spec version number>/common.schema.json#/definitions/<def>" }
```

Common VDA 5050 schema definitions are version specific. To see available
definitions, export the VDA JSON schemas in question as shown in the example
above and inspect the file `common.schema.json`.

For example, to combine the common header properties defined in VDA 5050
specification version 2.0 into your schema, use the `allOf` keyword like this:

```json
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "mycustomobject",
    "type": "object",
    "allOf": [
        {
            "$ref": "http://vda-5050-schema.org/v2.0/common.schema.json#/definitions/header"
        },
        {
            "properties": {
                "myCustomProperty1": {
                    "type": "string",
                },
            }
        }
    ]
}
```

## Contributing

If you like this package, please consider &#x2605; starring [the project on
github](https://github.com/coatyio/vda-5050-cli.js). Contributions are welcome
and appreciated.

To release a new version of this package, run `npm run release`. This includes
automatic version bumping, generation of a conventional changelog based on git
commit history, git tagging and pushing the release, and publishing the package
on npm registry. For a dry test run, invoke `npm run release:dry`.

## License

Code and documentation copyright 2020 Siemens AG.

Code is licensed under the [MIT License](https://opensource.org/licenses/MIT).

Documentation is licensed under a
[Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/).
