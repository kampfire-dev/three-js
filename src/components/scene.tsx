import { OrbitControls, Text, useFBO } from "@react-three/drei";
import { createPortal, useFrame, useThree } from "@react-three/fiber";
import {
  CopyPass,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";
import { useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Mesh, Scene } from "three";
import { v4 as uuidv4 } from "uuid";
import { Campfire } from "./campfire";
import { blendShaderMaterial } from "./shader-materials/BlendShader";
import { SobelEdge, SobelEdgeEffect } from "./sobel-effect";
import { RenderPass as RenderPassJSX } from "./render-pass";
import {
  EffectComposerContext,
  EffectComposer as EffectComposerJSX,
} from "@react-three/postprocessing";

export function TestScene() {
  const renderTargetNormal = useFBO();
  const renderTargetSobel = useFBO();
  const normalScene = useMemo(() => new Scene(), []);
  const sobelScene = useMemo(() => new Scene(), []);
  const { gl, camera } = useThree();

  const composer = useMemo(() => {
    const composer = new EffectComposer(gl);

    composer.autoRenderToScreen = false;
    composer.addPass(new RenderPass(sobelScene, camera));
    composer.addPass(
      new EffectPass(
        camera,
        new SobelEdgeEffect({
          edgeColor: new THREE.Color(1, 0, 0),
          emissiveColor: new THREE.Color(1, 1, 1),
          emissiveIntensity: 0.9,
        })
      )
    );
    composer.addPass(new CopyPass(renderTargetSobel));

    return composer;
  }, [gl, camera, sobelScene, renderTargetSobel]);

  useFrame(({ gl }, delta) => {
    const previousAutoClear = gl.autoClear;
    gl.autoClear = true;

    // Render the red scene
    gl.setRenderTarget(renderTargetNormal);
    gl.render(normalScene, camera);

    // Render the blue scene
    composer.render(delta);

    gl.autoClear = previousAutoClear;

    // Final pass: Render to screen
    gl.setRenderTarget(null);
  });

  return (
    <>
      <OrbitControls />

      {createPortal(<PortalSceneNormal />, normalScene)}
      {createPortal(<PortalSceneSobel />, sobelScene)}

      <mesh frustumCulled={false}>
        <planeGeometry args={[6, 6]} />
        <shaderMaterial
          key={uuidv4()}
          transparent
          vertexShader={blendShaderMaterial.vertexShader}
          fragmentShader={blendShaderMaterial.fragmentShader}
          uniforms={{
            tTexture1: { value: renderTargetNormal.texture },
            tTexture2: { value: renderTargetSobel.texture },
            blendMode: { value: 0 },
            winResolution: {
              value: new THREE.Vector2(
                window.innerWidth,
                window.innerHeight
              ).multiplyScalar(Math.min(window.devicePixelRatio, 2)),
            },
          }}
        />
      </mesh>
    </>
  );
}

function PortalSceneSobel() {
  const objectRef = useRef<Mesh | null>(null);
  const objectRef2 = useRef<Mesh | null>(null);

  useFrame((_, delta) => {
    if (!objectRef.current || !objectRef2.current) return;

    // rotate the object
    objectRef.current.rotation.y += 1 * delta;
    objectRef2.current.rotation.y += 1 * delta;
  });

  return (
    <>
      <directionalLight position={[10, 10, 10]} />
      <directionalLight position={[-10, -10, -10]} />
      <Campfire ref={objectRef} position={[0, -2, 0]} />
      <mesh ref={objectRef2} position={[2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <EffectComposerJSX>
        <SobelEffectPipeline />
      </EffectComposerJSX>
    </>
  );
}

function SobelEffectPipeline() {
  const { composer } = useContext(EffectComposerContext);

  useEffect(() => {
    composer.autoRenderToScreen = false;
  }, [composer]);

  return (
    <>
      <RenderPassJSX />
      <SobelEdge />
    </>
  );
}

function PortalSceneNormal() {
  const objectRef = useRef<Mesh | null>(null);
  useFrame((_, delta) => {
    if (!objectRef.current) return;

    // rotate the object
    objectRef.current.rotation.y += 1 * delta;
  });

  return (
    <>
      <directionalLight position={[10, 10, 10]} />
      <directionalLight position={[-10, -10, -10]} />
      <Text font={"/fonts/JetBrainsMono-Regular.ttf"} position={[0, 2, 0]}>
        kampfire.dev
        <meshStandardMaterial
          color="#eeffee"
          emissive="#ddffdd"
          emissiveIntensity={0.75}
        />
      </Text>
      <mesh ref={objectRef} position={[-2, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
    </>
  );
}
