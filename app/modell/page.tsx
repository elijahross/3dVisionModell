"use client";
import { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

export default function Modell() {
  const snippet = {text:`
    class `,
                    text2:` extends Stack {
        constructor(scope, id, props) {
          super(scope, id, props);
      
          const `,
                    text3:` = new Function(this, '`,
                    text4:`', {
            runtime: Runtime.NODEJS_14_X,
            handler: 'index.handler',
            code: `,
                    text5:`.fromAsset('lambda'), 
            timeout: Duration.seconds(30), 
          });
      
          Serverless.addToRolePolicy(new PolicyStatement({
            actions: ['s3:GetObject'], 
            resources: ['arn:`,
                    text6:`:s3:::your-bucket/*'], 
          }));
    
          new CfnOutput(this, 'MLModelLambdaARN', {
            value: mlModel`,
                    text7:`.functionArn,
          });`};
  const cameraRef = useRef();
  const modelRef = useRef();
  const { scene, nodes, materials } = useGLTF("VisionPro.glb", true);
  const [coordinates, setCoordinates] = useState({ x: "", y: "" });

  function captureCoordinates(e) {
    const movementArea = document.getElementById("canvas") || null;
    const boundingBox = movementArea.getBoundingClientRect() || null;

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
      <div className="relative items-center m-auto self-center transition-all duration-700 font-mono flex flex-col hover:scale-110">
      <div className='text-[11px] text-left text-gray w-full pointer-events-none'>
                <pre>
                    {snippet.text}<code id="sMLM" className='texthighlight'>MLModel</code><code id="hMLM" className='textspace'>MLModel</code>{snippet.text2}
                    <code id="sservl" className='texthighlight'>Serverless</code><code id="hservl" className='textspace'>Serverless</code>{snippet.text3}
                    <code id="sdata" className='texthighlight'>Data Analyses</code><code id="hdata" className='textspace'>Data Analyses</code>{snippet.text4}
                    <code id="spipe" className='texthighlight'>Pipeline</code><code id="hpipe" className='textspace'>Pipeline</code>{snippet.text5}
                    <code id="saws" className='texthighlight'>aws</code><code id="haws" className='textspace'>aws</code>{snippet.text6}
                    <code id="slam" className='texthighlight'>Lambda</code><code id="hlam" className='textspace'>Lambda</code>{snippet.text7}
                </pre>
            </div>
        <div className="absolute top-[50%] left-[50%] xl:w-[50%] w-[100vh] h-[100vh]n scale-75 hover:scale-100 opacity-0 hover:opacity-100 transition-all duration-1000 items-center m-auto self-center">
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
      </div>
    </main>
  );
}
