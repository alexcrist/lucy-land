import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { getScene, render } from './scene';

export const initSetting = () => {

  const floorTex = new THREE.TextureLoader().load('textures/floor.jpg', render);
  floorTex.wrapS = THREE.RepeatWrapping;
  floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(4, 500);

  const floorGeo = new THREE.PlaneGeometry(3, 1000);
  floorGeo.rotateX(-Math.PI / 2);
  const floorMat = new THREE.MeshBasicMaterial({ map: floorTex });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.position.y = -2;
  getScene().add(floor);

  const concreteTex = new THREE.TextureLoader().load('textures/concrete.webp', render);
  concreteTex.wrapS = THREE.RepeatWrapping;
  concreteTex.wrapT = THREE.RepeatWrapping;
  concreteTex.repeat.set(1, 1000);

  const postGeos = [];
  for (let i = 0; i < 1000 / 2; i++) {
    const postGeoPart = new THREE.CylinderGeometry(0.2, 0.2, 1.5, 20, 1, true);
    postGeoPart.translate(-1.2, -2, -1 * i);    
    postGeos.push(postGeoPart);
  }
  const railingGeo = new THREE.BoxGeometry(0.25, 0.2, 1000);
  railingGeo.translate(-1, -1, 0);
  postGeos.push(railingGeo);
  const postGeo = BufferGeometryUtils.mergeBufferGeometries(postGeos);
  const postMat = new THREE.MeshBasicMaterial({ map: concreteTex });
  const posts = new THREE.Mesh(postGeo, postMat);
  getScene().add(posts);

  const sandTex = new THREE.TextureLoader().load('textures/sand.jpg', render);
  sandTex.wrapS = THREE.RepeatWrapping;
  sandTex.wrapT = THREE.RepeatWrapping;
  sandTex.repeat.set(30, 500);

  const sandGeo = new THREE.PlaneGeometry(35, 1000);
  sandGeo.rotateX(-Math.PI / 2);
  sandGeo.rotateZ(Math.PI / 16);
  const sandMat = new THREE.MeshBasicMaterial({ map: sandTex });
  const sand = new THREE.Mesh(sandGeo, sandMat);
  sand.position.y = -6;
  sand.position.x = -17.5;
  getScene().add(sand);

  const oceanTex = new THREE.TextureLoader().load('textures/ocean.jpg', render);
  oceanTex.wrapS = THREE.RepeatWrapping;
  oceanTex.wrapT = THREE.RepeatWrapping;
  oceanTex.repeat.set(10, 10);

  const oceanGeo = new THREE.PlaneGeometry(500, 1000);
  oceanGeo.rotateX(-Math.PI / 2);
  const oceanMat = new THREE.MeshBasicMaterial({ map: oceanTex });
  const ocean = new THREE.Mesh(oceanGeo, oceanMat);
  ocean.position.y = -10;
  ocean.position.x = -250;
  getScene().add(ocean);

  const concrete2Tex = new THREE.TextureLoader().load('textures/concrete2.jpg', render);
  concrete2Tex.wrapS = THREE.RepeatWrapping;
  concrete2Tex.wrapT = THREE.RepeatWrapping;
  concrete2Tex.repeat.set(1000, 1);

  const wallGeo = new THREE.BoxGeometry(1, 1, 1000);
  wallGeo.translate(1.5, -1, 0);
  const wallMat = new THREE.MeshBasicMaterial({ map: concrete2Tex });
  const wall = new THREE.Mesh(wallGeo, wallMat);
  getScene().add(wall);

  const plantTex = new THREE.TextureLoader().load('textures/plant.webp', render);
  plantTex.wrapS = THREE.RepeatWrapping;
  plantTex.wrapT = THREE.RepeatWrapping;
  plantTex.repeat.set(4, 1000);

  const plantGeo = new THREE.CylinderGeometry(0.8, 0.8, 1000, 30);
  plantGeo.rotateX(Math.PI / 2);
  plantGeo.translate(1.8, -0.8, -10);
  const plantMat = new THREE.MeshBasicMaterial({ map: plantTex });
  const plant = new THREE.Mesh(plantGeo, plantMat);
  getScene().add(plant);

  const metalTex = new THREE.TextureLoader().load('textures/metal.jpg', render);
  metalTex.wrapS = THREE.RepeatWrapping;
  metalTex.wrapT = THREE.RepeatWrapping;
  metalTex.repeat.set(4, 4);

  const lightPostGeos = [];
  for (let i = 0; i < 1000 / 10; i++) {
    const geo1 = new THREE.CylinderGeometry(0.1, 0.1, 4, 10);
    const geo2 = new THREE.CylinderGeometry(0.1, 0.1, 1, 10);
    geo2.rotateZ(Math.PI / 2);
    geo2.translate(0.5, 1.5, 0)
    const geo = BufferGeometryUtils.mergeBufferGeometries([geo1, geo2]);
    geo.translate(2, 2, -10 * i);
    lightPostGeos.push(geo);
  }
  const lightPostGeo = BufferGeometryUtils.mergeBufferGeometries(lightPostGeos);
  const lightPostMat = new THREE.MeshBasicMaterial({ map: metalTex });
  const lightPost = new THREE.Mesh(lightPostGeo, lightPostMat);
  getScene().add(lightPost);
};
