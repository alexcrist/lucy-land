import { getFootsteps, initAudio } from './audio';
import { getCamera, render } from './scene';

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
    getCamera().position.z -= 0.02;
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