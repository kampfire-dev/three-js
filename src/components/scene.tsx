import { Mesh, Scene, ShaderMaterial, Texture } from "three";
import {
  Dodecahedron,
  MeshPortalMaterial,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  PortalMaterialType,
  RenderTexture,
  useFBO,
} from "@react-three/drei";
import {
  createPortal,
  extend,
  render,
  useFrame,
  useThree,
} from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, PerspectiveCamera as PerspectiveCameraType } from "three";
import { sobelShaderProps } from "./shader-materials/SobelShaderMat";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import {
  CopyPass,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { SobelEdgeEffect } from "./sobel-effect";
import getFullscreenTriangle from "./getFullscreenTriangle";

export function TestScene() {
  const renderTarget = useFBO();
  const texture = new THREE.Texture();
  const portalScene = new Scene();
  const portalMaterial = useRef<PortalMaterialType | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const textureRef = useRef<Texture | null>(null);
  const cameraRef = useRef<PerspectiveCameraType | null>(null);
  const { gl, camera } = useThree();

  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);
    if (!camera) return composer;
    composer.autoRenderToScreen = false;
    composer.addPass(new RenderPass(portalScene, camera));
    composer.addPass(new EffectPass(camera, new SobelEdgeEffect()));
    composer.addPass(new CopyPass(renderTarget));
    return composer;
  }, [gl, camera, portalScene, renderTarget]);

  useFrame(({ gl }, delta) => {
    const previousAutoClear = gl.autoClear;
    gl.autoClear = true;
    composer.render(delta);
    gl.autoClear = previousAutoClear;
    gl.setRenderTarget(null);
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        position={[0, 0, 8]}
        aspect={1 / 1}
      />
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} layers={0} />
      {/* <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <MeshPortalMaterial ref={portalMaterial}>
          <PortalScene />
        </MeshPortalMaterial>
      </mesh> */}
      <Dodecahedron position={[0, 2, 0]} layers={0}>
        <meshStandardMaterial color="red" />
      </Dodecahedron>
      {createPortal(<PortalScene />, portalScene)}
      <mesh
        position={[0, 0, 0]}
        frustumCulled={false}
        geometry={getFullscreenTriangle()}
      >
        <meshBasicMaterial
          key={uuidv4()}
          map={renderTarget.texture}
          transparent
        />
      </mesh>

      {/* <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <shaderMaterial
          key={uuidv4()}
          vertexShader={sobelShaderProps.vertexShader}
          fragmentShader={sobelShaderProps.fragmentShader}
          uniforms={{
            uTexture: { value: textureRef.current },
            uResolution: {
              value: new THREE.Vector2(
                window.innerWidth,
                window.innerHeight
              ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
            },
          }}
        />
      </mesh> */}
    </>
  );
}

function PortalScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 0]} />
      <Dodecahedron position={[0, -2, 0]}>
        <meshStandardMaterial color="blue" />
      </Dodecahedron>
    </>
  );
}
