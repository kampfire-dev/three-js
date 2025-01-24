import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { RenderPass as RenderPassImpl } from "postprocessing";

export function RenderPass(props: { layers?: number }) {
  const { scene, camera } = useThree();
  const pass = useMemo(() => {
    const targetCamera = camera.clone();
    if (props.layers) {
      targetCamera.layers.set(props.layers);
    }
    return new RenderPassImpl(scene, targetCamera);
  }, [scene, camera, props.layers]);
  return <primitive object={pass} />;
}
