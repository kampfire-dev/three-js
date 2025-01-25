import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

export const sobelShaderProps = {
  uniforms: {
    uTexture: null,
    uResolution: new THREE.Vector2(1, 1),
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
   precision highp float;

uniform sampler2D uTexture;  // Input texture
uniform vec2 uResolution;   // Resolution of the texture (e.g., screen size)

varying vec2 vUv;

void main() {
    float kernel[9];
    vec2 offset[9];

    // Define Sobel kernel
    kernel[0] = -1.0; kernel[1] = -2.0; kernel[2] = -1.0;
    kernel[3] =  0.0; kernel[4] =  0.0; kernel[5] =  0.0;
    kernel[6] =  1.0; kernel[7] =  2.0; kernel[8] =  1.0;

    // Define offsets (normalized by resolution)
    offset[0] = vec2(-1.0, -1.0) / uResolution;
    offset[1] = vec2( 0.0, -1.0) / uResolution;
    offset[2] = vec2( 1.0, -1.0) / uResolution;
    offset[3] = vec2(-1.0,  0.0) / uResolution;
    offset[4] = vec2( 0.0,  0.0) / uResolution;
    offset[5] = vec2( 1.0,  0.0) / uResolution;
    offset[6] = vec2(-1.0,  1.0) / uResolution;
    offset[7] = vec2( 0.0,  1.0) / uResolution;
    offset[8] = vec2( 1.0,  1.0) / uResolution;

    // Sample neighboring pixels
    vec3 sampleTex[9];
    for (int i = 0; i < 9; i++) {
        sampleTex[i] = texture2D(uTexture, vUv + offset[i]).rgb;
    }

    // Compute Sobel gradients
    vec3 Gx = vec3(0.0);
    vec3 Gy = vec3(0.0);
    for (int i = 0; i < 9; i++) {
        Gx += kernel[i] * sampleTex[i];
        Gy += kernel[i] * sampleTex[i];
    }

    // Compute edge intensity
    float edge = length(Gx + Gy);

    // Output edge-detected result as grayscale
    gl_FragColor = vec4(vec3(edge), 1);
}
  `,
};

// export const SobelShaderMaterial = shaderMaterial(
//   sobelShaderProps.uniforms,
//   sobelShaderProps.vertexShader,
//   sobelShaderProps.fragmentShader
// );
