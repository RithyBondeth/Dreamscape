"use client";

import { ContactShadows } from "@react-three/drei";

const GARDEN_LIGHTS: Array<[number, number, number]> = [
  [-19, 0.85, 8],
  [-9, 0.85, 10],
  [8, 0.85, 9],
  [19, 0.85, 7],
];

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.38} color="#8592a1" />
      <hemisphereLight
        intensity={0.55}
        color="#ffc999"
        groundColor="#14231b"
      />
      <directionalLight
        castShadow
        position={[-24, 28, 22]}
        intensity={2.9}
        color="#ffad73"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-44}
        shadow-camera-right={44}
        shadow-camera-top={44}
        shadow-camera-bottom={-44}
        shadow-bias={-0.0002}
        shadow-normalBias={0.035}
      />
      <directionalLight
        position={[18, 12, -22]}
        intensity={0.85}
        color="#7191c4"
      />

      <spotLight
        castShadow
        position={[13.5, 5.4, 3.5]}
        target-position={[13.5, 0, -1.5]}
        angle={0.62}
        penumbra={0.9}
        intensity={45}
        distance={17}
        color="#ffd8ad"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight
        position={[-8.8, 2.3, 1.5]}
        intensity={13}
        distance={10}
        color="#ffc078"
      />

      {GARDEN_LIGHTS.map((position) => (
        <pointLight
          key={position.join("-")}
          position={position}
          intensity={3.5}
          distance={5}
          decay={2}
          color="#f4b873"
        />
      ))}

      <ContactShadows
        position={[0, 0.04, 0]}
        opacity={0.42}
        scale={72}
        blur={2.6}
        far={16}
        resolution={512}
        frames={1}
        color="#070806"
      />
    </>
  );
}
