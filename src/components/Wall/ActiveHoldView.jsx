import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as dat from "dat.gui";
let gui = new dat.GUI();
export default function ActiveHoldView({ hold }) {
  let Shown = hold;
  let [options, setOptions] = useState({
    holdSizeWidth: 1,
    holdSizeHeight: 1,
    holdSizeZ: 1,
  });
  if (Shown === "boxBufferGeometry") {
    return (
      <div>
        <Canvas
          onCreated={(state) => {
            console.log("crate?");
            gui.add(options, "holdSizeWidth", 1, 15, 1).onChange((val) => {
              let newOpt = { ...options, holdSizeWidth: val };
              setOptions(newOpt);
            });
            gui.add(options, "holdSizeHeight", 1, 15, 1).onChange((val) => {
              let newOpt = { ...options, holdSizeHeight: val };
              setOptions(newOpt);
            });
            gui.add(options, "holdSizeZ", 1, 15, 1).onChange((val) => {
              let newOpt = { ...options, holdSizeZ: val };
              setOptions(newOpt);
            });
          }}
        >
          <OrbitControls />
          <mesh key={Math.random()}>
            <Shown
              attach='geometry'
              args={[
                options.holdSizeWidth,
                options.holdSizeHeight,
                options.holdSizeZ,
              ]}
            />
            <meshNormalMaterial color={"cornflowerblue"} />
          </mesh>
        </Canvas>
        {hold}
      </div>
    );
  }
}
