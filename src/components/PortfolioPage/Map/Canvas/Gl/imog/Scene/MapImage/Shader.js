import * as THREE from 'three'

export default ({ position = new THREE.Vector3(0, 0, 0) } = {}) => ({
  uniforms: {
    uPosition: { value: position },
    uScale: { value: 1 },
    uResolution: { value: new THREE.Vector2() },
    uImageAspect: { value: 1 },
    uTexture: { value: null },
    uSaturation: { value: 1 },
    uMaskOut: { value: 0 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;

    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        vUv = uv;
    }
  `,
  fragmentShader: /* glsl */ `
    varying vec2 vUv;

    uniform vec3 uPosition;
    uniform float uScale;
    uniform vec2 uResolution;
    uniform float uImageAspect;
    uniform sampler2D uTexture;
    uniform float uSaturation;
    uniform float uMaskOut;


    vec3 czm_saturation(vec3 rgb, float adjustment) {
      // Algorithm from Chapter 16 of OpenGL Shading Language
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      vec3 intensity = vec3(dot(rgb, W));
      return mix(intensity, rgb, adjustment);
  }

    void main() {
        float scale = 1.0;
        float screenAspect = uResolution.x / uResolution.y;
        float aspect = screenAspect / uImageAspect;
        vec2 uv = vUv;
        uv -= 0.5;
        uv.x *= aspect;
        uv /= uScale * scale;
        uv += 0.5;
        uv -= (uPosition.xy / uResolution / uScale) / scale * vec2(aspect, 1.0);
        uv.x += floor(uv.y) * -0.4079;
        
        uv = fract(uv);

        vec2 dx = dFdx(uv);
        vec2 dy = dFdy(uv);
        vec4 color = textureGrad(uTexture, uv, dx, dy);
        
        // vec4 color = texture2D(uTexture, uv);

        gl_FragColor = vec4(color.rgb, 1.0);

        gl_FragColor.rgb = czm_saturation(gl_FragColor.rgb, uSaturation);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * 0.15 + 0.1, 1.0 - uSaturation);
        // gl_FragColor.rgb = mix(gl_FragColor.rgb, smoothstep(0.1, 0.2, gl_FragColor.rgb) * 0.2 + 0.05, 1.0 - uSaturation);


        gl_FragColor.a *= 1.0 - uMaskOut;

        #include <encodings_fragment>
    } 
  `,
})
