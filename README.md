# synthrs-wasm-ts

Example repo for synthrs integration with wasm and typescript (using [jsapp-boilerplate](https://github.com/gyng/jsapp-boilerplate))

Changed needed to support wasm

* tsconfig.json: `target: "esnext"`
* `yarn add --dev @babel/plugin-syntax-dynamic-import`
* Add `"@babel/plugin-syntax-dynamic-import"` to webpack babel plugins, yarn dev dependencies
* Add `".wasm"` to webpack resolve
* Disable split-chunk-plugins in webpack optimize

See `README.md` in `src/wasm` for more details
