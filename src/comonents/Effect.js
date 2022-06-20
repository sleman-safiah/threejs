import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";

extend({
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
});

export default function Effect() {
  const composer = useRef();
  const { gl } = useThree();
  const aspect = useMemo(() => new THREE.Vector2(512, 512), []);

  useFrame(() => composer.current.render(), 1);
  return (
    <effectComposer ref={composer} args={[gl]}>
      <unrealBloomPass attachArray="passes" args={[aspect, 2, 1, 0]} />
    </effectComposer>
  );
}
