import { Canvas, useFrame } from "@react-three/fiber";
import "./index.css";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useKeyboardControls } from "./hooks/useKeyboardControls";
import { useRef } from "react";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas shadows>
        <Scene />
      </Canvas>
    </div>
  );
}

const Scene = () => {
  const {
    moveBackward,
    moveForward,
    moveLeft,
    moveRight
  } = useKeyboardControls();

  const targetRef = useRef(null);

  useFrame((state, delta) => {
    targetRef.current.position.x += moveRight ? 0.2 : moveLeft ? -0.2 : 0;
    targetRef.current.position.z += moveForward
      ? -0.2
      : moveBackward
      ? +0.2
      : 0;
    state.camera.lookAt(targetRef.current.position);
    state.camera.updateProjectionMatrix();
  });
  return (
    <>
      <OrbitControls />
      <group ref={targetRef}>
        <PerspectiveCamera
          makeDefault
          position={[25, 22, 25]}
          args={[45, 1.2, 1, 1000]}
        />
        <mesh castShadow receiveShadow position={[0, 2, 0]}>
          <boxBufferGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color={"#ff0000"} />
        </mesh>
      </group>
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} castShadow receiveShadow>
        <planeBufferGeometry args={[50, 50]} />
        <meshStandardMaterial color={"green"} />
      </mesh>

      <spotLight position={[10, 10, 10]} />
      <ambientLight intensity={1} />
    </>
  );
};
