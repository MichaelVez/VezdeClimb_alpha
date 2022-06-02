import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  //  Stars
} from "@react-three/drei";
import "./Wall.css";
const CreateHold = (x, y, z) => {
  let holdSizeHeight = 1;
  let holdSizeWidth = 1;
  return (
    <mesh
      key={Math.random()}
      position={[x, y, z]}
      // rotation={[Math.PI / 2, 0, 0]}
    >
      <boxBufferGeometry args={[holdSizeWidth, holdSizeHeight]} />
      <meshNormalMaterial color={"cornflowerblue"} />
    </mesh>
  );
};
function Ground() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshLambertMaterial attach='material' color='lightblue' />
    </mesh>
  );
}
let ArrWall = [];
function App() {
  // let [place, setPlacing] = useState(false);
  let place = true;
  let [Hold, setHold] = useState([]);
  const Item = (x, y, z = 0) => {
    return (
      <mesh
        key={Math.random()}
        position={[x, y, z]}
        onClick={(e) => {
          if (place) {
            place = false;
            console.log(e);
            let pos = e.object.position;
            setTimeout(() => {
              place = true;
            }, 1);
            setHold((prev) => {
              let newHold = [...prev];
              newHold.push(CreateHold(pos.x, pos.y, 1));
              return newHold;
            });
          }
        }}
      >
        <boxGeometry args={[]} />
        <meshStandardMaterial color={"#e0e0e0"} />
      </mesh>
    );
  };

  const [myPos, setMyPos] = useState({
    x_start: -15,
    x_end: 15,
    y_start: 0,
    y_end: 70,
  });

  useEffect(() => {
    console.log("mout");
    for (let i = myPos.x_start; i < myPos.x_end; i++) {
      for (let j = myPos.y_start; j < myPos.y_end; j++) {
        console.log("build");
        ArrWall.push(Item(i, j, -1));
      }
    }
  }, [myPos]);
  return (
    <>
      <div className='container'>
        <Canvas camera={{ fov: 75, position: [0, 40, 40] }}>
          {/*@ controls @*/}
          <OrbitControls />
          <color attach='background' args={["lightblue"]} />
          {/* <Stars /> */}
          {/*@ ground @*/}
          <Ground />
          {/*@ climbing wall array @*/}
          {ArrWall}
          {/* Holds Array */}
          {console.log(Hold)}
          {Hold}
          {console.log(Hold)}
          {/* Lights */}
          <ambientLight intensity={0.9} />
          <spotLight
            position={[10, 10, 10]}
            angle={2}
            penumbra={0.5}
            color={"blue"}
          />
        </Canvas>
      </div>
    </>
  );
}
export default App;
