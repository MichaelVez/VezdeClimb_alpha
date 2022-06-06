import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as dat from "dat.gui";
import "./Wall.css";

let ArrWall = [];

function Ground() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshLambertMaterial attach='material' color='lightblue' />
    </mesh>
  );
}
let gui = new dat.GUI();
gui.domElement.id = "gui";
gui.domElement.style.zIndex = 3;
function App() {
  const ref = useRef();
  let [ringOptions, setRingOptions] = useState({
    innerRadius: 0.5,
    outerRadius: 1,
    thetaSegments: 8,
    phiSegments: 1,
    thetaStart: 0,
    thetaLength: Math.PI * 2,
  });
  let [torusOptions, setTorusOptions] = useState({
    radius: 1,
    tube: 0.4,
    radialSegments: 8,
    tubularSegments: 6,
    arc: Math.PI * 2,
  });
  let [options, setOptions] = useState({
    holdSizeWidth: 1,
    holdSizeHeight: 1,
    holdSizeZ: 1,
  });
  let [coneOptions, setConeOptions] = useState({
    radius: 1,
    height: 1,
    radialSegments: 8,
  });
  let [ActiveHold, setActiveHold] = useState("boxBufferGeometry");
  let [argArray, setArgArray] = useState([]);
  let place = true;
  let [Hold, setHold] = useState([]);
  let [isHoldMenu, setIsHoldMenu] = useState(false);
  //todo fix wall loc?
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
    return () => {
      console.log("cleanup");
      ArrWall = [];
    };
  }, [wallLocation]);
  const newFunc = () => {
    console.log("newfunc");
  };
  const btn_clear = () => {
    setHold([]);
  };
  //? build wall func
  const Item = (x, y, z = 0) => {
    //todo - done - wall onclick and build
    //todo change name
    return (
      <mesh
        key={Math.random()}
        position={[x, y, z]}
        ref={ref}
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

  const HoldMenu = () => {
    const handleListClick = (e) => {
      setActiveHold(e.target.id);

      console.log(ActiveHold);

      if (e.target.id === "boxBufferGeometry") {
        let folder = gui.addFolder("texture-settings");
        folder.open();
        folder.add(options, "holdSizeWidth", 1, 15, 1).onChange((val) => {
          let newOpt = { ...options, holdSizeWidth: val };
          let newArr = [val, options.holdSizeHeight, options.holdSizeZ];
          setArgArray(newArr);
          setOptions(newOpt);
        });
        folder.add(options, "holdSizeHeight", 1, 15, 1).onChange((val) => {
          let newOpt = { ...options, holdSizeHeight: val };
          let newArr = [options.holdSizeWidth, val, options.holdSizeZ];
          setArgArray(newArr);
          setOptions(newOpt);
        });
        folder.add(options, "holdSizeZ", 1, 15, 1).onChange((val) => {
          let newOpt = { ...options, holdSizeZ: val };
          let newArr = [options.holdSizeWidth, options.holdSizeHeight, val];
          setArgArray(newArr);
          setOptions(newOpt);
        });
      }
      if (e.target.id === "coneBufferGeometry") {
        let folder = gui.addFolder("texture-settings");
        folder.open();
        folder.add(coneOptions, "radius", 1, 15, 1).onChange((val) => {
          console.log(val);
          console.log(coneOptions);
          let newOpt = { ...coneOptions, radius: val };
          setConeOptions(newOpt);
          let newArr = [val, coneOptions.height, coneOptions.radialSegments];
          setArgArray(newArr);
          console.log(newArr);
        });
        folder.add(coneOptions, "height", 1, 15, 1).onChange((val) => {
          let newOpt = { ...coneOptions, height: val };
          console.log(coneOptions);
          console.log(newOpt);
          setConeOptions(newOpt);
          let newArr = [coneOptions.radius, val, coneOptions.radialSegments];
          setArgArray(newArr);
        });
        console.log(coneOptions);
        folder.add(coneOptions, "radialSegments", 3, 15, 1).onChange((val) => {
          console.log("here");
          let newOpt = { ...coneOptions, radialSegments: val };
          let newArr = [coneOptions.radius, coneOptions.height, val];
          setArgArray(newArr);
          setConeOptions(newOpt);
        });
      }

      if (e.target.id === "torusBufferGeometry") {
        //todo
        // radius - Radius of the torus, from the center of the torus to the center of the tube. Default is 1.
        // tube — Radius of the tube. Default is 0.4.
        // radialSegments — Default is 8
        // tubularSegments — Default is 6.
        // arc — Central angle. Default is Math.PI * 2.
      }

      if (e.target.id === "ringBufferGeometry") {
        //todo a
        //innerRadius — Default is 0.5.
        // outerRadius — Default is 1.
        // thetaSegments — Number of segments. A higher number means the ring will be more round. Minimum is 3. Default is 8.
        // phiSegments — Minimum is 1. Default is 1.
        // thetaStart — Starting angle. Default is 0.
        // thetaLength — Central angle. Default is Math.PI * 2.
      }
    };
    return (
      <div className='holdMenu'>
        <div className='holdMenuCont'>
          <div onClick={handleListClick} className='list'>
            <div id='boxBufferGeometry'>Simple Box</div>
            <div id='coneBufferGeometry'>Feature - Cone</div>
            <div id='torusBufferGeometry'>TorusGeometry</div>
            <div id='ringBufferGeometry'>RingGeometry</div>
          </div>
          <div className='holdPreview'>
            <>
              <Canvas onCreated={(state) => {}}>
                <OrbitControls />
                <mesh key={Math.random()}>
                  <ActiveHold args={argArray} attach='geometry' />
                  <meshNormalMaterial color={"cornflowerblue"} />
                </mesh>
                <color attach='background' args={["white"]} />
              </Canvas>
            </>
          </div>
        </div>
        <button
          onClick={() => {
            console.log(gui);
            gui.removeFolder(gui.__folders["texture-settings"]);
            console.log("gere");
            console.log(gui);
            setIsHoldMenu(false);
            for (let i = 0; i < group.current.children.length; i++) {
              //update on click because it does not update with state
              group.current.children[i].__r3f.handlers.onClick = (e) => {
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
              };
            }
          }}
        >
          Close
        </button>
      </div>
    );
  };
  let CreateHold = (x, y, z) => {
    return (
      <mesh key={Math.random()} position={[x, y, z]}>
        <ActiveHold args={argArray} />
        <meshNormalMaterial color={"cornflowerblue"} />
      </mesh>
    );
  };
  let group = useRef();
  return (
    <>
      <div className='container'>
        <div className='buttonContLeft'>
          <button>Save</button>
          <button onClick={btn_clear}>Clear</button>
        </div>
        <div className='buttonContRight'>
          <button id='btn_choosehold' onClick={hold_menu}>
            Choose Hold
          </button>
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
          <group ref={group}>{ArrWall}</group>
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
