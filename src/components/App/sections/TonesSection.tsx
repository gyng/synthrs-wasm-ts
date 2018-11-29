import * as React from "react";

import { playTone } from "../App";

const styles = require("../styles.scss");

export const TonesSection = () => (
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
);
