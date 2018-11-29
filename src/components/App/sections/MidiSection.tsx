import * as React from "react";

import { synth_midi_wav, synth_midi_wav_with_sample } from "../App";

const styles = require("../styles.scss");
const sampleMidi = require("../assets/greensleeves.mid");
const samplePiano = require("../assets/piano110hz.wav");
const sampleClarinet = require("../assets/clarinet262hz.wav");

export interface IWav {
  name: string;
  url: string;
  autoplay: boolean;
  instrument: string;
}

export enum MidiInstrument {
  Square = "Square",
  Piano = "Piano",
  Clarinet = "Clarinet",
  Custom = "Custom"
}

export interface IMidiSectionState {
  wavsInflight: number;
  wavs: IWav[];
  sample: {
    filename?: string;
    frequency: number;
    bytes?: Uint8Array;
  };
  instrument: MidiInstrument;
  pianoSampleLoaded: boolean;
}

export class MidiSection extends React.Component<{}, IMidiSectionState> {
  private preloads: {
    [k: string]: { bytes: Uint8Array; frequency: number };
  } = {};

  public constructor(props: {}) {
    super(props);
    this.state = {
      instrument: MidiInstrument.Square,
      pianoSampleLoaded: false,
      sample: { frequency: 110.0 },
      wavs: [],
      wavsInflight: 0
    };
  }

  public componentDidMount() {
    const toLoad = [
      {
        frequency: 110.0,
        name: "piano",
        url: samplePiano
      },
      {
        frequency: 262.0,
        name: "clarinet",
        url: sampleClarinet
      }
    ];

    toLoad.forEach(details => {
      fetch(details.url)
        .then(res => res.arrayBuffer())
        .then(ab => {
          this.preloads[details.name] = {
            bytes: new Uint8Array(ab),
            frequency: details.frequency
          };
        })
        .catch(e => {
          // tslint:disable-next-line:no-console
          console.warn("Failed to load sample:", details, e);
        });
    });
  }

  public render() {
    const sampleInput = (
      <div className={styles.sampleInput}>
        Upload a WAVE file to use as a sample
        <input
          type="file"
          onChange={event => {
            if (
              !event.target ||
              event.target.files == null ||
              event.target.files.length !== 1
            ) {
              return;
            }

            const reader = new FileReader();
            const file = event.target.files[0];

            reader.onload = e => {
              if (reader.result && typeof reader.result !== "string") {
                this.setState({
                  sample: {
                    bytes: new Uint8Array(reader.result),
                    filename: file.name,
                    frequency: 110.0
                  }
                });
              }
            };

            reader.readAsArrayBuffer(file);
          }}
        />
        <div style={{ marginTop: "var(--m-m)" }}>
          And specify its frequency (440.0 = middle C)
          <input
            type="number"
            step="0.1"
            value={this.state.sample.frequency}
            onChange={event => {
              this.setState({
                sample: {
                  ...this.state.sample,
                  frequency: parseFloat(event.target.value)
                }
              });
            }}
          />
        </div>
      </div>
    );

    const midiInput = (
      <input
        type="file"
        multiple
        onChange={event => {
          if (event.target.files == null || event.target.files.length === 0) {
            return;
          }

          this.setState({
            wavsInflight: this.state.wavsInflight + event.target.files.length
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
                let wavSamples;

                try {
                  if (
                    this.state.instrument === MidiInstrument.Custom &&
                    this.state.sample.bytes &&
                    this.state.sample.frequency
                  ) {
                    wavSamples = synth_midi_wav_with_sample(
                      new Uint8Array(reader.result),
                      this.state.sample.bytes,
                      this.state.sample.frequency
                    );
                  } else if (this.state.instrument === MidiInstrument.Piano) {
                    wavSamples = synth_midi_wav_with_sample(
                      new Uint8Array(reader.result),
                      this.preloads.piano.bytes,
                      this.preloads.piano.frequency
                    );
                  } else if (
                    this.state.instrument === MidiInstrument.Clarinet
                  ) {
                    wavSamples = synth_midi_wav_with_sample(
                      new Uint8Array(reader.result),
                      this.preloads.clarinet.bytes,
                      this.preloads.clarinet.frequency
                    );
                  } else {
                    wavSamples = synth_midi_wav(new Uint8Array(reader.result));
                  }
                } catch (e) {
                  this.setState({
                    wavsInflight: 0
                  });
                  window.alert(`${e}\nDid you upload a MIDI file?`);
                }

                if (!wavSamples) {
                  return;
                }

                const blob = new Blob([wavSamples], {
                  type: "audio/wav"
                });
                const url = window.URL.createObjectURL(blob);

                this.setState({
                  wavs: [
                    ...this.state.wavs,
                    {
                      autoplay: fileCount === 1,
                      instrument: this.state.instrument,
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
    );

    const instrumentInputMap: {
      [k in MidiInstrument]: React.ReactNode | null
    } = {
      [MidiInstrument.Square]: null,
      [MidiInstrument.Custom]: sampleInput,
      [MidiInstrument.Clarinet]: null,
      [MidiInstrument.Piano]: null
    };

    const instrumentSwitcher = (
      <div className={styles.instrumentSwitcher}>
        <div>
          Instrument:{" "}
          {Object.keys(MidiInstrument).map(i => {
            const setInstrument = (e: React.ChangeEvent<HTMLInputElement>) => {
              this.setState({ instrument: e.target.value as MidiInstrument });
            };
            return (
              <label key={i} className={styles.optionInstrument}>
                <input
                  type="radio"
                  name="instrument"
                  value={i}
                  checked={this.state.instrument === i}
                  onChange={setInstrument}
                />
                {i}
              </label>
            );
          })}
        </div>
        {instrumentInputMap[this.state.instrument]}
      </div>
    );

    const status = (
      <small className={styles.small}>
        drag and drop, multiple files accepted &middot;{" "}
        <a className={styles.smallLink} href={sampleMidi} download="sample.mid">
          sample midi file
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
    );

    const wavList = (
      <ul className={styles.wavlist}>
        {this.state.wavs.map(w => {
          const wavFilename = `${w.name.replace(/\.mid$/, "")}_${
            w.instrument
          }.wav`;

          return (
            <li className={styles.waventry} key={w.url}>
              <div>
                <a href={w.url} download={wavFilename}>
                  {wavFilename}
                </a>
              </div>
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
    );

    return (
      <div className={styles.section}>
        <h2>Convert a MIDI to WAV and play it</h2>
        {midiInput}
        {status}
        {instrumentSwitcher}
        {wavList}
      </div>
    );
  }
}
