import { hot } from "react-hot-loader";

import * as React from "react";

import { JsFuncSection } from "./sections/JsFuncSection";
import { MidiSection } from "./sections/MidiSection";
import { MidiWebAudioSection } from "./sections/MidiWebAudioSection";
import { PianoSection } from "./sections/PianoSection";
import { TonesSection } from "./sections/TonesSection";

import { playSamples } from "./audio";

// import { Link, Route, Switch } from "react-router-dom";

// import { config } from "@cfg";

// Let webpack instead of ts handle these imports
const styles = require("./styles.scss");

// Include global CSS and variables
require("../../styles/root.scss");

// Legacy CSS are supported
require("./legacy.css");

const samplePiano = require("./assets/piano110hz.wav");

// tsconfig.json: target: "esnext"
// yarn add --dev @babel/plugin-syntax-dynamic-import
// Add "@babel/plugin-syntax-dynamic-import" to webpack babel plugins
// Add ".wasm" to webpack resolve
// Disable split-chunk-plugins in webpack optimize

// @ts-ignore
export const rust = import("@src/wasm/bindgen/synthrs_wasm");

const tones: {
  [k: string]: (len: number, sampleRate: number) => Float32Array;
} = {};

export const playTone = (name: keyof typeof tones) => {
  const samples = tones[name](10, 44100);
  playSamples(samples, 10, true);
};

// tslint:disable-next-line
export let synth_midi: (arg0: Uint8Array) => Float32Array;

// tslint:disable-next-line
export let synth_midi_wav: (arg0: Uint8Array) => Uint8Array;

// tslint:disable-next-line
export let synth_midi_wav_with_sample: (
  midiBytes: Uint8Array,
  sampleBytes: Uint8Array,
  sampleFrequency: number
) => Uint8Array;

// tslint:disable-next-line
export let js_generator: (len: number, fn: any) => Float32Array;

rust.then(obj => {
  js_generator = obj.js_generator;
  synth_midi_wav = obj.synth_midi_wav;
  synth_midi_wav_with_sample = obj.synth_midi_wav_with_sample;
  synth_midi = obj.synth_midi;
  tones.dialtone = obj.dialtone;
  tones.busy = obj.busy;
  tones.offhook = obj.offhook;
  tones.ring = obj.ring;
});

class InnerApp extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={`app ${styles.grid}`}>
        <h1>WASM Synthesiser</h1>

        <div style={{ maxWidth: 600 }}>
          <p>
            <a href="https://github.com/gyng/synthrs-wasm-ts">GitHub</a>{" "}
            &middot; This demo uses{" "}
            <a href="https://github.com/gyng/synthrs">synthrs</a>, a toy
            synthesiser library written in Rust, to generate audio. Rust code is
            compiled down to WebAssembly (.wasm), glued to JS/TS using{" "}
            <a href="https://github.com/rustwasm/wasm-bindgen">wasm-bindgen</a>,
            and then hooked up using{" "}
            <a href="https://webpack.js.org/">webpack</a>. Checked to work on
            Firefox, Chrome, Edge, and Safari.
          </p>
        </div>

        <MidiSection />
        <JsFuncSection />
        <PianoSection />
        <TonesSection />

        <details className={styles.directMidi}>
          <summary>
            You can also play a MIDI file directly using WebAudio
          </summary>
          <MidiWebAudioSection />
        </details>
      </div>
    );
  }
}

export const App =
  process.env.NODE_ENV === "development" ? hot(module)(InnerApp) : InnerApp;
