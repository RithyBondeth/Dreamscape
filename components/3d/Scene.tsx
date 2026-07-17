"use client";

import {
  AdaptiveDpr,
  Preload,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { Component, type ErrorInfo, type ReactNode, Suspense } from "react";
import {
  ACESFilmicToneMapping,
  SRGBColorSpace,
} from "three";
import CameraController, {
  type CameraViewId,
} from "@/components/3d/CameraController";
import Car, { CarFallback } from "@/components/3d/Car";
import SceneEnvironment from "@/components/3d/Environment";
import Lighting from "@/components/3d/Lighting";
import Villa, { VillaFallback } from "@/components/3d/Villa";

class ModelErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode; label: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`Failed to load ${this.props.label}`, error, info);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Scene({ activeView }: { activeView: CameraViewId }) {
  return (
    <Canvas
      className="scene-canvas"
      shadows="soft"
      dpr={[1, 1.75]}
      camera={{
        position: [30, 14, 38],
        fov: 38,
        near: 0.1,
        far: 180,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.outputColorSpace = SRGBColorSpace;
        gl.toneMapping = ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.88;
      }}
    >
      <Suspense fallback={null}>
        <SceneEnvironment />
        <Lighting />

        <ModelErrorBoundary label="villa model" fallback={<VillaFallback />}>
          <Villa />
        </ModelErrorBoundary>
        <ModelErrorBoundary label="car model" fallback={<CarFallback />}>
          <Car />
        </ModelErrorBoundary>

        <CameraController activeView={activeView} />

        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.3}
            luminanceThreshold={1.05}
            luminanceSmoothing={0.35}
            mipmapBlur
          />
          <Vignette offset={0.22} darkness={0.68} />
        </EffectComposer>
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
