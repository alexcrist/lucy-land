import * as THREE from 'three';
import { ASPECT_RATIO, FOV, RENDER_LIMIT_FAR, RENDER_LIMIT_NEAR } from './constants';

let renderer;
let camera;
let scene;

export const getRenderer = () => renderer;
export const getScene = () => scene;
export const getCamera = () => camera;

export const render = () => renderer.render(scene, camera);

export const initScene = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, RENDER_LIMIT_NEAR, RENDER_LIMIT_FAR);
  camera.rotateY(Math.PI / 4);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
};