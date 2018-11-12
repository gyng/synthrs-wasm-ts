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

const sampleMidi = require("./greensleeves.mid");

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

// tslint:disable-next-line
let synth_midi_wav: (arg0: Uint8Array) => Uint8Array;

// tslint:disable-next-line
let js_generator: (len: number, fn: any) => Float32Array;

rust.then(obj => {
  js_generator = obj.js_generator;
  synth_midi_wav = obj.synth_midi_wav;
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

  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start();
  sources.push(source);
};

export interface IWav {
  name: string;
  url: string;
  autoplay: boolean;
}

export interface IInnerAppState {
  generatorCode: string;
  wavs: IWav[];
  wavsInflight: number;
}

class InnerApp extends React.Component<{}, IInnerAppState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      generatorCode: `// Write a JS function!
// Takes in (t: number), the time
// Returns (amplitude: number) between -1 and 1

t => {
  const sine = frequency =>
    Math.sin(t * frequency * 2 * Math.PI);

  // Try changing the 👇 frequencies 👇 here
  return 0.5 *  (sine(350)  +  sine(440));
};
`,
      wavs: [],
      wavsInflight: 0
    };
  }

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
            Firefox, Chrome, and Edge.
          </p>
        </div>

        <div className={styles.section}>
          <h2>Convert a MIDI to WAV and play it</h2>
          <input
            type="file"
            multiple
            onChange={event => {
              if (
                event.target.files == null ||
                event.target.files.length === 0
              ) {
                return;
              }

              this.setState({
                wavsInflight:
                  this.state.wavsInflight + event.target.files.length
              });

              // FileList is not Iterable
              // tslint:disable-next-line
              for (let i = 0; i < event.target.files.length; i++) {
                const reader = new FileReader();

                const filename =
                  event.target &&
                  event.target.files &&
                  event.target.files[i] &&
                  event.target.files[i].name;

                const fileCount = event.target.files.length;

                reader.onload = e => {
                  if (reader.result && typeof reader.result !== "string") {
                    const wavSamples = synth_midi_wav(
                      new Uint8Array(reader.result)
                    );
                    const blob = new Blob([wavSamples], {
                      type: "audio/wav"
                    });
                    const url = window.URL.createObjectURL(blob);

                    this.setState({
                      wavs: [
                        ...this.state.wavs,
                        {
                          autoplay: fileCount === 1,
                          name: filename || url,
                          url
                        }
                      ],
                      wavsInflight: this.state.wavsInflight - 1
                    });
                  }
                };

                reader.readAsArrayBuffer(event.target.files[i]);
              }
            }}
          />
          <small className={styles.small}>
            rendered as square waves &middot; drag and drop, multiple files
            accepted &middot;{" "}
            <a
              className={styles.smallLink}
              href={sampleMidi}
              download="sample.mid"
            >
              sample
            </a>
            {this.state.wavsInflight > 0 && (
              <>
                {" "}
                &middot; parsing {this.state.wavsInflight}{" "}
                {this.state.wavsInflight === 1 ? "file" : "files"}
                &hellip;
              </>
            )}
          </small>

          <ul className={styles.wavlist}>
            {this.state.wavs.map(w => {
              const wavFilename = `${w.name.replace(/\.mid$/, "")}.wav`;

              return (
                <li className={styles.waventry} key={w.url}>
                  <a href={w.url} download={wavFilename}>
                    {wavFilename}
                  </a>
                  <audio
                    className={styles.player}
                    src={w.url}
                    controls
                    autoPlay={w.autoplay}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        <div className={styles.section}>
          <h2>Or use a JavaScript function</h2>

          <textarea
            spellCheck={false}
            value={this.state.generatorCode}
            onChange={event => {
              this.setState({ generatorCode: event.target.value });
            }}
          />
          <small className={styles.small}>
            this textbox will be eval'd and passed into Rust!
          </small>
          <div>
            <button
              style={{
                marginTop: "var(--m-s)"
              }}
              onClick={() => {
                const length = 5;
                let fn;
                try {
                  // tslint:disable-next-line
                  fn = eval(this.state.generatorCode);
                } catch (e) {
                  alert(e);
                }
                const samples = js_generator(length, fn);
                playSamples(samples, length, true);
              }}
            >
              Generate for 5 seconds
            </button>
          </div>
        </div>

        <div className={styles.section}>
          <h2>Or just play a predefined tone</h2>
          <div>
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
        </div>

        <details className={styles.directMidi}>
          <summary>
            You can also play a MIDI file directly using WebAudio
          </summary>
          <div className={styles.section}>
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
                    const sampleRate = 44100;
                    playSamples(
                      samples,
                      Math.ceil(samples.length / sampleRate),
                      true
                    ); // 10 minutes ought to be enough for anybody
                  }
                };

                reader.readAsArrayBuffer(event.target.files[0]);
              }}
            />
          </div>
        </details>
      </div>
    );
  }
}

export const App =
  process.env.NODE_ENV === "development" ? hot(module)(InnerApp) : InnerApp;
