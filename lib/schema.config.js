/*! Copyright (c) 2020 Siemens AG. Licensed under the MIT License. */

// Default configuration options for vda-5050-cli schema command.
//
// Configuration options can be represented in a JSON file or in a
// JavaScript file with options exported by `module.exports = {
// ...<configOptions> }`.
module.exports = {

    // The target programming language for the type definitions to be generated.
    //
    // Specify the file extension of the target language, e.g. ts (default), js,
    // swift, py, rb, java, go, cs, cpp. Specify json to export raw JSON
    // schemas.
    //
    // You can fine-tune code generation by the option "langOptions".
    //
    // All supported languages are listed here:
    // https://github.com/quicktype/quicktype#target-languages
    lang: "ts",

    // The VDA 5050 specification version to use.
    //
    // Only effective if the "schema" option is specified as null.
    //
    // Specify the latest available version by "latest" (default) or any
    // specific available version number, e.g. "1.1". Specify "*" to list 
    // all available versions.
    vda: "latest",

    // The (glob) path to custom JSON schema file(s).
    //
    // Only effective if not specified as null, otherwise the JSON schemas for
    // the given VDA 5050 specification version are used (see option "vda").
    //
    // Within your custom schemas you can reference common schema definitions of
    // any available VDA 5050 sepcification version as follows:
    //
    // { "$ref": "http://vda-5050-schema.org/v1.1/common.schema.json#/definitions/header" }
    //
    // The above example refers to the common header properties defined in VDA
    // 5050 specification version 1.1. You can combine this subschema into your
    // schema by using the "allOf" keyword.
    //
    // Use a glob pattern to specify multiple JSON schema input files, e.g.
    // "./schemas/**/*.json". For details on glob pattern syntax, see
    // https://github.com/mrmlnc/fast-glob#pattern-syntax
    //
    // Use POSIX-style path syntax with forward slashes, even on Windows
    // platforms, e.g. "C:/users/foo/BAR/baz/*.json" or
    // "./schema/**/*.schema.json". Use backslashes for escaping special
    // characters.
    schema: null,

    // The path to the output file (for single file output) or output folder
    // (for multiple files output).
    //
    // For single file output, if no file extension is given, a language
    // specific one is added automatically.
    //
    // For multiple files output, the directories on the output path are created
    // if they do not exist.
    //
    // Output files are overridden if they already exist.
    out: "vda-5050-types",

    // An array of commented lines to be included at the beginning of the
    // generated main output file.
    //
    // Specify null (default) to take over the default header comments added by
    // the code generation tool.
    //
    // Note: programming language specific comment delimiters for each specified
    // line are automatically added on generation.
    header: null,

    // Language-specific options to fine-tune source code generation.
    //
    // Supported options per language can be found here:
    // https://github.com/quicktype/quicktype/tree/master/src/quicktype-core/language
    //
    // Note that option keys are always specified using lower-case-dash syntax.
    langOptions: {

        // Uncomment this option if only type definitions should be generated,
        // but no converters/validators.
        // "just-types": true,
    },

    // Determines whether more precise language types should be inferred from
    // the input JSON schema based on the format keyword etc. All inference
    // options are turned off by default. Also, note that dates, UUIDs, and
    // stringified integers/booleans are not supported in all target languages.
    inferenceOptions: {

        // Whether to infer map types from JSON data
        inferMaps: false,

        // Whether to infer enum types from JSON data
        inferEnums: false,

        // Whether to convert UUID strings to UUID objects
        inferUuids: false,

        // Whether to assume that JSON strings that look like dates are dates
        inferDateTimes: false,

        // Whether to convert stringified integers to integers
        inferIntegerStrings: false,

        // Whether to convert stringified booleans to boolean values
        inferBooleanStrings: false,

        // Combine similar classes. This doesn't apply to classes from a schema, only from inference.
        combineClasses: false,

        // Whether to treat $ref as references within JSON
        ignoreJsonRefs: false
    },
};
