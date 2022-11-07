import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getScene, render } from './scene';

export const initSetting = () => {
  initFloor();
  initRailing();
  initSand();
  initOcean();
  initWall();
  initPlants();
  initLightPosts();
  initPictures();
};

const makeTextureMaterial = (fileName, xRepeats, yRepeats) => {
  const texture = new THREE.TextureLoader().load(fileName, render);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(xRepeats, yRepeats);
  return new THREE.MeshBasicMaterial({ map: texture });
};

const addMesh = (geometry, material) => {
  const mesh = new THREE.Mesh(geometry, material);
  getScene().add(mesh);
};

const initFloor = () => {
  const geometry = new THREE.PlaneGeometry(3, 1000);
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, -2, 0);
  const material = makeTextureMaterial('textures/floor.jpg', 2, 1000);
  addMesh(geometry, material);
};

const initRailing = () => {
  const geometries = [];
  for (let i = 0; i < 1000 / 2; i++) {
    const geometryPart = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 20, 1, true);
    geometryPart.translate(-1.2, -2, -1 * i);    
    geometries.push(geometryPart);
  }
  const geometryPart = new THREE.BoxGeometry(0.25, 0.2, 1000);
  geometryPart.translate(-1, -1, 0);
  geometries.push(geometryPart);
  const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
  const material = makeTextureMaterial('textures/concrete.webp', 10, 50);
  addMesh(geometry, material);
};

const initSand = () => {
  const geometry = new THREE.PlaneGeometry(35, 1000);
  geometry.rotateX(-Math.PI / 2);
  geometry.rotateZ(Math.PI / 16);
  geometry.translate(-17.5, -6, 0);
  const material = makeTextureMaterial('textures/sand.jpg', 30, 500);
  addMesh(geometry, material);
};

const initOcean = () => {
  const geometry = new THREE.PlaneGeometry(500, 1000);
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(-250, -10, 0);
  const material = makeTextureMaterial('textures/ocean.jpg', 10, 70);
  addMesh(geometry, material);
};

const initWall = () => {
  const geometry = new THREE.BoxGeometry(1, 1, 1000);
  geometry.translate(1.5, -1, 0);
  const material = makeTextureMaterial('textures/concrete2.jpg', 1000, 1);
  addMesh(geometry, material);
};

const initPlants = () => {
  const geometry = new THREE.CylinderGeometry(0.8, 0.8, 1000, 30);
  geometry.rotateX(Math.PI / 2);
  geometry.translate(1.8, -0.8, -10);
  const material = makeTextureMaterial('textures/plant.webp', 4, 1000);
  addMesh(geometry, material);
};

const initLightPosts = () => {
  const geometries = [];
  for (let i = 0; i < 1000 / 10; i++) {
    const geo1 = new THREE.CylinderGeometry(0.1, 0.1, 4, 10);
    const geo2 = new THREE.CylinderGeometry(0.1, 0.1, 1, 10);
    geo2.rotateZ(Math.PI / 2);
    geo2.translate(0.5, 1.5, 0)
    const geo = BufferGeometryUtils.mergeBufferGeometries([geo1, geo2]);
    geo.translate(2, 2, -10 * i);
    geometries.push(geo);
  }
  const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
  const material = makeTextureMaterial('textures/metal.jpg', 4, 4);
  addMesh(geometry, material);
};

const loadTextureAsync = (fileName) => {
  return new Promise((resolve) => {
    new THREE.TextureLoader().load(fileName, resolve);
  });
};

const initPicture = async (fileName, z) => {
  const texture = await loadTextureAsync(fileName);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const aspect = texture.image.width / texture.image.height;
  const geometry = new THREE.PlaneGeometry(2 * aspect, 2);
  geometry.rotateY(Math.PI / 4);
  geometry.translate(-0.4, 0.25, z);
  addMesh(geometry, material);
  initPictureFrame(aspect, z);
};

const initPictureFrame = (aspect, z) => {
  const geometry = new THREE.BoxGeometry(2 * aspect + 0.2, 2 + 0.2, 0.1);
  geometry.rotateY(Math.PI / 4);
  geometry.translate(-0.4, 0.25, z - 0.075);
  const material = makeTextureMaterial('textures/wood.jpg', 1, 1);
  addMesh(geometry, material);
};

const initPictures = async () => {
  for (let i = 2; i <= 28; i++) {
    await initPicture(`photos/${i}.jpg`, -10 * i - 5);
  }
  render();
};