"use client";

import { RoundedBox, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Material, Mesh, MeshStandardMaterial, Object3D, Texture } from "three";

export const CAR_MODEL_URL = "/assets/models/car-bmw-optimized.glb";

const FUTURE_ANIMATION_NODES = {
  driverDoor: "Driver_Door",
  passengerDoor: "Passenger_Door",
  steeringWheel: "Steering Wheel",
} as const;

function upgradeCarMaterial(material: Material, anisotropy: number) {
  const upgraded = material.clone() as MeshStandardMaterial;
  const withMap = upgraded as MeshStandardMaterial & { map?: Texture | null };

  if (withMap.map) {
    withMap.map.anisotropy = anisotropy;
    withMap.map.needsUpdate = true;
  }

  if (upgraded.name === "Material_692") {
    upgraded.color.set("#3a0b0c");
    upgraded.metalness = 0.82;
    upgraded.roughness = 0.16;
    upgraded.envMapIntensity = 2.25;
  } else if (upgraded.name === "Material_699") {
    upgraded.transparent = true;
    upgraded.opacity = 0.46;
    upgraded.roughness = 0.06;
    upgraded.metalness = 0.05;
    upgraded.envMapIntensity = 2.4;
    upgraded.depthWrite = false;
  } else {
    upgraded.envMapIntensity = 1.35;
  }

  return upgraded;
}

function prepareCar(source: Object3D, anisotropy: number) {
  const clone = source.clone(true);

  clone.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    object.castShadow = true;
    object.receiveShadow = true;
    object.frustumCulled = true;
    object.material = Array.isArray(object.material)
      ? object.material.map((material) =>
          upgradeCarMaterial(material, anisotropy),
        )
      : upgradeCarMaterial(object.material, anisotropy);
  });

  clone.userData.animationNodes = Object.fromEntries(
    Object.entries(FUTURE_ANIMATION_NODES).map(([key, name]) => [
      key,
      clone.getObjectByName(name)?.uuid ?? null,
    ]),
  );

  return clone;
}

export function CarFallback() {
  return (
    <group position={[13.5, 0.62, -1.5]}>
      <RoundedBox args={[2.5, 0.7, 4.7]} radius={0.42} smoothness={6} castShadow>
        <meshStandardMaterial
          color="#3a0b0c"
          metalness={0.86}
          roughness={0.16}
        />
      </RoundedBox>
      <RoundedBox
        args={[2.05, 0.72, 2.15]}
        radius={0.4}
        smoothness={6}
        position={[0, 0.5, -0.15]}
        castShadow
      >
        <meshPhysicalMaterial
          color="#192120"
          metalness={0.1}
          roughness={0.08}
          transmission={0.35}
        />
      </RoundedBox>
    </group>
  );
}

export default function Car() {
  const { scene } = useGLTF(CAR_MODEL_URL);
  const { gl } = useThree();
  const model = useMemo(
    () => prepareCar(scene, Math.min(8, gl.capabilities.getMaxAnisotropy())),
    [gl, scene],
  );

  return (
    <group position={[13.5, 0.12, -1.5]} rotation={[0, 0.06, 0]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(CAR_MODEL_URL);
