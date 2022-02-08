import Sound from "./Sound";

const audioFileList = [
  require("@/assets/sound/kit/kick.wav"),
  require("@/assets/sound/kit/tom1.wav"),
  require("@/assets/sound/kit/tom2.wav"),
  require("@/assets/sound/kit/tom3.wav"),
  require("@/assets/sound/kit/snare.wav"),
  require("@/assets/sound/kit/hihat.wav"),
  require("@/assets/sound/1up.wav"),
];

export class SoundManager {
  audioContext: AudioContext;
  soundList: Array<Sound> = [];

  constructor() {
    // const AudioContext = (window?.AudioContext || window?.webkitAudioContext);
    this.audioContext = new AudioContext();
    const gainNode = this.audioContext.createGain();
    const source = this.audioContext.createBufferSource();

    source.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    audioFileList.forEach((value, index) => {
      this.audioLoad(index, value);
    });
  }

  getSoundById(id: number): Sound | undefined {
    return this?.soundList?.find?.((item) => item.id === id);
  }

  async audioLoad(id: number, src: string): Promise<void> {
    const buffer: ArrayBuffer = await (await fetch(src)).arrayBuffer();

    this.soundList.push(new Sound(
      id,
      await this.audioContext.decodeAudioData(buffer),
    ));
  }

  audioPlay(id: number): void {
    this.getSoundById(id)?.play(this.audioContext);
  }
}

export const soundManager = new SoundManager();