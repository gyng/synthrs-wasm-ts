```
$ rustup default nightly
$ rustup target add wasm32-unknown-unknown
$ cargo +nightly install wasm-bindgen-cli

# In wasm/

$ cargo +nightly build --target wasm32-unknown-unknown --release
$ wasm-bindgen target/wasm32-unknown-unknown/release/synthrs_wasm.wasm --out-dir bindgen
```

## Serving the bundled wasm

    gz is ok, but make sure the Content-Type of the .wasm is application/wasm, or it will fail to load.
