import * as React from "react";

import { js_generator } from "../App";
import { playSamples } from "../audio";

const styles = require("../styles.scss");

export interface IJsFuncSectionState {
  generatorCode: string;
}

export class JsFuncSection extends React.Component<{}, IJsFuncSectionState> {
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
`
    };
  }

  public render() {
    return (
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
    );
  }
}
