import * as React from "react";

import { synth_midi } from "../App";
import { playSamples } from "../audio";

const styles = require("../styles.scss");

export const MidiWebAudioSection = () => (
  <div className={styles.section}>
    <input
      type="file"
      onChange={event => {
        const reader = new FileReader();

        if (event.target.files == null || event.target.files.length === 0) {
          return;
        }

        reader.onload = e => {
          if (reader.result && typeof reader.result !== "string") {
            const samples = synth_midi(new Uint8Array(reader.result));
            const sampleRate = 44100;
            playSamples(samples, Math.ceil(samples.length / sampleRate), true); // 10 minutes ought to be enough for anybody
          }
        };

        reader.readAsArrayBuffer(event.target.files[0]);
      }}
    />
  </div>
);
