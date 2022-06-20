import { Line, Plane } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function BloomLine({}) {
  const ref = useRef();
  const planeRef = useRef();
  const meshRef = useRef();
  let up = true;
  let right = true;

  useFrame(({ clock }) => {
    if (right) {
      planeRef.current.rotation.y += 1 / 400;
      ref.current.rotation.y += 1 / 400;
      if (planeRef.current.rotation.y >= 0.3) {
        right = false;
      }
    } else {
      planeRef.current.rotation.y -= 1 / 400;
      ref.current.rotation.y -= 1 / 400;
      if (planeRef.current.rotation.y <= -0.5) {
        right = true;
      }
    }
    if (up) {
      ref.current.position.y += 1 / 100;
      if (meshRef.current.opacity < 0.2 && ref.current.position.y <= -0.5) {
        meshRef.current.opacity += 1 / 400;
      }
      if (ref.current.position.y >= 0.5) meshRef.current.opacity -= 1 / 400;
      if (ref.current.position.y >= 1.6) {
        meshRef.current.opacity = 0;
        up = false;
      }
    } else {
      ref.current.position.y -= 1 / 100;
      if (meshRef.current.opacity < 0.2 && ref.current.position.y >= 0.5)
        meshRef.current.opacity += 1 / 400;
      if (ref.current.position.y <= -0.5) {
        meshRef.current.opacity -= 1 / 400;
      }
      if (ref.current.position.y <= -1.6) {
        up = true;
      }
    }
  }, []);
  return (
    <>
      <directionalLight args={[0, 1, 2]} intensity={2} />
      <group ref={ref} position={[4, -1.6, 0.1]}>
        <Line
          points={[
            [-1.7, 0, 0],
            [1.7, 0, 0],
          ]}
          opacity={0}
          color="#24A52D"
          lineWidth={4}
          dashed={false}
        />
      </group>
      <Plane
        ref={planeRef}
        args={[3.2, 3.6]}
        position={[4, 0, 0.1]}
        visible={true}
      >
        <meshLambertMaterial
          ref={meshRef}
          color={"green"}
          transparent={true}
          visible={true}
          alphaTest={0}
          opacity={0}
        />
      </Plane>
    </>
  );
}
