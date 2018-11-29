const sources: AudioScheduledSourceNode[] = [];

export const playSamples = (
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
