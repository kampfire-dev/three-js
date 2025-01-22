import { OrbitControls, Text } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import "./App.css";
import { PostEffects } from "./components/post-effects";
import { Campfire } from "./components/campfire";

function App() {
  const [count, setCount] = useState(0);

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
            emissiveIntensity={0.5}
          />
        </Text>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {/* <mesh
          onClick={() => setCount((count) => count + 1)}
          onPointerOver={() => console.log("hovered")}
          onPointerOut={() => console.log("unhovered")}
          position={[3, 3, 0]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={count > 5 ? "hotpink" : "orange"} />
        </mesh> */}
        <Campfire position={[0, -1, 0]} />
        <PostEffects />
      </Canvas>
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <p>Campfire by Poly by Google [CC-BY] via Poly Pizza</p>
      </div>
    </>
  );
}

export default App;
