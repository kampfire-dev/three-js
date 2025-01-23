import { LensDistortionEffect } from "postprocessing";
import React, { useMemo } from "react";
import { Vector2 } from "three";

interface LensDistortionProps {
  distortion: Vector2;
  principalPoint: Vector2;
  focalLength: Vector2;
  skew: number;
}

export const LensDistortion = React.forwardRef<
  React.RefObject<THREE.Mesh>,
  LensDistortionProps
>((props, ref) => {
  const { distortion, principalPoint, focalLength, skew } = props;
  const effect = useMemo(() => {
    const effect = new LensDistortionEffect({
      distortion,
      principalPoint,
      focalLength,
      skew,
    });
    return effect;
  }, [distortion, principalPoint, focalLength, skew]);
  return <primitive ref={ref} {...props} object={effect} />;
});
