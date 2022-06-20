import React, { useEffect, useRef } from "react";
import { Stars, useTexture, Line } from "@react-three/drei";
import * as THREE from "three";
import { gsap } from "gsap";
import FingerPrint from "../../assets/testures/fingerPrint.png";
import Frame from "../../assets/testures/frame.png";
import Particles from "../Particles";
import BloomLine from "../BloomLine";
import { useFrame } from "@react-three/fiber";

export default function Finger() {
  const colorMap = useTexture(FingerPrint);
  const frameColorMap = useTexture(Frame);

  const mouse = useRef([0, 0]);
  const FingerPrintRef = useRef();
  const FingerPrintFrameRef = useRef();
  let right = true;
  useFrame(({ clock }) => {
    if (right) {
      FingerPrintRef.current.rotation.y += 1 / 400;
      FingerPrintFrameRef.current.rotation.y += 1 / 400;
      if (FingerPrintRef.current.rotation.y >= 0.3) {
        right = false;
      }
    } else {
      FingerPrintRef.current.rotation.y -= 1 / 400;
      FingerPrintFrameRef.current.rotation.y -= 1 / 400;
      if (FingerPrintRef.current.rotation.y <= -0.5) {
        right = true;
      }
    }
  }, []);

  return (
    <>
      <pointLight color={"#f6f3ea"} position={[0, 0, 2.8]} intensity={0.6} />
      <ambientLight intensity={0.2} />
      <Stars
        radius={300}
        depth={50}
        count={10000}
        factor={7}
        saturation={0}
        fade={true}
      />
      <mesh ref={FingerPrintRef} position={[4, 0, 0]}>
        <planeBufferGeometry attach={"geometry"} args={[1.8, 3.25]} />
        <meshPhongMaterial
          map={colorMap}
          opacity={1}
          depthWrite
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={FingerPrintFrameRef} position={[4, 0, 0]}>
        <planeBufferGeometry attach={"geometry"} args={[3.5, 4]} />
        <meshPhongMaterial
          map={frameColorMap}
          opacity={1}
          depthWrite
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Particles count={500} mouse={mouse} />
      <BloomLine />
    </>
  );
}
