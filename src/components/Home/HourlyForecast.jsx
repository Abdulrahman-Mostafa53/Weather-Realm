import React, {useState} from "react";
import getIcon from "../../utils/iconCodeMap";
import { Swipe } from "./swipe";

export const HourlyForecast = ({ currentHour, temp, time, code }) => {
  const startDate = new Date(currentHour);
  const [current, setCurrent] = useState(startDate.getHours());
  const tempunit = JSON.parse(localStorage.getItem("tempunit"))
  const timeunit = JSON.parse(localStorage.getItem("timeunit"))
  return (
    <Swipe title={"Hourly Forecast"} current={current} setCurrent={setCurrent} first={startDate.getHours()} len={time.length}>
      {(cur,index) => {
        const currentDate = new Date(time[cur])
        const hour = currentDate.getHours()
        const day = currentDate.getDate()
        const timeFormated= currentDate.toLocaleDateString('en-US',{hour:"2-digit",hour12:timeunit}).split(", ")[1]
        return(
        <li className="border-r flex-1 border-gray-500/40 flex flex-col items-center justify-center">
          <p className="text-md md:text-xl text-gray-50 font-semibold mb-1.5 text-nowrap">
            {hour === startDate.getHours() && day === startDate.getDate()
              ? "now"
              : timeFormated}
          </p>
          <p className=" md:text-xl text-gray-200 flex items-center gap-1 md:gap-3.5">
            {temp[cur]}{tempunit==="C"?" °C":" °F"}
            <img src={getIcon(code[cur])} alt="" className="w-8 md:w-10" />
          </p>
        </li>)
      }}
    </Swipe>
  );
};
