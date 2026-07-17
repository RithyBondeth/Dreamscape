"use client";

import { OrbitControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type CameraViewId = "exterior" | "garage" | "garden";

const CAMERA_VIEWS: Record<
  CameraViewId,
  {
    position: [number, number, number];
    target: [number, number, number];
    fov: number;
  }
> = {
  exterior: {
    position: [30, 14, 38],
    target: [0, 3.4, 0],
    fov: 38,
  },
  garage: {
    position: [13.8, 2.8, 8.2],
    target: [13.5, 1.05, -1.8],
    fov: 34,
  },
  garden: {
    position: [-23, 8.5, 10],
    target: [-12.5, 1.6, -2.5],
    fov: 36,
  },
};

export default function CameraController({
  activeView,
}: {
  activeView: CameraViewId;
}) {
  const { camera } = useThree();
  const controls = useRef<OrbitControlsImpl>(null);
  const transition = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const orbit = controls.current;
    if (!orbit) return;

    transition.current?.kill();
    const view = CAMERA_VIEWS[activeView];
    const target = {
      x: orbit.target.x,
      y: orbit.target.y,
      z: orbit.target.z,
    };

    orbit.enabled = false;
    transition.current = gsap
      .timeline({
        defaults: {
          duration: 2.35,
          ease: "power3.inOut",
        },
        onComplete: () => {
          orbit.enabled = true;
        },
      })
      .to(
        camera.position,
        {
          x: view.position[0],
          y: view.position[1],
          z: view.position[2],
        },
        0,
      )
      .to(
        target,
        {
          x: view.target[0],
          y: view.target[1],
          z: view.target[2],
          onUpdate: () => {
            orbit.target.set(target.x, target.y, target.z);
            orbit.update();
          },
        },
        0,
      )
      .to(
        camera,
        {
          fov: view.fov,
          onUpdate: () => camera.updateProjectionMatrix(),
        },
        0,
      );

    return () => {
      transition.current?.kill();
      orbit.enabled = true;
    };
  }, [activeView, camera]);

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.055}
      enablePan={false}
      minDistance={6}
      maxDistance={64}
      minPolarAngle={Math.PI * 0.16}
      maxPolarAngle={Math.PI * 0.48}
      autoRotate={activeView === "exterior"}
      autoRotateSpeed={0.22}
      target={CAMERA_VIEWS.exterior.target}
    />
  );
}
