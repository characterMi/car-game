import {
  Environment,
  Html,
  OrbitControls,
  PerspectiveCamera,
  useProgress,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import Ground from "./Ground";
import Track from "./Track";

export function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);

  useEffect(() => {
    const swapCamera = document.querySelector(".control-swap");

    function keydownHandler(e) {
      if (e.key === "k") {
        // random is necessary to trigger a state change
        if (thirdPerson)
          setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
        setThirdPerson(!thirdPerson);
      }
    }

    const clickHandler = () => keydownHandler({ key: "k" });

    window.addEventListener("keydown", keydownHandler);
    swapCamera.addEventListener("click", clickHandler);

    return () => {
      window.removeEventListener("keydown", keydownHandler);
      swapCamera.removeEventListener("click", clickHandler);
    }
  }, [thirdPerson]);

  return (
    <Suspense fallback={<Loader />}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={40} />
      {!thirdPerson && <OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <Track />
      <Car thirdPerson={thirdPerson} />
    </Suspense>
  );
}

const Loader = () => {
  const { progress } = useProgress();
  return (
    <Html>
      <section className="loader">
        Loading... <span>{progress.toFixed(2)}%</span>
      </section>
    </Html>
  );
};
