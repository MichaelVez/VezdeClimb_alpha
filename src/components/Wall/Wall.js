import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import "./Wall.css";
// import DatGui, { DatNumber } from "react-dat-gui";
// import { GUI } from "dat.gui";
// import { useControls } from "leva";

function App() {
  // let [mouted, setMouted] = useState(false);
  let [Hold, setHold] = useState([]);
  // const { rotation } = useControls({ rotation: 1 });
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
        // ref={ref}
        // rotation={rotation}
        key={Math.random()}
        position={[x, y, z]}
        onClick={(e) => {
          let pos = e.object.position;
          console.log(e);

          let newHold = [...Hold];
          newHold.push(CreateHold(pos.x, pos.y, 1));
          setHold(newHold);
        }}
      >
        <boxGeometry args={[1, 1, 4]} />
        <meshStandardMaterial color={"#e0e0e0"} />
      </mesh>
    );
  };
  const CreateHold = (x, y, z) => {
    let holdSizeHeight = 3;
    let holdSizeWidth = 5;
    return (
      <mesh
        key={Math.random()}
        position={[x, y, z]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <boxBufferGeometry args={[holdSizeWidth, holdSizeHeight]} />
        <meshNormalMaterial color={"cornflowerblue"} />
      </mesh>
    );
  };

  // let x_start = -15;
  // let x_end = 15;
  // let y_start = 0;
  // let y_end = 30;

  const [myPos, setMyPos] = useState({
    x_start: -15,
    x_end: 15,
    y_start: 0,
    y_end: 70,
  });
  console.log(myPos);
  let ArrWall = [];
  useEffect(() => {
    console.log("mout");
    // setMouted(true);
    // const gui = new GUI();
    // const WallFolder = gui.addFolder("Wall");
    // WallFolder.add(myPos, "x_start", 0, 30);
    // WallFolder.add(myPos, "y", 0, Math.PI * 2);
    // WallFolder.add(myPos, "z", 0, Math.PI * 2);
    // WallFolder.open();
  }, []);
  for (let i = myPos.x_start; i < myPos.x_end; i++) {
    for (let j = myPos.y_start; j < myPos.y_end; j++) {
      // if (mouted) {
      //   break;
      // }
      console.log("build");
      ArrWall.push(Item(i, j, -1));
    }
  }
  return (
    <>
      <div className='container'>
        {/* <DatGui data={"myPos"} onChange={setMyPos}>
          <DatNumber
            path='x_start'
            label='x_start1'
            min={-30}
            max={30}
            step={1}
          />
          <DatNumber path='x_end' label='x_end' min={-30} max={30} step={1} />
        </DatGui> */}
        <Canvas camera={{ fov: 75, position: [0, 40, 40] }}>
          {/*@ controls @*/}
          <OrbitControls />
          <color attach='background' args={["lightblue"]} />
          {/* <Stars /> */}

          {/*@ ground @*/}
          <Ground />
          {/*@ climbing wall @*/}
          {/* <Wall /> */}

          {ArrWall}
          {Hold}
          {/* Lights */}
          <ambientLight intensity={0.9} />
          <spotLight
            position={[10, 10, 10]}
            angle={2}
            penumbra={0.5}
            color={"blue"}
          />
          {/* <pointLight position={[0, 10, -10]} /> */}
          {/* <pointLight position={[0, 10, 10]} /> */}
        </Canvas>
      </div>
    </>
  );
}
export default App;
