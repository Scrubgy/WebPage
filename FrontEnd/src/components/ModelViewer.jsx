import React, { Suspense, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { Box } from "@chakra-ui/react";
import CircularProgress from "@mui/material/CircularProgress";

function Model({ url, onLoaded }) {
  const gltf = useGLTF(url, undefined, undefined, () => onLoaded());
  const modelRef = useRef(); // Reference to the 3D object

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.006; // Adjust rotation speed here
    }
  });

  return <primitive ref={modelRef} object={gltf.scene} position={[0, -2, 0]} />;
}

export default function ModelViewer({ modelUrl }) {
  const [isModelLoading, setIsModelLoading] = useState(true);

  return (
    <div>
      <Canvas
        className="w-20 h-20 mb-2"
        camera={{ position: [0, 0, 30], fov: 75 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 1, 0]} intensity={6.5} color="white" />
        <directionalLight position={[-2, 1, 0]} intensity={6.5} color="white" />
        <directionalLight position={[0, 0, 8]} intensity={6} color="white" />
        <Suspense
          fallback={
            <Html center style={{ transform: "scale(1)" }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  marginLeft: "-25px", // Adjust this value to shift left
                }}
              >
                <CircularProgress />
                <div style={{ marginTop: "10px" }}>Loading...</div>
              </Box>
            </Html>
          }
        >
          <Model url={modelUrl} onLoaded={() => setIsModelLoading(false)} />
        </Suspense>

        <OrbitControls maxDistance={1} minDistance={3.75} />
      </Canvas>
    </div>
  );
}
