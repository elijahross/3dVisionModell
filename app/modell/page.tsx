"use client";
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export default function Modell() {
  const snippet = {
    text: `
    class `,
    text2: ` extends Stack {
        constructor(scope, id, props) {
          super(scope, id, props);
      
          const `,
    text3: ` = new Function(this, '`,
    text4: `', {
            runtime: Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: `,
    text5: `.fromAsset('lambda'), 
            timeout: Duration.seconds(30), 
          });
      
          Serverless.addToRolePolicy(new PolicyStatement({
            actions: ['s3:GetObject'], 
            resources: ['arn:`,
    text6: `:s3:::your-bucket/*'], 
          }));
    
          new CfnOutput(this, 'MLModelLambdaARN', {
            value: mlModel`,
    text7: `.functionArn,
          });`,
  };
  const cameraRef = useRef();
  const modelRef = useRef();
  const { scene, nodes, materials } = useGLTF("VisionPro.glb", true);
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  function captureCoordinates(e) {
    // Choosing Elements for Words Animation //
    try {
      const objects = document.getElementsByClassName("texthighlight");

      // Getting the proportions on the Canvas to calculate the the camera movement on pointermove //
      const movementArea = document.getElementById("canvas") || null;
      const boundingBox = movementArea.getBoundingClientRect() || null;

      document.onpointermove = captureMovement;
      function captureMovement(e) {
        // Changing the camera position and view angle then updating the matrix //
        const { current: cam } = cameraRef;
        let camx =
          (-(e.clientX - boundingBox.left - boundingBox.width / 2) /
            (boundingBox.width / 2)) *
          2;
        let camy =
          (e.clientY - boundingBox.top - boundingBox.height / 2) /
          boundingBox.height;
        cam.position.x = 2 * camx;
        cam.position.y = camy * 8 - 2;
        cam.lookAt(new THREE.Vector3(0, 0, 0));
        cam.updateProjectionMatrix();

        // Adding some additional Animation to the code snippet fragments //
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col w-full m-auto py-20 mb-20"
      onMouseOver={(e) => captureCoordinates()}
    >
      <div className="relative m-auto w-full h-full transition-all duration-700 flex flex-col hover:scale-110 justify-center items-center">
        <div className="text-[11px] text-left text-gray self-center pointer-events-none m-auto flex">
          <pre>
            {snippet.text}
            <code id="sMLM" className="texthighlight">
              MLModel
            </code>
            <code id="hMLM" className="textspace">
              MLModel
            </code>
            {snippet.text2}
            <code id="sservl" className="texthighlight">
              Serverless
            </code>
            <code id="hservl" className="textspace">
              Serverless
            </code>
            {snippet.text3}
            <code id="sdata" className="texthighlight">
              Data Analyses
            </code>
            <code id="hdata" className="textspace">
              Data Analyses
            </code>
            {snippet.text4}
            <code id="spipe" className="texthighlight">
              Pipeline
            </code>
            <code id="hpipe" className="textspace">
              Pipeline
            </code>
            {snippet.text5}
            <code id="saws" className="texthighlight">
              aws
            </code>
            <code id="haws" className="textspace">
              aws
            </code>
            {snippet.text6}
            <code id="slam" className="texthighlight">
              Lambda
            </code>
            <code id="hlam" className="textspace">
              Lambda
            </code>
            {snippet.text7}
          </pre>
        </div>
        <div
          className={`absolute top-0 bottom-0 left-0 right-0 m-auto ${window.innerWidth > window.innerHeight ? "w-[70vh] h-[70vh]" : "w-[70vw] h-[70vw]"} scale-75 hover:scale-100 opacity-0 hover:opacity-100 transition-all duration-1000`}
        >
          <div className="absolute w-[100px] h-[100px] rounded-full right-0 top-0 lightspot1 z-30" />
          <div className="absolute w-[100px] h-[100px] rounded-full bottom-10 left-12 lightspot2 z-30" />
          <Canvas id="canvas" resize={{ scroll: false, offsetSize: true }}>
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
      </div>
    </main>
  );
}
