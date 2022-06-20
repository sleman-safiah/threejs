import React, { Suspense } from "react";
import "./App.css";

import { Canvas } from "@react-three/fiber";
import Earth from "./comonents/earth/Earth";
import Section from "./topSection/Section";
import Finger from "./comonents/finger-print/Finger";

export default function App() {
  return (
    <div className="container">
      <Canvas>
        <Suspense fallback={null}>
          {/* <Earth /> */}
          <Finger />
        </Suspense>
      </Canvas>
      <Section />
    </div>
  );
}
