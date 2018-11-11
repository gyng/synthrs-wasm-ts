use wasm_bindgen::prelude::*;

use synthrs::synthesizer::make_samples;
use synthrs::wave::sine_wave;

#[wasm_bindgen]
pub fn dialtone(len_s: f64, sample_rate: usize) -> Vec<f32> {
    make_samples(len_s, sample_rate, |t: f64| -> f64 {
        0.5 * (sine_wave(350.0)(t) + sine_wave(440.0)(t))
    }).iter()
    .map(|f| *f as f32)
    .collect()
}

#[wasm_bindgen]
pub fn busy(len_s: f64, sample_rate: usize) -> Vec<f32> {
    make_samples(len_s, sample_rate, |t: f64| -> f64 {
        if t % 1.0 < 0.5 {
            0.5 * (sine_wave(480.0)(t) + sine_wave(620.0)(t))
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
            0.25 * (sine_wave(1400.0)(t)
                + sine_wave(2060.0)(t)
                + sine_wave(2450.0)(t)
                + sine_wave(2600.0)(t))
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
            0.50 * (sine_wave(440.0)(t) + sine_wave(480.0)(t))
        } else {
            0.0
        }
    }).iter()
    .map(|f| *f as f32)
    .collect()
}
