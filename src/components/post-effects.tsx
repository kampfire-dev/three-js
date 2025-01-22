import {
  Bloom,
  ChromaticAberration,
  DepthOfField,
  EffectComposer,
  Noise,
  Scanline,
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
      <Bloom luminanceThreshold={0.1} luminanceSmoothing={1} height={300} />
      <ChromaticAberration
        offset={new Vector2(0.002, 0.0002)}
        radialModulation={false}
        modulationOffset={0.0005}
      />
      <Noise opacity={0.09} />
      <Scanline
        blendFunction={BlendFunction.OVERLAY} // blend mode
        density={0.9} // scanline density
      />
      <Vignette eskil={false} offset={0.01} darkness={0.9} />
    </EffectComposer>
  );
}
