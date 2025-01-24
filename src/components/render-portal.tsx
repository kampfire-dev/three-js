import { useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, EffectPass, RenderPass } from "postprocessing";
import { RefObject, useMemo } from "react";
import * as THREE from "three";
import { SobelEdgeEffect } from "./sobel-effect";

export function RenderPortal({
  children,
  receiveMesh,
}: {
  children: React.ReactNode;
  receiveMesh: RefObject<THREE.Mesh>;
}) {
  const renderTarget = useFBO();
  const { gl, camera } = useThree();

  const { composer, scene } = useMemo(() => {
    const sobelScene = new THREE.Scene();
    const composer = new EffectComposer(gl);
    composer.addPass(new RenderPass(sobelScene, camera));
    const effectPass = new EffectPass(camera, new SobelEdgeEffect());
    composer.addPass(effectPass);
    return { composer, scene: sobelScene };
  }, [gl, camera]);

  useFrame((state) => {
    const { gl } = state;
    if (!receiveMesh.current) return;
    gl.setRenderTarget(renderTarget);
    gl.clear();
    composer.render();

    receiveMesh.current.material.map = renderTarget.texture;
    gl.setRenderTarget(null);
  });

  return <>{children}</>;
}
