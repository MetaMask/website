import * as THREE from 'three';
import loadTexture from './loadTexture';

let pmremGenerator = null;

const loadEnvMap = async (url, { renderer } = {}) => {
  if (!pmremGenerator) pmremGenerator = new THREE.PMREMGenerator(renderer);
  const texture = await loadTexture(url);
  pmremGenerator.compileEquirectangularShader();
  const env = pmremGenerator.fromEquirectangular(texture).texture;
  return env;
};

export default loadEnvMap;
