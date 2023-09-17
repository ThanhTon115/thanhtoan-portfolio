import * as THREE from "three";
import { Canvas, PrimitiveProps, Props, useLoader } from "@react-three/fiber";
import React, {
  FC,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";
import { DDSLoader, MTLLoader, OBJLoader } from "three-stdlib";
import { CameraValueDefault } from "../../assets/shared/types";
import { Camera } from "@react-three/fiber/dist/declarations/src/core/events";
THREE.DefaultLoadingManager.addHandler(/\.dds$/i, new DDSLoader());

type CanvasObjectType = {
  materialUrl: string;
  objUrl: string;
};

export type PolarAngleType = {
  min?: number;
  max?: number;
};
export type ScaleType = {
  mobileScale?: number;
  value?: number;
};
export type RotationSpeedType = {
  x?: number;
  y?: number;
  z?: number;
};
export type ObjModelType = Omit<PrimitiveProps, "object"> & {
  obj?: CanvasObjectType | string;
  rotation?: [number, number, number];
  position?: [number, number, number];
  scale?: ScaleType;
};
///React.Component<Props> &
export type XCanvasType = {
  preload?: boolean;
  usePotLight?: boolean;
  usePointLight?: boolean;
  useHemispheretLight?: boolean;
  obj?: CanvasObjectType | string;
  zoom?: boolean;
  polarAngle?: PolarAngleType;
  distance?: PolarAngleType;
  camera?: Camera;
  autoRotation?: boolean;
} & ObjModelType;

export type DisplayedModelType = ObjModelType & {
  isMobile?: boolean;
  onRender: Function;
};
const DisplayedModel = (props: DisplayedModelType) => {
  const GLFTObj = useMemo(() => {
    if (typeof props.obj === "string") {
      return useGLTF(props.obj as string);
    }
    return null;
  }, [props.obj]);

  const materials = useMemo(() => {
    if (typeof props.obj === "string") {
      return null;
    }
    return useLoader(MTLLoader, props.obj?.materialUrl || "");
  }, []);
  const obj = useMemo(() => {
    if (typeof props.obj === "string" || !materials) {
      return null;
    }
    return useLoader(OBJLoader, props.obj?.objUrl || "", (loader) => {
      materials.preload();
      loader.setMaterials(materials);
    });
  }, []);
  const scene = useMemo(() => GLFTObj?.scene || obj, [GLFTObj?.scene, obj]);
  useEffect(() => {
    props.onRender(true);
    return () => props.onRender(false);
  }, []);
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[0, 0, 0]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      {scene && (
        <primitive
          object={scene}
          scale={
            props.isMobile
              ? props.scale?.mobileScale || 0.05
              : props.scale?.value || 0.05
          }
          position={props.position || [0, 0, 0]}
          rotation={props.rotation}
        />
      )}
    </mesh>
  );
};
export const XCanvas = (props: XCanvasType) => {
  const [isMobile, setIsMobile] = useState(false);
  const showModel = useRef(false);

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
  return props.obj ? (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 2]}
      camera={props.camera || CameraValueDefault}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={showModel.current ? <CanvasLoader /> : null}>
        <OrbitControls
          autoRotate={props.autoRotation}
          rotation={props.rotation}
          enableZoom={props.zoom || false}
          maxPolarAngle={props.polarAngle?.max}
          minPolarAngle={props.polarAngle?.min}
          maxDistance={props.distance?.max}
          minDistance={props.distance?.min || CameraValueDefault.position[2]}
        />
        <DisplayedModel
          rotation={props.rotation}
          isMobile={isMobile}
          obj={props.obj}
          onRender={(val) => (showModel.current = val)}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  ) : (
    <></>
  );
};
