import { Effect, EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { useContext, useEffect, useRef } from "react";
import { forwardRef, useMemo } from "react";
import { Camera, Layers, Texture, Uniform, WebGLRenderTarget } from "three";
import fragmentShader from "../glsl/sobel.frag?raw";
import { extend, useThree } from "@react-three/fiber";
import { EffectComposerContext } from "@react-three/postprocessing";

// Effect implementation
export class SobelEdgeEffect extends Effect {
  _uParam: number;

  constructor({ param = 0.1 } = {}) {
    super("SobelEdgeEffect", fragmentShader, {
      uniforms: new Map([["param", new Uniform(param)]]),
    });

    this._uParam = param;
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
