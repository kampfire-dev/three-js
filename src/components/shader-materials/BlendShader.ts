import { ShaderMaterial } from "three";

const blendShaderMaterial = new ShaderMaterial({
  uniforms: {
    tTexture1: { value: null }, // First render target
    tTexture2: { value: null }, // Second render target
    blendMode: { value: 0 }, // Change this to switch blend modes (optional)
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform sampler2D tTexture1;
    uniform sampler2D tTexture2;
    uniform int blendMode; // Use this to set different blend modes
    uniform vec2 winResolution;

    void main() {
      vec2 uv = gl_FragCoord.xy / winResolution.xy;
      vec4 color1 = texture2D(tTexture1, uv);
      vec4 color2 = texture2D(tTexture2, uv);
      vec4 blendedColor;

      // Add blend mode
      if (blendMode == 0) {
        blendedColor = color1 + color2; 
      } 
      // Multiply blend mode
      else if (blendMode == 1) {
        blendedColor = color1 * color2;
      }
      // Screen blend mode
      else if (blendMode == 2) {
        blendedColor = vec4(1.0) - (vec4(1.0) - color1) * (vec4(1.0) - color2);
      } else {
        blendedColor = color1; // Default to just showing color1
      }

      gl_FragColor = blendedColor;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
});

export { blendShaderMaterial };
