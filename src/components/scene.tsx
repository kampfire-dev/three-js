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
  ShaderPass,
} from "postprocessing";
import { SobelEdgeEffect } from "./sobel-effect";
import { getFullscreenTriangle } from "./getFullscreenTriangle";
import {
  fragmentShader,
  vertexShader,
} from "./shader-materials/ScreenSpaceShader";
import { blendShaderMaterial } from "./shader-materials/BlendShader";

export function TestScene() {
  const renderTargetRed = useFBO();
  const renderTargetBlue = useFBO();
  const redScene = new Scene();
  const blueScene = new Scene();

  const portalMaterial = useRef<PortalMaterialType | null>(null);
  const meshRef = useRef<Mesh | null>(null);
  const textureRef = useRef<Texture | null>(null);
  const cameraRef = useRef<PerspectiveCameraType | null>(null);
  const object1Ref = useRef<Mesh | null>(null);
  const object2Ref = useRef<Mesh | null>(null);
  const fullscreenTriangleRef = useRef<Mesh | null>(null);
  const screenCameraRef = useRef<THREE.OrthographicCamera | null>(null);

  // const composer = useMemo(() => {
  //   const composer = new EffectComposer(gl);
  //   if (!camera) return composer;
  //   composer.autoRenderToScreen = false;
  //   composer.addPass(new RenderPass(portalScene, camera));
  //   composer.addPass(new EffectPass(camera, new SobelEdgeEffect()));
  //   composer.addPass(new CopyPass(renderTarget));
  //   return composer;
  // }, [gl, camera, portalScene, renderTarget]);

  useFrame(({ gl, scene, camera }, delta) => {
    const previousAutoClear = gl.autoClear;
    gl.autoClear = true;

    gl.setRenderTarget(renderTargetRed);
    gl.render(redScene, camera);

    gl.setRenderTarget(renderTargetBlue);
    gl.render(blueScene, camera);

    gl.autoClear = previousAutoClear;

    // Final pass: Render to screen
    gl.setRenderTarget(null);
  });

  return (
    <>
      <OrbitControls />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} layers={0} />
      {/* <mesh>
        <boxGeometry args={[4, 4, 4]} />
        <MeshPortalMaterial ref={portalMaterial}>
          <PortalScene />
        </MeshPortalMaterial>
      </mesh> */}
      {/* <Dodecahedron ref={object1Ref} position={[0, 2, 0]} layers={0}>
        <meshStandardMaterial color="red" />
      </Dodecahedron>
      <Dodecahedron ref={object2Ref} position={[0, -2, 0]} layers={0}>
        <meshStandardMaterial color="blue" />
      </Dodecahedron> */}

      {createPortal(<PortalSceneRed />, redScene)}
      {createPortal(<PortalSceneBlue />, blueScene)}

      <mesh frustumCulled={false}>
        <planeGeometry args={[6, 6]} />
        <shaderMaterial
          transparent
          key={uuidv4()}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTexture: { value: renderTargetRed.texture },
            winResolution: {
              value: new THREE.Vector2(
                window.innerWidth,
                window.innerHeight
              ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
            },
          }}
        />
        {/* <shaderMaterial
          key={uuidv4()}
          vertexShader={blendShaderMaterial.vertexShader}
          fragmentShader={blendShaderMaterial.fragmentShader}
          uniforms={{
            tTexture1: { value: renderTargetRed.texture },
            tTexture2: { value: renderTargetBlue.texture },
            winResolution: {
              value: new THREE.Vector2(
                window.innerWidth,
                window.innerHeight
              ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
            },
            blendMode: { value: 2 },
          }}
        /> */}
      </mesh>
      <mesh frustumCulled={false}>
        <planeGeometry args={[6, 6]} />
        <shaderMaterial
          transparent
          key={uuidv4()}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTexture: { value: renderTargetBlue.texture },
            winResolution: {
              value: new THREE.Vector2(
                window.innerWidth,
                window.innerHeight
              ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
            },
          }}
        />
      </mesh>
      {/* {createPortal(<PortalScene />, portalScene)}
      <mesh frustumCulled={false} geometry={getFullscreenTriangle()}>
        <meshBasicMaterial
          key={uuidv4()}
          map={renderTarget.texture}
          side={DoubleSide}
        />
      </mesh> */}

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

function PortalSceneBlue() {
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

function PortalSceneRed() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 0]} />
      <Dodecahedron position={[0, 2, 0]}>
        <meshStandardMaterial color="red" />
      </Dodecahedron>
    </>
  );
}
