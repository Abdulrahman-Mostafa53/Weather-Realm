import React, { useEffect, useState } from "react";
import getIcon from "../../utils/iconCodeMap";
import { Swipe } from "./swipe";
const DailyB = ({ time, min, max, code ,tempunit }) => {
  return (
    <div className=" w-full flex flex-col rounded-2xl mb-10 xl:mb-0">
      <h2 className="text-[25px] xl:text-[30px] font-inter text-gray-50 font-bold tracking-wider mb-5">
        Daily Forecast
      </h2>
      <ul className="flex xl:flex-col gap-1.5">
        {time.map((ele, index) => {
          const date = new Date(ele);
          const day = date
            .toLocaleDateString("en-US", { weekday: "short", day: "numeric" })
            .split(" ")
            .reverse()
            .join(" ");
          return (
            <li className="rounded-md py-2 px-3 flex xl:w-full  xl:flex-row  items-center justify-between bg-gray-800/30 shadow-md shadow-gray-700/70 border-gray-400/45 backdrop-blur-sm border">
              <span className="flex flex-col xl w-full text-gray-200 text-lg font-semibold">
                <span className="flex justify-between items-center w-full">
                  {day}
                  <img
                    src={getIcon(code[index])}
                    alt=""
                    className="w-10 xl:hidden"
                  />
                </span>

                <span className="xl:flex mt-1 tracking-wider">
                  <span className="flex flex-wrap font-normal text-sm md:text-lg xl:text-lg text-gray-300 mr-6">
                    Min{" "}
                    <span className="text-lg text-nowrap xl:text-xl font-semibold text-gray-50 ml-2">
                      {min[index]}{tempunit==="C"?" °C":" °F"}
                    </span>
                  </span>
                  <span className="flex flex-wrap font-normal text-lg xl:text-lg text-gray-300 mr-6">
                    Max{" "}
                    <span className="text-lg font-semibold text-nowrap xl:text-xl text-gray-50 ml-2">
                      {max[index]}{tempunit==="C"?" °C":" °F"}
                    </span>
                  </span>
                </span>
              </span>
              <span>
                <img
                  src={getIcon(code[index])}
                  alt=""
                  className="w-14 hidden xl:block"
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
const DailyS = ({ time, min, max, code,tempunit }) => {
  const [current, setCurrent] = useState(0);
  return <Swipe
    title={"Daily Forecast"}
    current={current}
    setCurrent={setCurrent}
    first={0}
    len={time.length}
    className="mb-4"
  >
    {(cur, index) => {
      const date = new Date(time[cur]);
      const day = date
        .toLocaleDateString("en-US", { weekday: "short", day: "numeric" })
        .split(" ")
        .reverse()
        .join(" ");
      return (
        <li className="rounded-md py-2 px-3 flex xl:w-full  xl:flex-row  items-center justify-between shadow-md shadow-gray-700/70 border-gray-400/45 backdrop-blur-sm border">
          <span className="flex flex-col w-full text-gray-200 text-sm md:text-lg font-semibold">
            <span className="flex justify-between items-center w-full">
              {day}
              <img
                src={getIcon(code[cur])}
                alt=""
                className="w-8 xl:hidden"
              />
            </span>
            <span className="xl:flex mt-1 tracking-wider">
              <span className="flex flex-wrap font-normal text-sm md:text-lg xl:text-lg text-gray-300 mr-6">
                Min{" "}
                <span className="text-sm text-nowrap xl:text-xl font-semibold text-gray-50 ml-2">
                  {min[cur]}{tempunit==="C"?" °C":" °F"}
                </span>
              </span>
              <span className="flex flex-wrap font-normal text-sm md:text-lg xl:text-lg text-gray-300 mr-6">
                Max{" "}
                <span className="text-sm font-semibold text-nowrap xl:text-xl text-gray-50 ml-2">
                  {max[cur]}{tempunit==="C"?" °C":" °F"}
                </span>
              </span>
            </span>
          </span>
          <span>
            <img
              src={getIcon(code[cur])}
              alt=""
              className="w-14 hidden xl:block"
            />
          </span>
        </li>
      );
    }}
  </Swipe>;
};

export const DailyForecast = ({ time, min, max, code }) => {
  const [sizeState, setSizeState] = useState("b");
  const tempunit = JSON.parse(localStorage.getItem("tempunit"))
  useEffect(() => {
    function onSizeChange() {
      if (window.innerWidth > 1024) {
        setSizeState("b");
      } else if (window.innerWidth < 1024) {
        setSizeState("s");
      }
    }
    onSizeChange()
    window.addEventListener("resize", onSizeChange);
    return () => {
      window.removeEventListener("resize", onSizeChange);
    };
  }, []);
  return (
    <>
      {sizeState === "b" ? (
        <DailyB time={time} min={min} max={max} code={code} tempunit={tempunit}/>
      ) : (
        <DailyS time={time} min={min} max={max} code={code} tempunit={tempunit}/>
      )}
    </>
  );
};
