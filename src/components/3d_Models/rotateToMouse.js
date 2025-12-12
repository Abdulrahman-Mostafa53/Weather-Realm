import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { degToRad } from "three/src/math/MathUtils";
export default function rotateToMouse(ref){
    const [rotateTo ,setRotateTo] = useState({x:0,y:0})
    const maxRot =60;
    function handleMouseMove(e){
     const xRot = -1*(e.clientX-(screen.availWidth/2))*(maxRot/(screen.availWidth/2))
     const yRot = (e.clientY-(screen.availHeight/2))*(maxRot/(screen.availHeight/2))
     setRotateTo((p)=>{console.log("Real",p);return {x:+degToRad(xRot).toFixed(2),y:+degToRad(yRot+90).toFixed(2)}})
    }
    useEffect(()=>{
      window.addEventListener("mousemove",(e)=>{handleMouseMove(e)})
      return window.removeEventListener('mousemove',handleMouseMove)
    },[])
    useFrame((state, delta) => {
        const change=0.2 * Math.sqrt(delta)
        if (ref.current) {
          // The ModelRotator component now controls the rotation 
          // of the object referenced by modelRef.current
          if(rotateTo["x"]>ref.current.rotation.z && rotateTo["x"]-ref.current.rotation.z >0.1){
            ref.current.rotation.z += change;
            ref.current.position.x-=(change/3)
          }
          else if(rotateTo["x"]<ref.current.rotation.z && ref.current.rotation.z-rotateTo["x"] >0.1){
            ref.current.rotation.z -= change;
            ref.current.position.x+=(change/3)
          }
          if(rotateTo["y"]>ref.current.rotation.x && rotateTo["y"]-ref.current.rotation.x >0.1){
            ref.current.rotation.x += change;
            ref.current.position.y-=(change/3)
          }
          else if(rotateTo["y"]<ref.current.rotation.x && ref.current.rotation.x-rotateTo["y"]>0.1){
            ref.current.rotation.x -= change;
            ref.current.position.y+=(change/3)
          }
           // Rotates 0.5 radians per second
    
        }})
}
