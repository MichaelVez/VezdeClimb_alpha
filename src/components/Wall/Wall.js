import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  Cone,
  Dodecahedron,
  Octahedron,
  OrbitControls,
  Stars,
} from "@react-three/drei";
import "./Wall.css";
let ArrWall = [];
let CreateHold = (x, y, z) => {
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

function App() {
  let place = true;
  let [Hold, setHold] = useState([]);
  let [isHoldMenu, setIsHoldMenu] = useState(false);
  let [wallLocation, setWallLocation] = useState({
    x_start: -15,
    x_end: 15,
    y_start: 0,
    y_end: 40,
  });

  useEffect(() => {
    console.log("mout");
    for (let i = wallLocation.x_start; i < wallLocation.x_end; i++) {
      for (let j = wallLocation.y_start; j < wallLocation.y_end; j++) {
        console.log("build");
        ArrWall.push(Item(i, j, -1));
      }
    }
    return () => {
      console.log("cleanup");
      ArrWall = [];
    };
  }, [wallLocation]);
  const btn_clear = () => {
    setHold([]);
  };
  const Item = (x, y, z = 0) => {
    return (
      <mesh
        key={Math.random()}
        position={[x, y, z]}
        onClick={(e) => {
          //receiving couple of events because of bubbling
          //if statement and time out prevents multiple holds begin placed
          // console.log(e);
          if (place) {
            place = false;
            // console.log("recived---");
            // console.log(e);
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
        <boxGeometry args={[1, 1, 3]} />
        <meshStandardMaterial color={"#e0e0e0"} />
      </mesh>
    );
  };

  const hold_menu = () => {
    console.log("here");
    setIsHoldMenu(true);
  };
  // let ref = useRef();
  const HoldMenu = () => {
    return (
      <div className='holdMenu'>
        <>
          <div>Hold type</div>
          <div className='holdMenuHoldInput'>
            <div>
              <Canvas>
                <Box />
                <color attach='background' args={["White"]} />
                <directionalLight color='red' position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <OrbitControls />
              </Canvas>
              <img src='' alt='' />
              <input type='radio' name='holdType' />
            </div>
            <div>
              <Canvas>
                <Octahedron /> <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <img src='' alt='' />
              <input type='radio' name='holdType' />
            </div>
            <div>
              <Canvas>
                <Dodecahedron /> <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>

              <img src='' alt='' />
              <input type='radio' name='holdType' />
            </div>
            <div>
              <Canvas>
                <Cone /> <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <img src='' alt='' />
              <input type='radio' name='holdType' />
            </div>
          </div>
        </>
        <div>
          Hold Settings
          <div>
            <label htmlFor='hold'>Width </label>
            <input type={"range"} id='size' min='1' max='100' value='50' />
          </div>
          <div>
            <label htmlFor='hold'>Height </label>
            <input type={"range"} id='size' min='1' max='100' value='50' />
          </div>
          <div>
            <label htmlFor='hold'>Angle </label>
            <input type={"range"} id='size' min='1' max='100' value='50' />
          </div>
        </div>
        <div>
          <button>Save</button>
          <button
            onClick={() => {
              setIsHoldMenu(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  return (
    <>
      <div className='container'>
        <div className='buttonContLeft'>
          <button>Save</button>
          <button onClick={btn_clear}>Clear</button>
        </div>
        <div className='buttonContRight'>
          <button onClick={hold_menu}>Choose Hold</button>
        </div>
        {isHoldMenu && HoldMenu()}
        <Canvas camera={{ fov: 75, position: [0, 40, 40] }}>
          {/*@ controls @*/}
          <OrbitControls />
          <color attach='background' args={["lightblue"]} />
          <Stars />
          {/*@ ground @*/}
          <Ground />
          {/*@ climbing wall array @*/}
          {ArrWall}
          {/* Holds Array */}
          {Hold}
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
