<div>Hold type</div>
          <div className='holdMenuHoldInput' onChange={onChangeValue}>
            <div>
              <Canvas>
                <Box />
                <color attach='background' args={["White"]} />
                {/* <directionalLight color='red' position={[0, 0, 5]} /> */}
                {/* <ambientLight intensity={0.5} /> */}
                <OrbitControls />
              </Canvas>
              <input type='radio' name='holdType' value='boxBufferGeometry' />
            </div>
            <div>
              <Canvas>
                <Sphere />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input
                type='radio'
                name='holdType'
                value='sphereBufferGeometry'
              />
            </div>
            <div>
              <Canvas>
                <Circle />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input type='radio' name='holdType' value='ringBufferGeometry' />
            </div>
            <div>
              <Canvas>
                <Cone />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input type='radio' name='holdType' value='tubeBufferGeometry' />
            </div>
            <div>
              <Canvas>
                <Cylinder />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input type='radio' name='holdType' value='torusBufferGeometry' />
            </div>
            <div>
              <Canvas>
                <Torus />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input
                type='radio'
                name='holdType'
                value='sphereBufferGeometry'
              />
            </div>
            <div>
              <Canvas>
                <TorusKnot />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input
                type='radio'
                name='holdType'
                value='icosahedronBufferGeometry'
              />
            </div>
            <div>
              <Canvas>
                <Ring />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input
                type='radio'
                name='holdType'
                value='icosahedronBufferGeometry'
              />
            </div>
            <div>
              <Canvas>
                <Tetrahedron />
                <color attach='background' args={["White"]} />
                <OrbitControls />
              </Canvas>
              <input
                type='radio'
                name='holdType'
                value='icosahedronBufferGeometry'
              />
            </div>
          </div>