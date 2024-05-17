import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  const [controls, setControls] = useState({});

  useEffect(() => {
    const controlKeys = document.querySelectorAll(".control-btn");
    const utilities = document.querySelectorAll(".utilities");

    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    const handleKeyTouchStart = (e) => {
      const targetClassName = e.target.classList[0];

      switch (targetClassName) {
        case "control-f":
          keyDownPressHandler({ key: "w" })
          break;

        case "control-l":
          keyDownPressHandler({ key: "a" })
          break;

        case "control-b":
          keyDownPressHandler({ key: "s" })
          break;

        case "control-r":
          keyDownPressHandler({ key: "d" })
          break;

        default:
          break;
      }
    }

    const handleKeyTouchEnd = (e) => {
      const targetClassName = e.target.classList[0];

      switch (targetClassName) {
        case "control-f":
          keyUpPressHandler({ key: "w" })
          break;

        case "control-l":
          keyUpPressHandler({ key: "a" })
          break;

        case "control-b":
          keyUpPressHandler({ key: "s" })
          break;

        case "control-r":
          keyUpPressHandler({ key: "d" })
          break;

        default:
          break;
      }
    }

    const handleClickUtility = (e) => {
      let targetClassName;

      if (e.target.nodeName === "DIV") {
        targetClassName = e.target.classList[0]
      } else {
        targetClassName = e.target.parentElement.classList[0]
      }

      switch (targetClassName) {
        case "control-rotate":
          keyDownPressHandler({ key: "p" })
          setTimeout(() => keyUpPressHandler({ key: "p" }), 1000);
          break;

        case "control-reset":
          keyDownPressHandler({ key: "r" })
          setTimeout(() => keyUpPressHandler({ key: "r" }), 1000);
          break;

        default:
          break;
      }
    }

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);

    controlKeys.forEach(element => {
      element.addEventListener("touchstart", handleKeyTouchStart)
      element.addEventListener("touchend", handleKeyTouchEnd)
    });

    utilities.forEach(element => {
      element.addEventListener("click", handleClickUtility)
    });

    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
      controlKeys.forEach(element => {
        element.removeEventListener("touchstart", handleKeyTouchStart)
        element.removeEventListener("touchend", handleKeyTouchEnd)
      });
      utilities.forEach(element => {
        element.removeEventListener("click", handleClickUtility)
      });
    };
  }, []);

  useEffect(() => {
    const controlKeys = document.querySelectorAll(".control-btn");
    if (!vehicleApi || !chassisApi) return;

    if (controls.w) {
      vehicleApi.applyEngineForce(35, 2);
      vehicleApi.applyEngineForce(35, 3);
      controlKeys[3].classList.add("active")
    } else if (controls.s) {
      vehicleApi.applyEngineForce(-35, 2);
      vehicleApi.applyEngineForce(-35, 3);
      controlKeys[2].classList.add("active")
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      controlKeys[3].classList.remove("active")
      controlKeys[2].classList.remove("active")
    }

    if (controls.a) {
      vehicleApi.setSteeringValue(0.15, 2);
      vehicleApi.setSteeringValue(0.15, 3);
      vehicleApi.setSteeringValue(-0.15, 0);
      vehicleApi.setSteeringValue(-0.15, 1);
      controlKeys[0].classList.add("active")
    } else if (controls.d) {
      vehicleApi.setSteeringValue(-0.15, 2);
      vehicleApi.setSteeringValue(-0.15, 3);
      vehicleApi.setSteeringValue(0.15, 0);
      vehicleApi.setSteeringValue(0.15, 1);
      controlKeys[1].classList.add("active")
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
      controlKeys[0].classList.remove("active")
      controlKeys[1].classList.remove("active")
    }

    if (controls.p) chassisApi.rotation.set(0, 0, 0);

    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
