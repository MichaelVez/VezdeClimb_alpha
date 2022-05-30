import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "./Wall.css";

function App() {
  function Ground() {
    return (
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshLambertMaterial attach='material' color='lightblue' />
      </mesh>
    );
  }
  const Item = (x, y, z = 0) => {
    return (
      <mesh
        key={Math.random()}
        position={[x, y, z]}
        onClick={(e) => {
          let pos = e.object.position;
          console.log(pos);

          let newHold = [...Hold];
          newHold.push(CreateHold(pos.x, pos.y, 1));
          setHold(newHold);
        }}
      >
        <boxGeometry args={[]} />
        <meshStandardMaterial color={"#e0e0e0"} />
      </mesh>
    );
  };
  const CreateHold = (x, y, z) => {
    let holdSizeHeight = 1;
    let holdSizeWidth = 1;
    return (
      <mesh key={Math.random()} position={[x, y, z]}>
        <tetrahedronBufferGeometry args={[holdSizeWidth, holdSizeHeight]} />
        <meshNormalMaterial color={"cornflowerblue"} />
      </mesh>
    );
  };
  let ArrWall = [];
  let x_start = -15;
  let x_end = 15;
  let y_start = 0;
  let y_end = 30;
  for (let i = x_start; i < x_end; i++) {
    for (let j = y_start; j < y_end; j++) {
      ArrWall.push(Item(i, j));
    }
  }
  let [Hold, setHold] = useState([]);
  ArrWall.push();
  return (
    <div className='container'>
      {/* //can add stuff here also */}
      <Canvas camera={{ fov: 75, position: [0, 40, 40] }}>
        {/*@ controls @*/}
        <OrbitControls />
        <color attach='background' args={["#b5daff"]} />
        <Stars />

        {/*@ ground @*/}
        <Ground />

        {/*@ climbing wall @*/}
        {/* <Wall /> */}

        {ArrWall}
        {Hold}
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={2}
          penumbra={0.5}
          color={"blue"}
        />
        <pointLight position={[0, 10, -10]} />
        <pointLight position={[0, 10, 10]} />
      </Canvas>
    </div>
  );
}

export default App;
