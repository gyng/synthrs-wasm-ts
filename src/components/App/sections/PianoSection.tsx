import * as React from "react";

import { Piano } from "@src/components/Piano";

const styles = require("../styles.scss");

export interface IPianoSectionState {
  instrumentCode: string;
  instrument: (f: number, d: number) => (t: number) => number;
  instrumentDuration: number;
  instrumentLock: boolean;
  instrumentSample: any;
}

export class PianoSection extends React.Component<{}, IPianoSectionState> {
  public constructor(props: {}) {
    super(props);

    this.state = {
      instrumentCode: `// Create your instrument!
// This will only successfuly eval if it's valid
// Check your console for errors

// Takes in (freq: number, dur: number)
// Returns a function (t: number), time
// returning (amplitude: number) between -1 and 1

(freq, dur) => t => {
  // This is a square wave!
  const sine = Math.sin(t * freq * 2 * Math.PI);
  return (sine > 0 ? 1 : -1) * (dur - t);
}
`,
      // tslint:disable-next-line
      instrument: (freq, dur) => t => {
        const sine = Math.sin(t * freq * 2 * Math.PI);
        return (sine > 0 ? 1 : -1) * (dur - t);
      },
      instrumentLock: false,
      instrumentDuration: 0.5,
      instrumentSample: null
    };
  }

  public render() {
    return (
      <div className={styles.section}>
        <h2>Or play an instrument</h2>
        <textarea
          spellCheck={false}
          value={this.state.instrumentCode}
          onChange={event => {
            this.setState({ instrumentCode: event.target.value });

            // tslint:disable-next-line
            const instrument = eval(event.target.value);
            if (instrument) {
              this.setState({ instrument });
            }
          }}
        />
        <small className={styles.small}>
          this textbox will be eval'd and passed into Rust!
        </small>

        <div style={{ margin: "var(--m-m) 0 var(--m-l) 0", display: "flex" }}>
          <div>
            Duration:{" "}
            <input
              className={styles.duration}
              type="number"
              step={0.1}
              value={this.state.instrumentDuration}
              onChange={event => {
                this.setState({
                  instrumentDuration: parseFloat(event.target.value)
                });
              }}
            />{" "}
            seconds
          </div>
          <label style={{ marginLeft: "var(--m-m)" }}>
            <input
              type="checkbox"
              checked={this.state.instrumentLock}
              onChange={event => {
                this.setState({
                  instrumentLock: event.target.checked
                });
              }}
            />
            Lock keyboard to page
          </label>
        </div>

        <Piano
          duration={this.state.instrumentDuration}
          instrument={this.state.instrument || ((a, b) => c => 0.0)}
          lockKeyboard={this.state.instrumentLock}
        />
      </div>
    );
  }
}
