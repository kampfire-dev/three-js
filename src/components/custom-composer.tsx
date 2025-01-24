import { useMemo } from "react";
import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { useFrame, useThree } from "@react-three/fiber";
import { SobelEdgeEffect } from "./sobel-effect";

export function CustomComposer(props: { layers?: number }) {
  const { scene, camera, gl } = useThree();
  console.log(scene, camera, gl);
  const composer = useMemo(() => {
    const targetCamera = camera.clone();
    if (props.layers) {
      targetCamera.layers.set(props.layers);
    }
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(scene, targetCamera));

    const effectPass = new EffectPass(targetCamera, new SobelEdgeEffect());
    composer.addPass(effectPass);

    return composer;
  }, [camera, scene, gl, props.layers]);

  useFrame((_, deltaTime) => {
    const previousAutoClear = gl.autoClear;
    gl.autoClear = true;
    composer.render(deltaTime);
    gl.autoClear = previousAutoClear;
  });

  return null;
}
