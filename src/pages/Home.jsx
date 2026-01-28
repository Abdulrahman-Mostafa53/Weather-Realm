import { HourlyForecast } from "../components/Home/HourlyForecast";
import { CurrentWeather } from "../components/Home/CurrentWeather";
import { DailyForecast } from "../components/Home/DailyForecast";
import { Canvas } from "@react-three/fiber";
import { Ground } from "../components/3d_Models/GroundMor";
import { Sun } from "../components/3d_Models/Sun";
import { degToRad } from "three/src/math/MathUtils";
import { Moon } from "../components/3d_Models/Moon";
import { GroundEve } from "../components/3d_Models/GroundEve";
import { useLoaderData } from "react-router";
import { PLaneM } from "../components/3d_Models/planeM";
import { PlaneE } from "../components/3d_Models/PlaneE";
import { Environment, PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";

export const Home = () => {
  const [dpr, setDpr] = useState(2);
  const data = useLoaderData();
  const { daily, current, hourly } = data;
  return (
    <>
      <div className="absolute w-full h-full">
        <Canvas
          dpr={0.1}
          camera={{
            position: [0, 2, 10],
            rotation: [degToRad(0), degToRad(0), degToRad(0)],
            fov: 60,
          }}
        >
          <Environment preset="night" />
          <ambientLight intensity={3} color="#ADE8FF" />
          {current["is_day"] === 1 ? <PLaneM /> : <PlaneE />}
        </Canvas>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2  -top-8 xl:top-1/2 w-full h-[80%] xl:-translate-y-1/2 xl:w-full xl:h-full">
        <Canvas
          dpr={dpr}
          camera={{
            position: [0, 2, 10],
            rotation: [degToRad(0), degToRad(0), degToRad(0)],
            fov: 60,
          }}
        >
          <PerformanceMonitor onDecline={()=>{setDpr(1)}}/>
          <ambientLight intensity={1.2} color="#ADE8FF" />
          {current["is_day"] === 1 ? (
            <>
              <Environment preset="city" />
              <Ground />
              <Sun />
            </>
          ) : (
            <>
            <Environment preset="city"  environmentIntensity={0.7}/>
              <GroundEve />
              <Moon />
            </>
          )}
        </Canvas>
      </div>
      <div className="container relative mx-auto p-5 grid grid-rows-[1fr_auto] xl:gap-20 min-h-dvh pt-36 pb-20 xl:pb-7">
        <div className="h-full flex justify-between">
          <div className="flex items-end xl:items-center xl:max-w-[440px] flex-1 h-full">
            <DailyForecast
              time={daily["time"]}
              min={daily["temperature_2m_min"]}
              max={daily["temperature_2m_max"]}
              code={daily["weather_code"]}
            />
          </div>
          <div className="hidden xl:flex items-center h-full">
            <CurrentWeather
              temp={current["temperature_2m"]}
              code={current["weather_code"]}
              isDay={current["is_day"]}
            />
          </div>
        </div>
        <HourlyForecast
          currentHour={current["time"]}
          temp={hourly["temperature_2m"]}
          time={hourly["time"]}
          code={hourly["weather_code"]}
        />
      </div>
    </>
  );
};

export const getWeather = async function ({ request }) {
  const url = new URL(request.url);
  const searchParams = url["searchParams"];
  try {
    const current = JSON.parse(localStorage.getItem("current"));
    const tempunit = JSON.parse(localStorage.getItem("tempunit"));
    const res = await fetch(
      searchParams.size > 0
        ? `https://api.open-meteo.com/v1/forecast?latitude=${searchParams.get(
            "lat"
          )}&longitude=${searchParams.get(
            "lon"
          )}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,is_day,weather_code${
            searchParams.get("timezone")
              ? `&timezone=${searchParams.get("timezone")}`
              : ""
          }${tempunit === "F" ? "&temperature_unit=fahrenheit" : ""}`
        : `https://api.open-meteo.com/v1/forecast?latitude=${
            current["lat"]
          }&longitude=${
            current["lon"]
          }&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,is_day,weather_code${
            current["timezone"] ? `&timezone=${current["timezone"]}` : ""
          }`
    );
    if (!res.ok) {
      throw Error("couldnt fetch api.. please check you data");
    }
    return res.json();
  } catch (error) {
    console.log(Error(error));
  }
};
