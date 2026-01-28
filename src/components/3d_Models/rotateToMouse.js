import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
export default function rotateToMouse(ref, maxRot = 80,isPerformant) {
  const rotateTo = useRef({ x: 0, y: 0 });
  function handleMouseMove(x, y) {
    const xRot =
      -1 * (x - screen.availWidth / 2) * (maxRot / (screen.availWidth / 2));
    const yRot =
      (y - screen.availHeight / 2) * (maxRot / (screen.availHeight / 2));
    rotateTo.current = {
      x: +degToRad(xRot).toFixed(2),
      y: +degToRad(yRot + 90).toFixed(2),
    };
  }
  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      handleMouseMove(e.clientX, e.clientY);
    });
    window.addEventListener("touchstart", (e) => {
      handleMouseMove(e.touches[0].clientX, e.touches[0].clientY);
    });
    window.addEventListener("touchmove", (e) => {
      handleMouseMove(e.touches[0].clientX, e.touches[0].clientY);
    });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);
  useFrame((state, delta) => {
    const change = 0.2 * Math.sin(delta) + 0.03;
    if (ref.current) {
      if (
        rotateTo.current["x"] > ref.current.rotation.z &&
        rotateTo.current["x"] - ref.current.rotation.z > 0.1
      ) {
        ref.current.rotation.z += change;
        ref.current.position.x -= change / 3;
      } else if (
        rotateTo.current["x"] < ref.current.rotation.z &&
        ref.current.rotation.z - rotateTo.current["x"] > 0.1
      ) {
        ref.current.rotation.z -= change;
        ref.current.position.x += change / 3;
      }
      if (
        rotateTo.current["y"] > ref.current.rotation.x &&
        rotateTo.current["y"] - ref.current.rotation.x > 0.1
      ) {
        ref.current.rotation.x += change;
        ref.current.position.y -= change / 3;
      } else if (
        rotateTo.current["y"] < ref.current.rotation.x &&
        ref.current.rotation.x - rotateTo.current["y"] > 0.1
      ) {
        ref.current.rotation.x -= change;
        ref.current.position.y += change / 3;
      }
    }
  });
}
