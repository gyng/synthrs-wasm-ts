import * as React from "react";

import { js_generator, playSamples } from "../App/App";

const styles = require("./styles.scss");

/// ### Semitone table
///
///  0 C
///  1 C#
///  2 D
///  3 D#
///  4 E
///  5 F
///  6 F#
///  7 G
///  8 G#
///  9 A
/// 10 B
export const note = (
  a4: number = 440,
  semitone: number,
  octave: number = 4
) => {
  const semitonesFromA4 = octave * 12 + semitone - 9 - 48;
  return a4 * Math.exp((semitonesFromA4 * Math.log(2)) / 12);
};

export const noteMidi = (a4: number, midiNote: number): number => {
  const semitone = midiNote % 12;
  const octave = midiNote / 12 - 1;
  return note(a4, semitone, octave);
};

export interface IPianoProps {
  duration: number;
  instrument: (frequency: number, duration: number) => (t: number) => number;
  lockKeyboard: boolean;
}

export interface IPianoState {
  active: { [k: number]: boolean };
}

export class Piano extends React.Component<IPianoProps, IPianoState> {
  public static A4 = 440;
  public static KEYMAP = [
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    ",",
    ".",
    "/",
    "Shift",
    "Control",

    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    ";",
    "'",
    "Enter",

    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "[",
    "]"
  ];
  public static FREQUENCIES = [...Array(Piano.KEYMAP.length).keys()].map(k =>
    // 60 = C4,
    // 12 semitones in an octave
    noteMidi(Piano.A4, k + 48)
  );

  public constructor(props: IPianoProps) {
    super(props);

    this.state = {
      active: {}
    };
  }

  public componentDidMount() {
    // TODO: unregister on unmount
    document.addEventListener("keydown", e => {
      if (this.props.lockKeyboard) {
        e.preventDefault();
      }
      this.playNote(e.key);
    });
  }

  public render() {
    return (
      <div className={styles.piano}>
        {Piano.FREQUENCIES.map((f, i) => {
          const key = Piano.KEYMAP[i];
          const row = Math.floor(i / 12);
          const order = 3 - row;
          const octave = row + 3;

          // prettier-ignore
          const notes = ["C", "C", "D", "D", "E", "F", "F", "G", "G", "A", "A", "B"];
          const semitone = i % 12;

          let sharpFlat = "";
          if (semitone === 1 || semitone === 6 || semitone === 8) {
            sharpFlat = "♯";
          } else if (semitone === 3 || semitone === 10) {
            sharpFlat = "♭";
          }

          const label = `${notes[semitone]}${octave}${sharpFlat}`;

          return (
            <div
              className={[styles.key, this.state.active[i] ? styles.on : null]
                .filter(Boolean)
                .join(" ")}
              key={key}
              style={{ order, transitionDuration: `${this.props.duration}s` }}
              onClick={e => {
                if (this.props.lockKeyboard) {
                  e.preventDefault();
                }
                this.playNote(key);
              }}
            >
              <div className={styles.keyLabel}>{label}</div>
              <div>{key}</div>
            </div>
          );
        })}
      </div>
    );
  }

  private playNote(key: string) {
    const frequencyIndex = Piano.KEYMAP.indexOf(key);
    const frequency = Piano.FREQUENCIES[frequencyIndex];

    if (frequency) {
      const samples = js_generator(
        this.props.duration,
        this.props.instrument(frequency, this.props.duration)
      );
      playSamples(samples, this.props.duration, false);

      this.setState({
        active: {
          ...this.state.active,
          [frequencyIndex]: true
        }
      });

      window.setTimeout(() => {
        this.setState({
          active: {
            ...this.state.active,
            [frequencyIndex]: false
          }
        });
      }, this.props.duration * 1000);
    }
  }
}
