import { OrbitControls, Text, Stats } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useRef, useState } from "react";
import { PostEffects } from "./components/post-effects";
import { Campfire } from "./components/campfire";
import {
  EffectComposer,
  Outline,
  Select,
  Selection,
} from "@react-three/postprocessing";

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        <color attach="background" args={["#242424"]} />
        <OrbitControls />
        <Text font={"/fonts/JetBrainsMono-Regular.ttf"} position={[0, 2, 0]}>
          kampfire.dev
          <meshStandardMaterial
            color="#eeffee"
            emissive="#ddffdd"
            emissiveIntensity={0.9}
          />
        </Text>
        {/* <mesh
          onClick={() => setCount((count) => count + 1)}
          onPointerOver={() => console.log("hovered")}
          onPointerOut={() => console.log("unhovered")}
          position={[3, 3, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={count > 5 ? "hotpink" : "orange"} />
        </mesh> */}
        {/* <Selection>
          <Select enabled> */}
        <Campfire position={[0, -1, 0]} />
        {/* </Select> */}
        <PostEffects />
        {/* </Selection> */}
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
