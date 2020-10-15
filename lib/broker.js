/*! Copyright (c) 2020 Siemens AG. Licensed under the MIT License. */

require("aedes-cli/lib/cli")(["ignore", "ignore", "start", "-c", process.argv[2]])
    .catch(error => {
        console.log(error.message);
        process.exit(1);
    });
