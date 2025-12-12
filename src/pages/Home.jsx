import React, { Suspense, use, useRef } from "react";
import Bg from "../assets/images/tempBg.jpg";
import { HourlyForecast } from "../components/Home/HourlyForecast";
import { CurrentWeather } from "../components/Home/currentWeather";
import { DailyForecast } from "../components/Home/DailyForecast";
import { Canvas, useThree } from "@react-three/fiber";
import * as THREE from "three"; // Required for THREE.Color and THREE.Fog
import {
  OrbitControls,
  Environment,
  ContactShadows,
  useHelper,
} from "@react-three/drei";
import { Ground } from "../components/3d_Models/GroundMor";
import { Sun } from "../components/3d_Models/Sun";
import { degToRad } from "three/src/math/MathUtils";
import { DirectionalLightHelper, PointLightHelper } from "three";
import { Moon } from "../components/3d_Models/Moon";
import { GroundEve } from "../components/3d_Models/GroundEve";


export const Home = () => {
  return (
    <>
      <div className="w-full absolute h-full">
        <Canvas
          shadows
          camera={{
            position: [0, 2, 10],
            rotation: [degToRad(0), degToRad(0), degToRad(0)],
            fov: 60,
          }}
        >
          <ambientLight intensity={0.5} color="#ADE8FF" />

<GroundEve/>
          <Moon />
        </Canvas>
   
      </div>
      <div className="container relative mx-auto p-5 grid grid-rows-[1fr_auto] h-screen pt-16">
        <div className="h-full flex justify-between">
          <div className="flex items-center max-w-96 flex-1 h-full">
            <DailyForecast />
          </div>
          <div className="flex items-center h-full">
            <CurrentWeather />
          </div>
        </div>
        <HourlyForecast />
      </div>
    </>
  );
};
