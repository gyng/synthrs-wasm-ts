# synthrs-wasm-ts

Example repo for synthrs integration with wasm and typescript (using [jsapp-boilerplate](https://github.com/gyng/jsapp-boilerplate))

* For the Rust code: see https://github.com/gyng/synthrs-wasm-ts/tree/master/src/wasm
* For the JS/TS glue: see https://github.com/gyng/synthrs-wasm-ts/blob/master/src/components/App/App.tsx
* For synthrs: see https://github.com/gyng/synthrs

### Changes needed to support wasm

* tsconfig.json: `target: "esnext"`
* `yarn add --dev @babel/plugin-syntax-dynamic-import`
* Add `"@babel/plugin-syntax-dynamic-import"` to webpack babel plugins, yarn dev dependencies
* Add `".wasm"` to webpack resolve
* Disable split-chunk-plugins in webpack optimize

See `README.md` in `src/wasm` for more details
