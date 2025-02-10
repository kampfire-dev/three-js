import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { RenderPass as RenderPassImpl } from "postprocessing";

export function RenderPass() {
  const { scene, camera } = useThree();
  const pass = useMemo(() => {
    const targetCamera = camera.clone();
    return new RenderPassImpl(scene, targetCamera);
  }, [scene, camera]);
  return <primitive object={pass} />;
}
