import * as React from "react";

import { synth_midi_wav } from "../App";

const styles = require("../styles.scss");
const sampleMidi = require("../assets/greensleeves.mid");

export interface IWav {
  name: string;
  url: string;
  autoplay: boolean;
}

export interface IMidiSectionState {
  wavsInflight: number;
  wavs: IWav[];
}

export class MidiSection extends React.Component<{}, IMidiSectionState> {
  public constructor(props: {}) {
    super(props);
    this.state = { wavsInflight: 0, wavs: [] };
  }

  public render() {
    return (
      <div className={styles.section}>
        <h2>Convert a MIDI to WAV and play it</h2>
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
      </div>
    );
  }
}
