let footsteps;
let waves;
let birds;

export const getFootsteps = () => footsteps;

export const initAudio = () => {
  if (!footsteps) {
    footsteps = new Audio('audio/footsteps.wav');
    footsteps.loop = true;
    footsteps.volume = 0.2;
  }

  if (!waves) {
    waves = new Audio('audio/waves.flac');
    waves.loop = true;
    waves.volume = 0.2;
  }

  if (!birds) {
    birds = new Audio('audio/birds.wav');
    birds.loop = true;
    birds.volume = 0.3;
  }

  if (waves.paused) {
    waves.play();
  }

  if (birds.paused) {
    birds.play();
  }
};