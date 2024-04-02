'use client'
import {Suspense, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {PerspectiveCamera, useGLTF} from "@react-three/drei";
import * as THREE from "three";

export default function Modell() {
const {scene, nodes, materials} = useGLTF("VisionPro.glb", true)
const [coordinates, setCoordinates] = useState({x:"",y:""})

function captureCoordinates(e){
    setCoordinates({x:`${e.clientX}`, y:`${e.xlientY}`})
    
    document.onpointermove = captureMovement();
    function captureMovement(){
    try{
    setCoordinates({x:`${e.clientX}`, y:`${e.xlientY}`})
} catch(e){console.log(e)};

}}

  return (
    <main className="min-h-screen flex-col items-center justify-center" onMouseOver={(e) => captureCoordinates()}>
      <div className="xl:w-[50%] w-full items-center font-mono flex flex-col ">
        <Canvas shaodows resize={{scroll: false, offsetSize: true}}>
            <directionalLight position={[0, 6, 6]} angle={1} penumbra={1} castShadow intensity={1.5} shadow-bias={-0.0001} />
            <directionalLight position={[0, 1, 5]} angle={1} penumbra={1} castShadow intensity={1.2} shadow-bias={-0.0001} />
            <PerspectiveCamera fov={75} near={0.1} far={1000} position={[0,4,5]} makeDefault manual />
            <Suspense fallback={<p>"Loading ... "</p>}>
            <primitive object={scene} position={[0,3,0]} scale={[20,30,20]}/>
            </Suspense>
        </Canvas>
      </div>
    </main>
  )
}
