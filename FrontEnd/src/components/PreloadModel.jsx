import React, { useEffect } from 'react';
import { useGLTF } from "@react-three/drei";

export default function PreloadModel() {
  const modelUrl = "/src/assets/ucm.glb";

  useEffect(() => {
    console.log("Starting to preload the model...");

    // Preload the model
    useGLTF.preload(modelUrl);

    console.log("Model preloading initiated");
  }, []);

  return null;
}
