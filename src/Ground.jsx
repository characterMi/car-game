import { useLoader } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { BufferAttribute, TextureLoader } from "three";
import { MeshReflectorMaterial } from "@react-three/drei";
import { usePlane } from "@react-three/cannon";

const Ground = () => {
  const meshRef = useRef(null);
  const meshRef2 = useRef(null);

  const [ref] = usePlane(
    () => ({
      type: "Static",
      rotation: [-Math.PI / 2, 0, 0],
    }),
    useRef(null)
  );

  const gridMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/car-game/textures/grid.png"
  );

  const aoMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/car-game/textures/ground-ao.png"
  );

  const alphaMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/car-game/textures/alpha-map.png"
  );

  useEffect(() => {
    gridMap.anisotropy = 16;
  }, [gridMap]);

  useEffect(() => {
    var uvs = meshRef.current.geometry.attributes.uv.array;
    meshRef.current.geometry.setAttribute("uv2", new BufferAttribute(uvs, 2));

    var uvs2 = meshRef2.current.geometry.attributes.uv.array;
    meshRef2.current.geometry.setAttribute("uv2", new BufferAttribute(uvs2, 2));
  }, [meshRef.current]);

  return (
    <>
      <mesh
        ref={meshRef2}
        position={[-2.285, -0.01, -1.325]}
        rotation-x={-Math.PI * 0.5}
      >
        <planeGeometry args={[12, 12]} />
        <meshBasicMaterial
          opacity={0.325}
          alphaMap={gridMap}
          transparent={true}
          color={"white"}
        />
      </mesh>

      <mesh
        ref={meshRef}
        position={[-2.285, -0.015, -1.325]}
        rotation-x={-Math.PI * 0.5}
        rotation-z={-0.079}
      >
        <circleGeometry args={[6.12, 50]} />
        <MeshReflectorMaterial
          aoMap={aoMap}
          alphaMap={alphaMap}
          transparent={true}
          color={[0.5, 0.5, 0.5]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.4}
          dithering={true}
          blur={[1024, 512]}
          mixBlur={3}
          mixStrength={30}
          mixContrast={1}
          resolution={1024}
          mirror={0}
          depthScale={0}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          debug={0}
          reflectorOffset={0.2}
        />
      </mesh>
    </>
  );
};

export default Ground;
