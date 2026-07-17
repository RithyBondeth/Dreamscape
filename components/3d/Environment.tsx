"use client";

import {
  Environment as DreiEnvironment,
  Instances,
  Instance,
  RoundedBox,
  Sparkles,
} from "@react-three/drei";
import { useMemo } from "react";

const SHRUB_POSITIONS: Array<[number, number, number, number]> = [
  [-23, 0.65, 12, 1.3],
  [-20, 0.7, 14, 1.5],
  [-16.5, 0.6, 14.5, 1.15],
  [-12, 0.58, 15, 1.1],
  [-7.5, 0.68, 14.2, 1.35],
  [8, 0.65, 13.8, 1.3],
  [12, 0.62, 14.5, 1.18],
  [17, 0.74, 13.5, 1.52],
  [22, 0.65, 11.5, 1.25],
  [-25, 0.72, 5, 1.45],
  [-25.5, 0.72, -1, 1.35],
  [-24, 0.7, -8, 1.4],
  [24, 0.65, 5, 1.2],
  [25, 0.7, -2, 1.4],
  [23.5, 0.68, -9, 1.3],
];

function Pool() {
  return (
    <group position={[-14.4, 0, -6.8]}>
      <RoundedBox
        args={[12.8, 0.34, 7]}
        radius={0.25}
        smoothness={4}
        position={[0, 0.02, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#c5bfae" roughness={0.82} />
      </RoundedBox>
      <RoundedBox
        args={[11.7, 0.28, 5.9]}
        radius={0.2}
        smoothness={4}
        position={[0, 0.22, 0]}
      >
        <meshPhysicalMaterial
          color="#0a8790"
          emissive="#0b4d54"
          emissiveIntensity={0.48}
          metalness={0.18}
          roughness={0.08}
          transmission={0.45}
          thickness={0.8}
          transparent
          opacity={0.9}
          envMapIntensity={2}
        />
      </RoundedBox>
      {[-4.7, -1.6, 1.6, 4.7].map((x) => (
        <mesh key={x} position={[x, 0.35, -2.45]}>
          <boxGeometry args={[1.2, 0.045, 0.06]} />
          <meshStandardMaterial
            color="#93e9e4"
            emissive="#47c8c8"
            emissiveIntensity={4}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Garage() {
  return (
    <group position={[13.5, 0, -1.5]}>
      <RoundedBox
        args={[8.8, 0.3, 12]}
        radius={0.08}
        smoothness={3}
        position={[0, 0.05, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#292a26" roughness={0.52} metalness={0.18} />
      </RoundedBox>
      <RoundedBox
        args={[6.6, 0.08, 8.2]}
        radius={0.08}
        smoothness={3}
        position={[0, 0.24, -0.2]}
        receiveShadow
      >
        <meshStandardMaterial color="#3c3c36" roughness={0.34} metalness={0.26} />
      </RoundedBox>
      <RoundedBox
        args={[8.8, 0.32, 12]}
        radius={0.08}
        smoothness={3}
        position={[0, 4.25, 0]}
        castShadow
      >
        <meshStandardMaterial color="#10120f" roughness={0.32} metalness={0.62} />
      </RoundedBox>
      <mesh position={[0, 2.16, -5.86]} castShadow receiveShadow>
        <boxGeometry args={[8.8, 4.12, 0.24]} />
        <meshStandardMaterial color="#383833" roughness={0.74} />
      </mesh>
      <mesh position={[4.28, 2.16, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 4.12, 12]} />
        <meshStandardMaterial color="#22231f" roughness={0.54} metalness={0.28} />
      </mesh>
      <mesh position={[-4.28, 2.16, -3.2]} castShadow receiveShadow>
        <boxGeometry args={[0.24, 4.12, 5.3]} />
        <meshStandardMaterial color="#22231f" roughness={0.54} metalness={0.28} />
      </mesh>

      {[-3.3, -2.2, -1.1, 0, 1.1, 2.2, 3.3].map((x) => (
        <mesh key={x} position={[x, 2.22, -5.72]} castShadow>
          <boxGeometry args={[0.06, 3.35, 0.08]} />
          <meshStandardMaterial color="#151613" roughness={0.42} metalness={0.38} />
        </mesh>
      ))}

      {[-2.6, 0, 2.6].map((x) => (
        <mesh key={x} position={[x, 4.04, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.08, 7.5]} />
          <meshStandardMaterial
            color="#fff2d9"
            emissive="#ffd19a"
            emissiveIntensity={7}
            toneMapped={false}
          />
        </mesh>
      ))}

      <mesh position={[-4.14, 2.1, 1.5]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[4.8, 3.7]} />
        <meshPhysicalMaterial
          color="#81918f"
          transparent
          opacity={0.2}
          roughness={0.08}
          transmission={0.55}
          thickness={0.08}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function LandscapeLighting() {
  const positions = useMemo(
    () => [
      [-19, 8],
      [-9, 10],
      [8, 9],
      [19, 7],
    ],
    [],
  );

  return (
    <>
      {positions.map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, 0, z]}>
          <mesh position={[0, 0.48, 0]} castShadow>
            <boxGeometry args={[0.12, 0.95, 0.12]} />
            <meshStandardMaterial color="#151713" metalness={0.72} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.92, 0]}>
            <boxGeometry args={[0.18, 0.18, 0.18]} />
            <meshStandardMaterial
              color="#ffc98b"
              emissive="#ff9c4f"
              emissiveIntensity={5}
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function SceneEnvironment() {
  return (
    <>
      <color attach="background" args={["#141814"]} />
      <fog attach="fog" args={["#1b201c", 34, 105]} />
      <DreiEnvironment
        files="/assets/environment/venice-sunset-1k.hdr"
        background
        backgroundBlurriness={0.16}
        environmentIntensity={0.78}
      />

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.16, -8]}>
        <planeGeometry args={[140, 140, 1, 1]} />
        <meshStandardMaterial color="#1b2a20" roughness={0.94} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.1, 13]}>
        <planeGeometry args={[18, 33]} />
        <meshStandardMaterial color="#6c685f" roughness={0.86} />
      </mesh>

      <Garage />
      <Pool />
      <LandscapeLighting />

      <Instances limit={SHRUB_POSITIONS.length} castShadow receiveShadow>
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial color="#273c2a" roughness={0.95} />
        {SHRUB_POSITIONS.map(([x, y, z, scale]) => (
          <Instance
            key={`${x}-${z}`}
            position={[x, y, z]}
            scale={[scale, scale * 0.76, scale]}
          />
        ))}
      </Instances>

      <Sparkles
        count={75}
        scale={[62, 17, 62]}
        position={[0, 7, -8]}
        size={0.7}
        speed={0.12}
        opacity={0.26}
        color="#f9d3a2"
        noise={1.2}
      />
    </>
  );
}
