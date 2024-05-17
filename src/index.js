import { Physics } from "@react-three/cannon";
import { Canvas } from "@react-three/fiber";
import { createRoot } from "react-dom/client";
import Controls from "./Controls";
import { Scene } from "./Scene";
import Utilities from "./Utilities";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <>
    <Canvas>
      <Physics broadphase="SAP" gravity={[0, -1.6, 0]}>
        <Scene />
      </Physics>
    </Canvas>

    <div
      className="menu menu-btn"
      onClick={() => {
        const utilityContainer = document.querySelector(".utility-container");

        if (!utilityContainer.classList.contains("slide-in")) {
          utilityContainer.classList.add("slide-in");
        } else {
          utilityContainer.classList.remove("slide-in");
        }
      }}
    >
      <img src={process.env.PUBLIC_URL + "/icons/menu.svg"} alt="Menu" />
    </div>

    <div
      className="info menu-btn"
      onClick={() => {
        const about = document.querySelector(".about");

        if (!about.classList.contains("visible")) {
          about.classList.add("visible");
        } else {
          about.classList.remove("visible");
        }
      }}
    >
      ?
    </div>

    <Utilities />

    <Controls />

    <section className="about visible">
      <p>press w a s d to move</p>
      <p>press k to swap camera</p>
      <p>press r to reset</p>
      <p>press p to rotate</p>
    </section>
  </>
);
