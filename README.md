# synthrs-wasm-ts

Example repo for synthrs integration with WebAssembly (via Rust) and TypeScript (using [jsapp-boilerplate](https://github.com/gyng/jsapp-boilerplate)). Works with Firefox, Chrome, Safari, and Edge.

- For the Rust code: see [`src/wasm/src/lib.rs`](src/wasm)
- For the JS/TS glue: see [`src/components/App/App.tsx`](src/components/App/App.tsx)
- For synthrs: see the [synthrs GitHub repository](https://github.com/gyng/synthrs)

### Changes needed to support wasm

- Add `target: "esnext"` to `tsconfig.json`
- `yarn add --dev @babel/plugin-syntax-dynamic-import`
- Add `@babel/plugin-syntax-dynamic-import` to webpack babel plugins, yarn dev dependencies
- Add `.wasm` to webpack resolve
- Disable `split-chunk-plugins` in webpack `optimize`
- For MSEdge, add `webpack.ProvidePlugin` for `TextDecoder` and `TextEncoder` ([see this](https://rustwasm.github.io/wasm-bindgen/reference/browser-support.html)), and the `text-encoding` polyfill to dependencies

## Building and deploying the JS

### Development

```
$ yarn install
$ yarn d
```

### Deploying

```
$ yarn install
$ yarn clean && yarn build:github
$ yarn deploy:github:prebuilt
```

## Building the Rust bits

### Install dependencies

```
$ rustup default nightly
$ rustup target add wasm32-unknown-unknown
$ cargo +nightly install wasm-bindgen-cli
```

### In `src/wasm/`

```
$ cargo +nightly build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/synthrs_wasm.wasm --out-dir bindgen
```

#### Note: Serving the bundled wasm

A compressed `.gz` is ok, but make sure the `Content-Type` header of the .wasm is `application/wasm`, or it will fail to load.

## References

- https://rustwasm.github.io/wasm-bindgen/introduction.html
- https://docs.rs/bindgen
