# Changelog

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