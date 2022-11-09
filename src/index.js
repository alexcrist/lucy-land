import { initAudio } from './audio';
import { initEvents } from './events';
import { initScene, render } from './scene';
import { initSetting } from './setting';

initScene();
initSetting();
initEvents();
render();
