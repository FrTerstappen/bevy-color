# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Nothing
- 
## [0.4.0] - 2025-05-02

### Changed

- No longer detect colors with a ' or ` in front of them (also space between)

## [0.3.0] - 2025-05-01

### Added

- Shows diagnostics for values outside of the allowed range

### Changed

- Replacing a color now tries to use the same color space. Tailwind and CSS colors always get replaced by srgb.
- Update example workspace to bevy 0.16

## [0.2.0] - 2025-04-21

### Added

- Rust workspace for testing
- Support for oklcha

### Changed

- Namespace matching now supports direct `bevy_color` usage

### Fixed

- Conversions now accounts for a difference in value range between bevy and the internally used color library

## [0.1.0] - 2025-04-20

### Added

- Initial color highlighting

<!-- Template for new entry
## [X.Y.Z] - YYYY-MM-DD
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->
