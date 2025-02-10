import { Effect } from "postprocessing";
import { forwardRef, useMemo } from "react";
import { Color, Texture, Uniform, WebGLRenderTarget } from "three";
import fragmentShader from "../glsl/sobel.frag?raw";

// Effect implementation
export class SobelEdgeEffect extends Effect {
  _uEdgeColor: Color;

  constructor({
    edgeColor = new Color(1, 1, 1),
    emissiveColor = new Color(0, 0, 0),
    emissiveIntensity = 0.9,
  } = {}) {
    super("SobelEdgeEffect", fragmentShader, {
      uniforms: new Map<string, Uniform<Color | number>>([
        ["edgeColor", new Uniform(edgeColor)],
        ["emissiveColor", new Uniform(emissiveColor)],
        ["emissiveIntensity", new Uniform(emissiveIntensity)],
      ]),
    });

    this._uEdgeColor = edgeColor;
  }

  update(
    _renderer: THREE.WebGLRenderer,
    _inputBuffer: WebGLRenderTarget<Texture>,
    _deltaTime: number
  ) {}
}

export const SobelEdge = forwardRef((_, ref) => {
  const effect = useMemo(() => new SobelEdgeEffect(), []);
  return <primitive object={effect} ref={ref} />;
});
