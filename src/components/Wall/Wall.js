import React, { useEffect, useRef, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  OrbitControls,
  // Stars
} from "@react-three/drei";
import * as dat from "dat.gui";
import "./Wall.css";
import { CubeTextureLoader } from "three";
import { useMyState } from "../Context";
import axios from "axios";
let ArrWall = [];
let renderSkyBox = true;
let saveData = [];
let oneTimer = true;
function Ground() {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeBufferGeometry attach='geometry' args={[100, 100]} />
      <meshPhongMaterial color={"#00DCFF"} />
    </mesh>
  );
}
let gui = new dat.GUI();
let rotaion = gui.addFolder("Rotate Hold");
rotaion.open();
let scale = gui.addFolder("Scale");
scale.open();
gui.domElement.id = "gui";
gui.domElement.style.zIndex = 10;
function App() {
  let [rotateObj, setRotateObj] = useState({ x: 0, y: 0, z: 0 });
  let [scaleObj, setScaleObj] = useState({ scale: (1, 1, 1) });

  let { myState, setMyState } = useMyState();
  const ref = useRef();
  let [ringOptions, setRingOptions] = useState({
    innerRadius: 0.5,
    outerRadius: 10,
    thetaSegments: 8,
    phiSegments: 8,
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
  let [wireFrameState, setWireFrameState] = useState({ wireFrame: false });
  let [colorState, setColorState] = useState({ color: "rgb(0, 255, 0)" });
  let [ActiveHold, setActiveHold] = useState("boxBufferGeometry");
  let [argArray, setArgArray] = useState([]);
  let place = true;
  let [Hold, setHold] = useState([]);
  let [isHoldMenu, setIsHoldMenu] = useState(false);

  let x_start = -15;
  let x_end = 15;
  let y_start = 0;
  let y_end = 40;

  useEffect(() => {
    scale.add(scaleObj, "scale", -2, 10, 0.05).onChange((val) => {
      setScaleObj({ scale: (val, val, val) });
      //eslint-disable-next-line
      CreateHold = (
        x,
        y,
        z,
        ThisHold = ActiveHold,
        DYN_argArray = argArray,
        color = colorState.color
      ) => {
        saveData.push({
          ActiveHold,
          argArray,
          color: colorState.color,
          x,
          y,
          z,
        });
        return (
          <mesh
            key={Math.random()}
            rotation={[rotateObj.x, rotateObj.y, rotateObj.z]}
            position={[x, y, z]}
            scale={scaleObj.scale}
          >
            <ThisHold args={DYN_argArray} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      };
    });
    rotaion.add(rotateObj, "x", 0, Math.PI * 2, 0.05).onChange((val) => {
      setRotateObj({ ...rotateObj, x: val });
      CreateHold = (
        x,
        y,
        z,
        ThisHold = ActiveHold,
        DYN_argArray = argArray,
        color = colorState.color
      ) => {
        saveData.push({
          ActiveHold,
          argArray,
          color: colorState.color,
          x,
          y,
          z,
        });
        return (
          <mesh
            key={Math.random()}
            rotation={[rotateObj.x, rotateObj.y, rotateObj.z]}
            position={[x, y, z]}
            scale={scaleObj.scale}
          >
            <ThisHold args={DYN_argArray} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      };
    });

    rotaion.add(rotateObj, "y", 0, Math.PI * 2, 0.05).onChange((val) => {
      setRotateObj({ ...rotateObj, y: val });
      CreateHold = (
        x,
        y,
        z,
        ThisHold = ActiveHold,
        DYN_argArray = argArray,
        color = colorState.color
      ) => {
        saveData.push({
          ActiveHold,
          argArray,
          color: colorState.color,
          x,
          y,
          z,
        });
        return (
          <mesh
            key={Math.random()}
            rotation={[rotateObj.x, rotateObj.y, rotateObj.z]}
            position={[x, y, z]}
            scale={scaleObj.scale}
          >
            <ThisHold args={DYN_argArray} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      };
    });
    rotaion.add(rotateObj, "z", 0, Math.PI * 2, 0.05).onChange((val) => {
      setRotateObj({ ...rotateObj, z: val });
      CreateHold = (
        x,
        y,
        z,
        ThisHold = ActiveHold,
        DYN_argArray = argArray,
        color = colorState.color
      ) => {
        saveData.push({
          ActiveHold,
          argArray,
          color: colorState.color,
          x,
          y,
          z,
        });
        return (
          <mesh
            key={Math.random()}
            rotation={[rotateObj.x, rotateObj.y, rotateObj.z]}
            position={[x, y, z]}
            scale={scaleObj.scale}
          >
            <ThisHold args={DYN_argArray} />
            <meshLambertMaterial color={color} />
          </mesh>
        );
      };
    });
    //build wall
    // let counter = 0;
    for (let i = x_start; i < x_end; i++) {
      for (let j = y_start; j < y_end; j++) {
        ArrWall.push(Item(i, j, -1));
      }
      // counter += 0.1;
    }
    console.log(ref);
    return () => {
      ArrWall = [];
      renderSkyBox = true;
      oneTimer = true;
      setMyState({});
    };
    //eslint-disable-next-line
  }, []);

  const btn_clear = () => {
    setHold([]);
  };
  const btn_undo = () => {
    let newArr = [...Hold];
    if (newArr.length >= 1) newArr.pop();
    setHold(newArr);
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
        rotation={[0, 0, 0]}
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
        <meshLambertMaterial color={"white"} />
      </mesh>
    );
  };

  const hold_menu = () => {
    setIsHoldMenu(true);
  };

  const HoldMenu = () => {
    const handleListClick = (e) => {
      setActiveHold(e.target.id);
      setArgArray([]);
      if (e.target.id === "boxBufferGeometry") {
        if (Object.keys(gui.__folders).length > 2) {
          console.log("here");
          gui.removeFolder(gui.__folders["texture-settings"]);
        }
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
        folder.add(wireFrameState, "wireFrame").onChange((val) => {
          setWireFrameState({ wireFrame: val });
        });
        folder.addColor(colorState, "color").onChange((val) => {
          setColorState({ color: val });
        });
      }
      if (e.target.id === "coneBufferGeometry") {
        if (Object.keys(gui.__folders).length > 0) {
          gui.removeFolder(gui.__folders["texture-settings"]);
        }
        let folder = gui.addFolder("texture-settings");
        folder.open();
        folder.add(coneOptions, "radius", 1, 15, 1).onChange((val) => {
          let newOpt = { ...coneOptions, radius: val };
          setConeOptions(newOpt);
          let newArr = [val, coneOptions.height, coneOptions.radialSegments];
          setArgArray(newArr);
        });
        folder.add(coneOptions, "height", 1, 15, 1).onChange((val) => {
          let newOpt = { ...coneOptions, height: val };
          setConeOptions(newOpt);
          let newArr = [coneOptions.radius, val, coneOptions.radialSegments];
          setArgArray(newArr);
        });
        folder.add(coneOptions, "radialSegments", 3, 15, 1).onChange((val) => {
          let newOpt = { ...coneOptions, radialSegments: val };
          let newArr = [coneOptions.radius, coneOptions.height, val];
          setArgArray(newArr);
          setConeOptions(newOpt);
        });
        folder.add(wireFrameState, "wireFrame").onChange((val) => {
          setWireFrameState({ wireFrame: val });
        });
        folder.addColor(colorState, "color").onChange((val) => {
          setColorState({ color: val });
        });
      }
      if (e.target.id === "torusBufferGeometry") {
        if (Object.keys(gui.__folders).length > 0) {
          gui.removeFolder(gui.__folders["texture-settings"]);
        }
        let folder = gui.addFolder("texture-settings");
        folder.open();
        folder.add(torusOptions, "radius", 1, 15).onChange((val) => {
          let newOpt = { ...torusOptions, radius: val };
          setTorusOptions(newOpt);
          let newArr = [
            val,
            torusOptions.tube,
            torusOptions.radialSegments,
            torusOptions.tubularSegments,
            torusOptions.arc,
          ];
          setArgArray(newArr);
        });
        folder.add(torusOptions, "tube", 0.1, 10).onChange((val) => {
          let newOpt = { ...torusOptions, tube: val };
          setTorusOptions(newOpt);
          let newArr = [
            torusOptions.radius,
            val,
            torusOptions.radialSegments,
            torusOptions.tubularSegments,
            torusOptions.arc,
          ];
          setArgArray(newArr);
        });
        folder.add(torusOptions, "radialSegments", 2, 30).onChange((val) => {
          let newOpt = { ...torusOptions, radialSegments: val };
          setTorusOptions(newOpt);
          let newArr = [
            torusOptions.radius,
            torusOptions.tube,
            val,
            torusOptions.tubularSegments,
            torusOptions.arc,
          ];
          setArgArray(newArr);
        });
        folder
          .add(torusOptions, "tubularSegments", 3, 100, 1)
          .onChange((val) => {
            let newOpt = { ...torusOptions, tubularSegments: val };
            setTorusOptions(newOpt);
            let newArr = [
              torusOptions.radius,
              torusOptions.tube,
              torusOptions.radialSegments,
              val,
              torusOptions.arc,
            ];
            setArgArray(newArr);
          });
        folder
          .add(torusOptions, "arc", 0.1, Math.PI * 2, 0.001)
          .onChange((val) => {
            let newOpt = { ...torusOptions, arc: val };
            setTorusOptions(newOpt);
            let newArr = [
              torusOptions.radius,
              torusOptions.tube,
              torusOptions.radialSegments,
              torusOptions.tubularSegments,
              val,
            ];
            setArgArray(newArr);
          });
        folder.add(wireFrameState, "wireFrame").onChange((val) => {
          setWireFrameState({ wireFrame: val });
        });
        folder.addColor(colorState, "color").onChange((val) => {
          setColorState({ color: val });
        });
      }
      if (e.target.id === "ringBufferGeometry") {
        if (Object.keys(gui.__folders).length > 0) {
          gui.removeFolder(gui.__folders["texture-settings"]);
        }
        let folder = gui.addFolder("texture-settings");
        folder.open();
        folder.add(ringOptions, "innerRadius", 1, 30).onChange((val) => {
          let newOpt = { ...ringOptions, innerRadius: val };
          setRingOptions(newOpt);
          let newArr = [
            val,
            ringOptions.outerRadius,
            ringOptions.thetaSegments,
            ringOptions.phiSegments,
            ringOptions.thetaStart,
            ringOptions.thetaLength,
          ];
          setArgArray(newArr);
        });
        folder.add(ringOptions, "outerRadius", 1, 30).onChange((val) => {
          let newOpt = { ...ringOptions, outerRadius: val };
          setRingOptions(newOpt);
          let newArr = [
            ringOptions.innerRadius,
            val,
            ringOptions.thetaSegments,
            ringOptions.phiSegments,
            ringOptions.thetaStart,
            ringOptions.thetaLength,
          ];
          setArgArray(newArr);
        });
        folder.add(ringOptions, "thetaSegments", 1, 30).onChange((val) => {
          let newOpt = { ...ringOptions, thetaSegments: val };
          setRingOptions(newOpt);
          let newArr = [
            ringOptions.innerRadius,
            ringOptions.outerRadius,
            val,
            ringOptions.phiSegments,
            ringOptions.thetaStart,
            ringOptions.thetaLength,
          ];
          setArgArray(newArr);
        });
        folder.add(ringOptions, "phiSegments", 1, 30).onChange((val) => {
          let newOpt = { ...ringOptions, phiSegments: val };
          setRingOptions(newOpt);
          let newArr = [
            ringOptions.innerRadius,
            ringOptions.outerRadius,
            ringOptions.thetaSegments,
            val,
            ringOptions.thetaStart,
            ringOptions.thetaLength,
          ];
          setArgArray(newArr);
        });
        folder
          .add(ringOptions, "thetaStart", 0, Math.PI * 2)
          .onChange((val) => {
            let newOpt = { ...ringOptions, thetaStart: val };
            setRingOptions(newOpt);
            let newArr = [
              ringOptions.innerRadius,
              ringOptions.outerRadius,
              ringOptions.thetaSegments,
              ringOptions.phiSegments,
              val,
              ringOptions.thetaLength,
            ];
            setArgArray(newArr);
          });
        folder
          .add(ringOptions, "thetaLength", 0, Math.PI * 2)
          .onChange((val) => {
            let newOpt = { ...ringOptions, thetaLength: val };
            setRingOptions(newOpt);
            let newArr = [
              ringOptions.innerRadius,
              ringOptions.outerRadius,
              ringOptions.thetaSegments,
              ringOptions.phiSegments,
              ringOptions.thetaStart,
              val,
            ];
            setArgArray(newArr);
          });
        folder.add(wireFrameState, "wireFrame").onChange((val) => {
          setWireFrameState({ wireFrame: val });
        });
        folder.addColor(colorState, "color").onChange((val) => {
          setColorState({ color: val });
        });
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
                <light color={"white"} intensity={0.7} />
                <OrbitControls />
                {/* <Stars /> */}
                <color attach={"background"} args={["#e8faff"]} />
                <ambientLight intensity={0.7} color={"white"} />
                <directionalLight intensity={0.7} color={"white"} />
                {/* <pointLight intensity={0.7} color={"white"} /> */}
                <mesh key={Math.random()}>
                  <ActiveHold args={argArray} attach='geometry' />
                  <meshLambertMaterial
                    wireframe={wireFrameState.wireFrame}
                    color={colorState.color}
                  />
                </mesh>
              </Canvas>
            </>
          </div>
        </div>
        <button
          onClick={() => {
            if (Object.keys(gui.__folders).length !== 2) {
              gui.removeFolder(gui.__folders["texture-settings"]);
              for (let i = 0; i < group.current.children.length; i++) {
                //update on click because it does not update with state
                //eslint-disable-next-line
                group.current.children[i].__r3f.handlers.onClick = (e) => {
                  if (place) {
                    place = false;
                    let pos = e.object.position;
                    setTimeout(() => {
                      place = true;
                    }, 1);
                    setHold((prev) => {
                      let newHold = [...prev];
                      let newCreateHold = (
                        x,
                        y,
                        z,
                        ThisHold = ActiveHold,
                        DYN_argArray = argArray,
                        color = colorState.color
                      ) => {
                        saveData.push({
                          ActiveHold,
                          argArray,
                          color: colorState.color,
                          x,
                          y,
                          z,
                        });
                        return (
                          <mesh
                            key={Math.random()}
                            rotation={[rotateObj.x, rotateObj.y, rotateObj.z]}
                            position={[x, y, z]}
                            scale={scaleObj.scale}
                          >
                            <ThisHold args={DYN_argArray} />
                            <meshLambertMaterial color={color} />
                          </mesh>
                        );
                      };
                      newHold.push(newCreateHold(pos.x, pos.y, 1));
                      return newHold;
                    });
                  }
                };
              }
            }
            setIsHoldMenu(false);
          }}
        >
          Close
        </button>
      </div>
    );
  };
  let CreateHold = (
    x,
    y,
    z,
    ThisHold = ActiveHold,
    DYN_argArray = argArray,
    color = colorState.color
  ) => {
    saveData.push({
      ActiveHold,
      argArray,
      color: colorState.color,
      x,
      y,
      z,
    });
    return (
      <mesh key={Math.random()} position={[x, y, z]}>
        <ThisHold args={DYN_argArray} />
        <meshLambertMaterial color={color} />
      </mesh>
    );
  };
  let group = useRef();
  let light = useRef();
  // let light2 = useRef();
  // let light3 = useRef();
  const SkyBox = () => {
    const { scene } = useThree();
    const loader = new CubeTextureLoader();
    const texture = loader.load([
      "px.jpg",
      "nx.jpg",
      "py.jpg",
      "ny.jpg",
      "pz.jpg",
      "nz.jpg",
    ]);
    scene.background = texture;
    renderSkyBox = false;
    return null;
  };
  const [isSaveMenu, setIsSaveMenu] = useState(false);
  const btn_save = () => {
    setIsSaveMenu(true);
  };
  let [input, setInput] = useState({});
  const handleChange = (e) => {
    setInput({ ...input, [e.target.id]: e.target.value });
  };
  const saveMenu = () => {
    return (
      <div className='saveMenu'>
        <label htmlFor='routeName'>Route Name:</label>
        <input type='routeName' onChange={handleChange} id='routeName' />
        <label htmlFor='creator'>Your name:</label>
        <input type='text' id='creator' onChange={handleChange} />
        <label htmlFor='grade'>Grade difficulty:</label>
        <select id='grade' onChange={handleChange}>
          <option>V0-V1</option>
          <option>V1-V2</option>
          <option>V3-V4</option>
          <option>V4-V5</option>
          <option>V5-V6</option>
          <option>V6-V7</option>
          <option>V8-V9</option>
          <option>V9+</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={() => setIsSaveMenu(false)}>Cancel</button>
      </div>
    );
  };

  const handleSubmit = async () => {
    console.log(Object.keys(input));
    input.date =
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      " " +
      new Date().getDay() +
      "/" +
      new Date().getMonth();
    input.data = saveData;
    if (Object.keys(input).length !== 5) {
      console.log("missing input");
    } else {
      try {
        axios.post(
          "https://628e3595368687f3e71287e0.mockapi.io/Climbing-wall",
          input
        );
      } catch (e) {
        console.log(e);
      }
      setIsSaveMenu(false);
    }
  };
  console.log(myState.data);
  if (oneTimer) {
    if (myState.data !== undefined && myState.data.length > 0) {
      for (let i = 0; i < myState.data.length; i++) {
        console.log(myState.data[i]);
        //eslint-disable-next-line
        setHold((prev) => {
          let newHold = [...prev];
          newHold.push(
            CreateHold(
              myState.data[i].x,
              myState.data[i].y,
              1,
              myState.data[i].ActiveHold,
              myState.data[i].argArray,
              myState.data[i].color
            )
          );
          return newHold;
        });
      }
      oneTimer = false;
    }
  }
  return (
    <>
      <div className='container'>
        <div className='buttonContLeft'>
          <button onClick={btn_save}>
            <span className='material-icons'>save_as</span>
          </button>
          <button onClick={btn_clear}>
            <span className='material-icons'>delete</span>
          </button>
          <button onClick={btn_undo}>
            <span className='material-icons'>undo</span>
          </button>
        </div>
        <div className='buttonContRight'>
          <button id='btn_choosehold' onClick={hold_menu}>
            <span className='material-icons'>egg_alt</span>
          </button>
        </div>
        {isSaveMenu && saveMenu()}
        {isHoldMenu && HoldMenu()}
        <Canvas
          camera={{ fov: 75, position: [0, 60, 60] }}
          onCreated={(state) => {
            // ref.current.rotation.x = 1;
          }}
        >
          {/*@ controls @*/}
          <OrbitControls />
          {/* <color attach='background' args={["black"]} /> */}
          {/* <Stars /> */}
          {renderSkyBox && <SkyBox />}
          {/*@ ground @*/}
          <Ground />
          {/*@ climbing wall array @*/}
          <group ref={group}>{ArrWall}</group>
          {/* Holds Array */}
          {Hold}
          {/* Lights */}
          <ambientLight intensity={0.2} color={"white"} />
          <spotLight
            args={["white", 0.5]}
            ref={light}
            position={[0, 50, 50]}
            castShadow
          />
          <directionalLight intensity={0.7} color={"white"} />
          <pointLight intensity={0.7} color={"white"} />
        </Canvas>
      </div>
    </>
  );
}
export default App;
