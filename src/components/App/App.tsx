import { hot } from "react-hot-loader";

import * as React from "react";
// import { Link, Route, Switch } from "react-router-dom";

// import { config } from "@cfg";

// Let webpack instead of ts handle these imports
const styles = require("./styles.scss");

// Include global CSS and variables
require("../../styles/root.scss");

// Legacy CSS are supported
require("./legacy.css");

// tsconfig.json: target: "esnext"
// yarn add --dev @babel/plugin-syntax-dynamic-import
// Add "@babel/plugin-syntax-dynamic-import" to webpack babel plugins
// Add ".wasm" to webpack resolve
// Disable split-chunk-plugins in webpack optimize

// @ts-ignore
const rust = import("@src/wasm/bindgen/synthrs_wasm");

const tones: {
  [k: string]: (len: number, sampleRate: number) => Float32Array;
} = {};

// tslint:disable-next-line
let synth_midi: (arg0: Uint8Array) => Float32Array;

rust.then(obj => {
  synth_midi = obj.synth_midi;
  tones.dialtone = obj.dialtone;
  tones.busy = obj.busy;
  tones.offhook = obj.offhook;
  tones.ring = obj.ring;
});

const playTone = (name: keyof typeof tones) => {
  const samples = tones[name](10, 44100);
  playSamples(samples, 10, true);
};

const sources: AudioScheduledSourceNode[] = [];

const playSamples = (
  samples: any,
  lengthSeconds: number = 10,
  cancel: boolean = false
) => {
  // const audioEl = document.querySelector("#player");
  const channels = 1;
  const sampleRate = 44100;
  const sampleLength = sampleRate * lengthSeconds;

  const context = new AudioContext();
  const buffer = context.createBuffer(channels, sampleLength, sampleRate);

  const channelNumber = 0;
  const startInChannel = 0;
  buffer.copyToChannel(samples, channelNumber, startInChannel);

  if (cancel) {
    sources.forEach(s => s.stop());
  }

  // TODO: Use https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioDestinationNode
  // to push data to an ogg vorbis file in an <audio> element
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
  sources.push(source);
};

class InnerApp extends React.Component<{}, {}> {
  public render() {
    return (
      <div className={`app ${styles.grid}`}>
        <h1>WASM Synthesiser</h1>

        <p>
          This uses <a href="https://github.com/gyng/synthrs">synthrs</a> to
          generate audio.{" "}
          <a href="https://github.com/gyng/synthrs-wasm-ts">Source</a>
        </p>

        {/* <audio id="player" className={styles.player} controls /> */}

        <h2>Upload a MIDI file</h2>
        <div className={styles.sectionMidi}>
          <input
            type="file"
            onChange={event => {
              const reader = new FileReader();

              if (
                event.target.files == null ||
                event.target.files.length === 0
              ) {
                return;
              }

              reader.onload = e => {
                if (reader.result && typeof reader.result !== "string") {
                  const samples = synth_midi(new Uint8Array(reader.result));
                  playSamples(samples, 600, true); // 10 minutes ought to be enough for anybody
                }
              };

              reader.readAsArrayBuffer(event.target.files[0]);
            }}
          />
        </div>

        <h2>Or play a predefined tone</h2>
        <button
          onClick={() => {
            playTone("busy");
          }}
        >
          Busy
        </button>
        <button
          onClick={() => {
            playTone("offhook");
          }}
        >
          Offhook
        </button>
        <button
          onClick={() => {
            playTone("dialtone");
          }}
        >
          Dial
        </button>
        <button
          onClick={() => {
            playTone("ring");
          }}
        >
          Ring
        </button>
      </div>
    );
  }
}

export const App =
  process.env.NODE_ENV === "development" ? hot(module)(InnerApp) : InnerApp;
