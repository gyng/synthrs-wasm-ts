use wasm_bindgen::prelude::*;

use std::io::Cursor;
use synthrs::midi::read_midi;
use synthrs::synthesizer::{make_samples, make_samples_from_midi};
use synthrs::wave::square_wave;

#[wasm_bindgen]
pub fn synth_midi(bytes: Box<[u8]>) -> Option<Box<[f32]>> {
    let mut cursor = Cursor::new(bytes);

    if let Ok(song) = read_midi(&mut cursor) {
        let samples: Vec<f32> = make_samples_from_midi(square_wave, 44_100, true, song)
            .unwrap()
            .iter()
            .map(|f| *f as f32)
            .collect();
        return Some(samples.into_boxed_slice());
    }

    None
}

#[wasm_bindgen]
pub fn dialtone(len_s: f64, sample_rate: usize) -> Vec<f32> {
    make_samples(len_s, sample_rate, |t: f64| -> f64 {
        0.5 * (square_wave(350.0)(t) + square_wave(440.0)(t))
    }).iter()
    .map(|f| *f as f32)
    .collect()
}

#[wasm_bindgen]
pub fn busy(len_s: f64, sample_rate: usize) -> Vec<f32> {
    make_samples(len_s, sample_rate, |t: f64| -> f64 {
        if t % 1.0 < 0.5 {
            0.5 * (square_wave(480.0)(t) + square_wave(620.0)(t))
        } else {
            0.0
        }
    }).iter()
    .map(|f| *f as f32)
    .collect()
}

#[wasm_bindgen]
pub fn offhook(len_s: f64, sample_rate: usize) -> Vec<f32> {
    make_samples(len_s, sample_rate, |t: f64| -> f64 {
        if t % 0.2 < 0.1 {
            0.25 * (square_wave(1400.0)(t)
                + square_wave(2060.0)(t)
                + square_wave(2450.0)(t)
                + square_wave(2600.0)(t))
        } else {
            0.0
        }
    }).iter()
    .map(|f| *f as f32)
    .collect()
}

#[wasm_bindgen]
pub fn ring(len_s: f64, sample_rate: usize) -> Vec<f32> {
    make_samples(len_s, sample_rate, |t: f64| -> f64 {
        if t % 6.0 < 2.0 {
            0.50 * (square_wave(440.0)(t) + square_wave(480.0)(t))
        } else {
            0.0
        }
    }).iter()
    .map(|f| *f as f32)
    .collect()
}
