import * as THREE from 'three'

const shader = ({ position = new THREE.Vector3(0, 0, 0) } = {}) => ({
  uniforms: {
    uPosition: { value: position },
    uScale: { value: 1 },
    uResolution: { value: new THREE.Vector2() },
    uImageAspect: { value: 1 },
    uTexture: { value: null },
    uMaskTexture: { value: null },
    uMaskChannel: { value: new THREE.Vector3() },
    uSaturation: { value: 1 },
    uShineT: { value: 0 },
    uShineOpacity: { value: 0 },
    uShineColor: { value: new THREE.Color() },
    uOverlay: { value: 0 },
    uOpacity: { value: 1 },
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
    uniform sampler2D uMaskTexture;
    uniform float uSaturation;
    uniform vec3 uMaskChannel;
    uniform float uShineT;
    uniform float uShineOpacity;
    uniform vec3 uShineColor;
    uniform float uOverlay;
    uniform float uOpacity;

    vec3 czm_saturation(vec3 rgb, float adjustment) {
      // Algorithm from Chapter 16 of OpenGL Shading Language
      const vec3 W = vec3(0.2125, 0.7154, 0.0721);
      vec3 intensity = vec3(dot(rgb, W));
      return mix(intensity, rgb, adjustment);
  }

    vec2 rotateUV(vec2 uv, float rotation) {
        float mid = 0.5;
        return vec2(
            cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
            cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
        );
    }

    void main() {
        float scale = 1.0;
        float screenAspect = uResolution.x / uResolution.y;
        float aspect = screenAspect / uImageAspect;
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        vec2 screenUv = uv;
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

        vec3 masked = textureGrad(uMaskTexture, uv, dx, dy).rgb * uMaskChannel;
        float mask = masked.r + masked.g + masked.b;

        gl_FragColor = vec4(color.rgb, mask);

        vec2 shineUv = rotateUV(vUv, 3.14 * 0.33);
        float shineT = uShineT * 1.5 - 0.25;
        float shineFalloff = 0.4;
        float shineOpacity = uShineOpacity;
        float shineVal = smoothstep(shineT - shineFalloff, shineT + 0.0, shineUv.x) * smoothstep(shineT + shineFalloff, shineT + 0.0, shineUv.x);
        gl_FragColor.rgb = mix(gl_FragColor.rgb, uShineColor * 4.0, shineOpacity * shineVal);
        if (uShineT > 0.0) gl_FragColor.a *= shineVal;
        // gl_FragColor *= shineOpacity;
        // gl_FragColor.rgb += shineOpacity * uShineColor * 1.0;
        float lum = czm_saturation(gl_FragColor.rgb, 0.0).r * 1.5;
        gl_FragColor.rgb = mix(gl_FragColor.rgb, lum * uShineColor, uOverlay);
        gl_FragColor.a *= uOpacity;



        // gl_FragColor.rgb = czm_saturation(gl_FragColor.rgb, uSaturation);
        // gl_FragColor.rgb *= uSaturation * 0.5 + 0.5;
        // gl_FragColor = vec4(screenUv, 1.0, 1.0);

        // gl_FragColor.rgb = vec3(masked);
        // gl_FragColor.a = 1.0;

        #include <encodings_fragment>
    }
  `,
})

export default shader
