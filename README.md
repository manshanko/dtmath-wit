# dtmath-wit

Wasm interface for dtmath which is used to simulate Darktide mechanics in the [wartide calculator](https://dt.wartide.net/calc).

dtmath supports:
* damage (not all attacks currently)
* cleave
* weapon stats (for damage/cleave)
* stat buff modifiers (like `rending`)
* action resolver (sequence names for attacks)

All data used in dtmath for weapons/breeds/etc is embedded in the binary.

## Usage

Get the latest `dtmath.wasm` from [releases](https://github.com/ManShanko/dtmath-wit/releases) and generate bindings with [supported runtimes](#wasm-component-runtimes).

A JavaScript/TypeScript package is also available with each release.

See JavaScript examples at [`examples`](examples).

## Wasm Component Runtimes

dtmath-wit currently uses a version of WIT that requires Wasmtime 7.0.0 or older.
The following runtimes can generate bindings to use wasm components like `dtmath.wasm`.

* Rust - [wasmtime](https://github.com/bytecodealliance/wasmtime) ([crates.io](https://crates.io/crates/wasmtime))
* JS/TS - [@bytecodealliance/jco](https://github.com/bytecodealliance/js-component-tools) ([npm](https://www.npmjs.com/package/@bytecodealliance/jco))
* Python - [wasmtime](https://github.com/bytecodealliance/wasmtime-py) ([PyPI](https://pypi.org/project/wasmtime/))
