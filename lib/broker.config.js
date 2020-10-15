/*! Copyright (c) 2020 Siemens AG. Licensed under the MIT License. */

// Default configuration options for vda-5050-cli broker command.
//
// Configuration options can be represented in a JSON file or in a
// JavaScript file with options exported by `module.exports = {
// ...<configOptions> }`.
//
// For option details, see https://github.com/moscajs/aedes-cli#usage
module.exports = {
    // SERVERS
    protos: ["tcp", "ws"],
    host: "127.0.0.1",
    port: 1883,
    wsPort: 9883,
    wssPort: 4000,
    tlsPort: 8883,
    key: null,
    cert: null,
    rejectUnauthorized: true,
    // AUTHORIZER
    credentials: null,
    // AEDES
    brokerId: "vda-5050-aedes",
    concurrency: 100,
    queueLimit: 42,
    maxClientsIdLength: 23,
    heartbeatInterval: 60000,
    connectTimeout: 30000,
    stats: true,
    statsInterval: 5000,
    // PERSISTENCES
    persistence: null,
    mq: null,
    // LOGGER
    verbose: false,
    veryVerbose: false,
    noPretty: false
};
