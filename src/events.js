import { getFootsteps, getMusic, initAudio } from './audio';
import { getCamera, render } from './scene';
import { setSky } from './sky';

let isMovingForwards = false;

const start = () => {
  isMovingForwards = true;
  initAudio();
  getFootsteps().play();
};

const stop = () => {
  isMovingForwards = false;
  getFootsteps().pause();
};

const renderLoop = () => {
  if (isMovingForwards) {
    if (getCamera().position.z <= -10 && getMusic().paused) {
      getMusic().play();
    }
    getCamera().position.z -= 0.02 * 40;
    const percent = getCamera().position.z / -300 * 100;
    setSky(percent);
    render();
  }
requestAnimationFrame(renderLoop);
};
renderLoop();

export const initEvents = () => {
  document.addEventListener('mousedown', start);
  document.addEventListener('mouseup', stop);
  document.addEventListener('touchstart', start);
  document.addEventListener('touchend', stop);
}