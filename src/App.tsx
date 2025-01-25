import {
  OrbitControls,
  Text,
  Stats,
  RenderTexture,
  useFBO,
  MeshPortalMaterial,
} from "@react-three/drei";
import { Canvas, createPortal, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { PostEffects } from "./components/post-effects";
import { Campfire } from "./components/campfire";
import {
  EffectComposer,
  Noise,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { SobelEdge } from "./components/sobel-effect";
import { RenderPortal } from "./components/render-portal";
import { CustomComposer } from "./components/custom-composer";
import { TestScene } from "./components/scene";

function App() {
  const renderMesh = useRef<THREE.Mesh | null>(null);
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* <color attach="background" args={["#242424"]} />
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <Text font={"/fonts/JetBrainsMono-Regular.ttf"} position={[0, 2, 0]}>
          kampfire.dev
          <meshStandardMaterial
            color="#eeffee"
            emissive="#ddffdd"
            emissiveIntensity={0.9}
          />
        </Text>
        <ambientLight intensity={0.5} />
        <mesh>
          <boxGeometry args={[3, 3, 3]} />
          <MeshPortalMaterial transparent>
            <ambientLight intensity={1} />
            <Campfire position={[0, -1, 0]} />
            <CustomComposer />
          </MeshPortalMaterial>
        </mesh> */}
        {/* <CustomComposer layers={1} /> */}
        {/* <mesh ref={renderMesh} material={new THREE.MeshBasicMaterial()}>
          <planeGeometry args={[4, 4]} />
        </mesh> */}
        {/* <PostEffects /> */}
        <TestScene />
        <Stats />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 m-1">
        <p className="text-sm text-gray-300">
          Campfire by Poly by Google [CC-BY] via Poly Pizza
        </p>
      </div>
    </>
  );
}

export default App;
