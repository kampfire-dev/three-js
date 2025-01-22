import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export function PostEffects() {
  return (
    <EffectComposer>
      {/* <DepthOfField
        focusDistance={3}
        focalLength={0.02}
        bokehScale={2}
        height={480}
      /> */}
      <ChromaticAberration
        offset={new Vector2(0.002, 0)}
        radialModulation={false}
        modulationOffset={0.0005}
      />
      <Bloom luminanceThreshold={0.1} luminanceSmoothing={1} height={300} />
      <Noise opacity={0.05} />
      <Vignette eskil={false} offset={0.1} darkness={1.1} />
    </EffectComposer>
  );
}
