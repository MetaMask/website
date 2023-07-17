import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';

const loader = new RGBELoader().setDataType(THREE.UnsignedByteType);
let pmremGenerator = null;

const loadHDR = (url, { renderer } = {}) =>
  new Promise((resolve, reject) => {
    loader.load(
      url,
      (texture) => {
        if (!pmremGenerator)
          pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();
        env = pmremGenerator.fromEquirectangular(texture).texture;
        resolve(env);
      },
      () => {},
      (err) => {
        console.warn(`Could not load texture at ${url}`);
        reject(err);
      }
    );
  });

export default loadHDR;
