"use client";

import { RoundedBox, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import {
  Material,
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Texture,
} from "three";

export const VILLA_MODEL_URL = "/assets/models/villa-optimized.glb";

function improveMaterial(material: Material, anisotropy: number) {
  const upgraded = material.clone();
  const withMap = upgraded as Material & { map?: Texture | null };
  const standard = upgraded as MeshStandardMaterial;

  if (withMap.map) {
    withMap.map.anisotropy = anisotropy;
    withMap.map.needsUpdate = true;
  }

  if ("envMapIntensity" in standard) {
    standard.envMapIntensity = 0.7;
  }

  if (/glass|water/i.test(upgraded.name)) {
    upgraded.transparent = true;
    upgraded.depthWrite = false;
    upgraded.opacity = 0.72;
  }

  return upgraded;
}

function prepareVilla(source: Object3D, anisotropy: number) {
  const clone = source.clone(true);

  clone.traverse((object) => {
    if (!(object instanceof Mesh)) return;

    object.castShadow = !/glass|ivy|curtain/i.test(object.name);
    object.receiveShadow = true;
    object.frustumCulled = true;
    object.material = Array.isArray(object.material)
      ? object.material.map((material) => improveMaterial(material, anisotropy))
      : improveMaterial(object.material, anisotropy);
  });

  return clone;
}

function GlassPavilion() {
  return (
    <group position={[-8.8, 0, -0.8]}>
      <RoundedBox
        args={[7.4, 0.3, 7.8]}
        radius={0.08}
        smoothness={3}
        position={[0, 0.15, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#8f8878" roughness={0.78} />
      </RoundedBox>
      <RoundedBox
        args={[7.4, 0.28, 7.8]}
        radius={0.08}
        smoothness={3}
        position={[0, 4.35, 0]}
        castShadow
      >
        <meshStandardMaterial color="#161814" metalness={0.42} roughness={0.38} />
      </RoundedBox>

      {[-3.45, 3.45].map((x) =>
        [-3.6, 3.6].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 2.25, z]} castShadow>
            <boxGeometry args={[0.16, 4.15, 0.16]} />
            <meshStandardMaterial color="#171915" metalness={0.7} roughness={0.25} />
          </mesh>
        )),
      )}

      <mesh position={[0, 2.25, 3.66]}>
        <planeGeometry args={[6.72, 3.9]} />
        <meshPhysicalMaterial
          color="#8fa1a0"
          transparent
          opacity={0.24}
          roughness={0.06}
          metalness={0.08}
          transmission={0.62}
          thickness={0.08}
          envMapIntensity={1.7}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[-3.54, 2.25, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[7.1, 3.9]} />
        <meshPhysicalMaterial
          color="#80908e"
          transparent
          opacity={0.2}
          roughness={0.08}
          transmission={0.58}
          thickness={0.08}
          depthWrite={false}
        />
      </mesh>

      <group position={[0.2, 0.6, 0.5]}>
        <RoundedBox args={[3.9, 0.68, 1.18]} radius={0.18} smoothness={4} castShadow>
          <meshStandardMaterial color="#d2c7b3" roughness={0.84} />
        </RoundedBox>
        <RoundedBox
          args={[1.14, 1.5, 1.2]}
          radius={0.15}
          smoothness={4}
          position={[-1.42, 0.82, 0]}
          castShadow
        >
          <meshStandardMaterial color="#b9ad99" roughness={0.9} />
        </RoundedBox>
        <RoundedBox
          args={[1.14, 1.5, 1.2]}
          radius={0.15}
          smoothness={4}
          position={[1.42, 0.82, 0]}
          castShadow
        >
          <meshStandardMaterial color="#b9ad99" roughness={0.9} />
        </RoundedBox>
        <mesh position={[0, 0.22, 2.05]} castShadow>
          <cylinderGeometry args={[1.05, 1.12, 0.22, 48]} />
          <meshStandardMaterial color="#392f27" roughness={0.44} metalness={0.28} />
        </mesh>
      </group>

      <mesh position={[0, 3.92, 0]}>
        <boxGeometry args={[3.8, 0.045, 0.045]} />
        <meshStandardMaterial
          color="#ffd39d"
          emissive="#ff9c4f"
          emissiveIntensity={5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export function VillaFallback() {
  return (
    <group position={[0, 0, -1]}>
      <RoundedBox args={[13, 7, 10]} radius={0.15} smoothness={3} position={[0, 3.5, 0]}>
        <meshStandardMaterial color="#c5b9a3" roughness={0.78} />
      </RoundedBox>
      <RoundedBox args={[16, 0.4, 13]} radius={0.08} smoothness={3} position={[0, 7.2, 0]}>
        <meshStandardMaterial color="#1a1b18" roughness={0.4} />
      </RoundedBox>
    </group>
  );
}

export default function Villa() {
  const { scene } = useGLTF(VILLA_MODEL_URL);
  const { gl } = useThree();
  const model = useMemo(
    () => prepareVilla(scene, Math.min(8, gl.capabilities.getMaxAnisotropy())),
    [gl, scene],
  );

  return (
    <group>
      <primitive object={model} />
      <GlassPavilion />
    </group>
  );
}

useGLTF.preload(VILLA_MODEL_URL);
