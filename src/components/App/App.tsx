import { hot } from "react-hot-loader";

import * as React from "react";
import { Link, Route, Switch } from "react-router-dom";

import { config } from "@cfg";
import { Echo } from "@src/components/Echo";
import { CounterContainer } from "@src/containers/Counter";

// Let webpack instead of ts handle these imports
const hello = require("./hello.jpg");
const styles = require("./styles.scss");

// Include global CSS and variables
require("../../styles/root.scss");

// Legacy CSS are supported
require("./legacy.css");

// tsconfig.json: target: "esnext"
// yarn add --dev @babel/plugin-syntax-dynamic-import
// Add "@babel/plugin-syntax-dynamic-import" to webpack babel plugins
// Add ".wasm" to webpack resolve

const rust = import("@src/wasm/bindgen/synthrs_wasm");

const tones: {
  [k: string]: (len: number, sampleRate: number) => Float32Array;
} = {};

rust.then(obj => {
  tones.dialtone = obj.dialtone;
  tones.busy = obj.busy;
  tones.offhook = obj.offhook;
  tones.ring = obj.ring;
});

const play = (name: keyof typeof tones) => {
  const channels = 1;
  const sampleRate = 44100;
  const lengthSeconds = 10;
  const length = sampleRate * lengthSeconds;

  const context = new AudioContext();
  const buffer = context.createBuffer(channels, length, sampleRate);

  const samples = tones[name](lengthSeconds, sampleRate);
  const channelNumber = 0;
  const startInChannel = 0;
  buffer.copyToChannel(samples, channelNumber, startInChannel);

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
};

class InnerApp extends React.Component<{}, {}> {
  public componentDidMount() {}

  public render() {
    return (
      // Example usage of legacy CSS class name mixed with CSS modules
      <div className={`app ${styles.grid}`}>
        Hello!
        <button
          onClick={() => {
            play("busy");
          }}
        >
          Busy
        </button>
        <button
          onClick={() => {
            play("offhook");
          }}
        >
          Offhook
        </button>
        <button
          onClick={() => {
            play("dialtone");
          }}
        >
          Dial
        </button>
        <button
          onClick={() => {
            play("ring");
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
