import React from "react";
import pa from "../../assets/images/WeatherConIcons/RainThunder.svg";

export const HourlyForecast = () => {
  const fake = [
    { temp: "15" },
    { temp: "15" },
    { temp: "15" },
    { temp: "15" },
    { temp: "15" },
    { temp: "15" },
    { temp: "15" },
  ];
  return (
    <div className="bg-gray-800/30 flex backdrop-blur-sm border shadow-md shadow-gray-700/70 border-gray-400/45 rounded-2xl container ">
      <p className="py-10 border-r px-7  text-gray-100  border-gray-500/40 font-semibold tracking-wider flex items-center">
        Hourly Forecast
      </p>
      <ul className="max-h-96 overflow-hidden flex flex-1">
        {fake.map((hour, index) => {
          return (
            <li className="px-8 border-r flex-1 border-gray-500/40 flex flex-col items-center justify-center">
              <p className="text-xl text-gray-50 font-semibold mb-1.5 text-nowrap">
                {index + 1} PM
              </p>
              <p className=" text-xl text-gray-200 items-center flex gap-3.5">
                {hour["temp"]}°C
                <img src={pa} alt="" className="w-10" />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
