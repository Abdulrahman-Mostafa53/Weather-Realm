import React from "react";
import pa from "../../assets/images/WeatherConIcons/RainThunder.svg";

const data = [
  { date: "Thu 25", temp: "17°C" },
  { date: "Thu 25", temp: "17°C" },
  { date: "Thu 25", temp: "17°C" },
  { date: "Thu 25", temp: "17°C" },
  { date: "Thu 25", temp: "17°C" },
  { date: "Thu 25", temp: "17°C" },
  { date: "Thu 25", temp: "17°C" },
];
export const DailyForecast = () => {
  return (
    <div className=" w-full flex flex-col   rounded-2xl ">
      <h2 className="text-2xl font-inter text-gray-900 font-bold tracking-wider mb-5">
        Daily Forecast
      </h2>
      <ul className=" flex flex-col gap-1.5">
        {data.map((ele) => {
          return (
            <li className="rounded-md py-2 px-3 flex  items-center justify-between bg-gray-800/30 shadow-md shadow-gray-700/70 border-gray-400/45 backdrop-blur-sm border">
              <span className="flex flex-col text-gray-200 text-xl">
                {ele["date"]}
                <span className="text-3xl text-gray-50 mt-1 tracking-wider">{ele["temp"]}</span>
              </span>
              <span>
                <img src={pa} alt="" className="w-14" />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
