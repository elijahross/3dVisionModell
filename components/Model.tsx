"use client"
import React, {useLayoutEffect, useRef} from 'react'
import useGLTTF from "@react-three/drei";


const Model = ({crd}) => {
    const modelRef = useRef;

    useLayoutEffect((crd) => {
        const {current: obj}  = modelRef;
        obj.position.x= `${crd.x}`;
        obj.position.y= `${crd.y}`;

        
    }, [crd])

    const {scene, nodes, materials} = useGLTF("VisionPro.glb", true)
  return (
    <div>
        <primitive ref={modelRef} object={scene} position={[0,3,0]} scale={[20,30,20]}/>
    </div>
  )
}

export default Model