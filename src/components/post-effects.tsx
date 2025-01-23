import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Outline,
  Scanline,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, VignetteTechnique } from "postprocessing";
import { Vector2 } from "three";
import { LensDistortion } from "./lens-distortion";

export function PostEffects() {
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.5} height={300} />
      <ChromaticAberration
        offset={new Vector2(0.002, 0.0002)}
        radialModulation={true}
        modulationOffset={0.5}
      />
      <Noise opacity={0.09} />
      <Scanline scrollSpeed={0.001} density={0.9} />
      <Vignette
        technique={VignetteTechnique.ESKIL}
        offset={1}
        darkness={1.1}
        blendFunction={BlendFunction.NORMAL}
      />
      <LensDistortion
        distortion={new Vector2(0.1, 0.1)}
        principalPoint={new Vector2(0, 0)}
        focalLength={new Vector2(0.75, 0.75)}
        skew={0}
      />
    </EffectComposer>
  );
}
