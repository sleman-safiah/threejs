import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

import EarthDayMap from "../../assets/testures/8k_earth_daymap.jpg";
import EarthCloudsMap from "../../assets/testures/8k_earth_clouds.jpg";
import EarthNormalMap from "../../assets/testures/8k_earth_normal_map.jpg";
import EarthSpecularMap from "../../assets/testures/8k_earth_specular_map.jpg";

export default function Earth({}) {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    EarthDayMap,
    EarthNormalMap,
    EarthSpecularMap,
    EarthCloudsMap,
  ]);

  useFrame(({ clock }) => {
    const a = clock.elapsedTime;
    earthRef.current.rotation.y = a / 9;
    cloudsRef.current.rotation.y = a / 10;
  });

  return (
    <>
      <pointLight color={"#f6f3ea"} position={[2, 0, 2.8]} intensity={2} />
      <ambientLight intensity={0.2} />
      <Stars
        radius={300}
        depth={50}
        count={10000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh scale={2} ref={cloudsRef}>
        <sphereGeometry args={[1.005, 64, 64]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh scale={2} ref={earthRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhongMaterial map={specularMap} />
        <meshStandardMaterial map={colorMap} metalness={0.4} roughness={0.7} />
        {/* <OrbitControls zoomSpeed={0.6} panSpeed={0.5} rotateSpeed={0.4} /> */}
      </mesh>
    </>
  );
}
