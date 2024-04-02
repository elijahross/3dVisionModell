"use client";
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export default function Modell() {
  const cameraRef = useRef();
  const modelRef = useRef();
  const { scene, nodes, materials } = useGLTF("VisionPro.glb", true);
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  function captureCoordinates(e) {
    const movementArea = document.getElementById("canvas");
    const boundingBox = movementArea.getBoundingClientRect();

    document.onpointermove = captureMovement;
    function captureMovement(e) {
      const { current: cam } = cameraRef;
      let camx =
        (-(e.clientX - boundingBox.left - boundingBox.width / 2) /
          (boundingBox.width / 2)) *
        2;
      let camy =
        (e.clientY - boundingBox.top - boundingBox.height / 2) /
        boundingBox.height;
      cam.position.x = 2 * camx - 1;
      cam.position.y = camy * 8 + 1;
      cam.lookAt(new THREE.Vector3(0, 0, 0));
      cam.updateProjectionMatrix();
    }
  }

  return (
    <main
      className="min-h-screen flex-col w-full flex items-center m-auto justify-center"
      onMouseOver={(e) => captureCoordinates()}
    >
      <div className="xl:w-[50%] w-[100vw] h-[100vh] items-center font-mono flex flex-col ">
        <Canvas
          id="canvas"
          shaodows
          resize={{ scroll: false, offsetSize: true }}
        >
          <directionalLight
            position={[0, 6, 6]}
            angle={1}
            penumbra={1}
            castShadow
            intensity={1.5}
            shadow-bias={-0.0001}
          />
          <directionalLight
            position={[0, 1, 5]}
            angle={1}
            penumbra={1}
            castShadow
            intensity={1.2}
            shadow-bias={-0.0001}
          />
          <PerspectiveCamera
            ref={cameraRef}
            fov={75}
            near={0.1}
            far={1000}
            position={[0, 4, 5]}
            makeDefault
            manual
          />
          <Suspense fallback={<p className="text-[12px]">"Loading ... "</p>}>
            <primitive
              ref={modelRef}
              object={scene}
              position={[0, -1, 0]}
              rotation={[0, -(Math.PI / 2), 0]}
              scale={[10, 10, 10]}
            />
          </Suspense>
        </Canvas>
      </div>
    </main>
  );
}
