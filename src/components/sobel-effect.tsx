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
      uniforms: new Map([
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

export const SobelEdge = forwardRef((props: { layers?: number }, ref) => {
  const effect = useMemo(() => new SobelEdgeEffect(), []);
  return <primitive object={effect} ref={ref} />;

  // const { camera } = useThree();

  // const pass = useMemo(() => {
  //   const targetCamera = camera.clone();
  //   if (props.layers) {
  //     targetCamera.layers.set(props.layers);
  //   }
  //   const pass = new EffectPass(targetCamera, new SobelEdgeEffect());
  //   return pass;
  // }, [camera, props]);

  // return <primitive object={pass} ref={ref} />;
});
