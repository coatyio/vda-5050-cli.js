# Changelog

## [2.0.12](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.11...v2.0.12) (2021-02-27)

This patch release accepts broker connections on the unspecified IP address.

### Bug Fixes

* **broker:** accept connections on unspecified IPv6 (::) or IPv4 address (0.0.0.0) ([eb5c099](https://github.com/coatyio/vda-5050-cli.js/commit/eb5c099d8032f864d26ad5d1d51e7c7ae4f1f161))

## [2.0.11](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.10...v2.0.11) (2021-02-25)

This patch release adds a dependency required for local installation.

## [2.0.10](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.9...v2.0.10) (2021-02-17)

This patch release adjusts the VDA 5050 schema version formerly published as v2.0 to v1.1.
The schema data itself did not change.

### Bug Fixes

* **schema:** rename VDA 5050 schema version v2.0 to v1.1 ([5ab8dc2](https://github.com/coatyio/vda-5050-cli.js/commit/5ab8dc25c5de603d27b50aa2383acf1a432ed2e6))

## [2.0.9](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.8...v2.0.9) (2021-01-25)

This patch release adds missing action status PAUSED to the state schema.

### Bug Fixes

* **schema:** add missing action status PAUSED to enum actionStatus ([bb8d5cf](https://github.com/coatyio/vda-5050-cli.js/commit/bb8d5cfa43e4154c5c00a857229c601e897af189))

## [2.0.8](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.7...v2.0.8) (2020-12-29)

This patch release ensures that enum values of eStop and actionStatus are all uppercase.

### Bug Fixes

* **schema:** ensure enum eStop and actionStatus provide uppercase values ([b3a356a](https://github.com/coatyio/vda-5050-cli.js/commit/b3a356ad9a57ac690fe95db7e54bf6bb1be49be0))

## [2.0.7](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.6...v2.0.7) (2020-12-21)

This patch release provides a common schema for instant, node, and edge actions.

### Bug Fixes

* **schema:** correct description properties; provide common schema for instant, node, and edge actions ([395a8e1](https://github.com/coatyio/vda-5050-cli.js/commit/395a8e1c099b46ad85540b5a6b1c9a72ef0a76b3))

## [2.0.6](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.5...v2.0.6) (2020-11-11)

This patch release corrects the instantActions schema definition.

### Bug Fixes

* **schema:** define instantActions as required property in instantActions schema ([6c1f465](https://github.com/coatyio/vda-5050-cli.js/commit/6c1f4653c2ca6e95f2d9fd91b4c3161ae67a0371))

## [2.0.5](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.4...v2.0.5) (2020-11-04)

This patch release corrects and improves VDA 5050 schema definitions.

### Bug Fixes

* **schema:** add proper type and range restrictions to batteryState properties and update descriptions ([168f010](https://github.com/coatyio/vda-5050-cli.js/commit/168f0107fd16cbf6e5141f8a210dc1ad6199b78e))
* **schema:** add separators to enum field definitions for better readability in eStop description ([0d42013](https://github.com/coatyio/vda-5050-cli.js/commit/0d42013244db49b84caeb15b9fe3f0422fcc4694))
* **schema:** add type restrictions to orderUpdateId and lastNodeSequenceId in state schema ([6877364](https://github.com/coatyio/vda-5050-cli.js/commit/6877364b29cfc84cc17b797b060cd3dcb23fc36b))
* **schema:** correct description of node.released property in order schema ([cc5f581](https://github.com/coatyio/vda-5050-cli.js/commit/cc5f581a67a51a4b2956bf7d86e4107de1bc3845))

## [2.0.4](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.3...v2.0.4) (2020-10-28)

This patch release turns off automatic type inference for format-annotated JSON schema types
and makes type inference configurable.

### Bug Fixes

* **schema:** turn off automatic type inference for format-annotated types such as date-time and make inference configurable ([84c4340](https://github.com/coatyio/vda-5050-cli.js/commit/84c43402ff872776af4b5e9426b87ed41106409a))

## [2.0.3](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.2...v2.0.3) (2020-10-28)

This patch release imposes additional validation restrictions on VDA 5050 schemas.

### Bug Fixes

* **schema:** ensure an order's nodes list is not empty ([81afd12](https://github.com/coatyio/vda-5050-cli.js/commit/81afd12d93b48e23cff5642a340a656dff1f6d25))
* **schema:** impose ISO6801 format restriction on timestamp property ([5fafbf9](https://github.com/coatyio/vda-5050-cli.js/commit/5fafbf9c822388af6f12d8ccd44ab5ff9f9c2421))

## [2.0.2](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.1...v2.0.2) (2020-10-26)

This patch release fixes a bug in the VDA 5050 State schema.

### Bug Fixes

* **schema:** corrected location of required keyword in errors and information items of State schema ([8fd6124](https://github.com/coatyio/vda-5050-cli.js/commit/8fd6124e0fcd709722a241446aa3479036221382))

## [2.0.1](https://github.com/coatyio/vda-5050-cli.js/compare/v2.0.0...v2.0.1) (2020-10-21)

This patch release fixes two minor issues regarding the command line interface and broker termination.

### Bug Fixes

* **broker:** perform cleanup on any way the Node.js process might exit ([5748d3b](https://github.com/coatyio/vda-5050-cli.js/commit/5748d3b5edef55f79535a2e0e616df8a2b42cac1))
* **cli:** support concatenated flags on command line, such as -hq instead of -h -q ([7495e52](https://github.com/coatyio/vda-5050-cli.js/commit/7495e52c1fa1033a3221910bef8328206356565f))

# 2.0.0 (2020-10-15)

Initial release.