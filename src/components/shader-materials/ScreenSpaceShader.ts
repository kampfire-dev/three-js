const vertexShader = `
varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0); // render in screen space
}
`;

const fragmentShader = `
uniform vec2 winResolution;
uniform sampler2D uTexture;

void main() {
  vec2 uv = gl_FragCoord.xy / winResolution.xy;
  vec4 color = texture2D(uTexture, uv);

  gl_FragColor = color;
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}
`;

export { vertexShader, fragmentShader };
