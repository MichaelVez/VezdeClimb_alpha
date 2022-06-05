import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as dat from "dat.gui";
import "./Wall.css";
import ActiveHoldView from "./ActiveHoldView";
let ArrWall = [];
// let gui = new dat.GUI();
const options = {
  param1: 1,
  param2: 1,
  param3: 1,
  rotate: 0,
};
let ActiveHold = "boxBufferGeometry";

let CreateHold = (x, y, z) => {
  let holdSizeHeight = options.param1;
  let holdSizeWidth = options.param2;
  let holdSizeZ = options.param3;
  // let rot = options.rotate;
  return (
    <mesh key={Math.random()} position={[x, y, z]}>
      <ActiveHold args={[holdSizeWidth, holdSizeHeight, holdSizeZ]} />
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
    //build wall
    for (let i = wallLocation.x_start; i < wallLocation.x_end; i++) {
      for (let j = wallLocation.y_start; j < wallLocation.y_end; j++) {
        ArrWall.push(Item(i, j, -1));
        console.log("build");
      }
    }
    //dat gui
    // gui.add(options, "param1", 1, 15, 1);
    // gui.add(options, "param2", 1, 15, 1);
    // gui.add(options, "param3", 1, 15, 1);
    // gui.add(options, "rotate", 0, 15, 1);
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
    setIsHoldMenu(true);
  };
  // let ref = useRef();
  const onChangeValue = (e) => {
    console.log(e.target.value);
    ActiveHold = e.target.value.toString();
  };
  const HoldMenu = () => {
    return (
      <div className='holdMenu'>
        <div className='holdMenuCont'>
          <div className='list'>
            <div>Simple Box</div>
            <div>item2</div>
            <div>item3</div>
            <div>item4</div>
          </div>
          <div className='holdPreview'>
            <ActiveHoldView hold={ActiveHold} />
          </div>
        </div>
        <button
          onClick={() => {
            setIsHoldMenu(false);
          }}
        >
          Close
        </button>
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
