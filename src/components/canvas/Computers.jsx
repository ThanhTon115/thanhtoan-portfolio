import * as THREE from 'three'
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { MTLLoader, OBJLoader, DDSLoader } from 'three-stdlib'

THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader())


import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  // const computer = useGLTF("./desktop_pc/scene.gltf");
  // const { materials, scene } = useLoader(
  //   GLTFLoader,
  //   "https://gabriellazcano.com/models/capybara.glb"
  // );

  const materials = useLoader(MTLLoader, '/not_found.mtl')
  const obj = useLoader(OBJLoader, '/not_found.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={obj}
        scale={isMobile ? 0.7 : 0.05}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.5, -0.2, -0.05]}
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={{ position: [20, 3, 50], fov: 10 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          // enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
