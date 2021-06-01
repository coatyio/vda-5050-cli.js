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
	// Accept connections on unspecified IPv6 (::) or IPv4 address (0.0.0.0).
	// Do not use "localhost" or "127.0.0.1" as it prevents local client 
	// connections on host's real IP address.
    host: "",
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
    stats: false,
    statsInterval: 5000,
    // PERSISTENCES
    persistence: null,
    mq: null,
    // LOGGER
    verbose: false,
    veryVerbose: false,
    noPretty: false
};
