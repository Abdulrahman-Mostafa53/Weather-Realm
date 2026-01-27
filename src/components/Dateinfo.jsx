import { useState } from "react";
import { useEffect } from "react";
import React from "react";

function gettime(timeZone) {
  const formatter = Intl.DateTimeFormat("en-US", {
    timeZone: timeZone,
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return formatter.formatToParts();
}

export const DateInfo = ({timeZone}) => {

  const [date, setDate] = useState(gettime(timeZone));
  useEffect(() => {
    setDate(gettime(timeZone));
    const id = setInterval(() => {
      setDate(gettime(timeZone));
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [timeZone]);
  return (
    <div className="flex flex-col items-center">
      <p className="text-sm sm:text-[24px] font-bold text-gray-100">{`${date.reduce(
        (acc, ele) => {
          if (ele.type === "hour") {
            return `${acc}${ele.value}:`;
          } else if (ele.type === "minute") {
            return `${acc}${ele.value} `;
          } else if (ele.type === "dayPeriod") {
            return `${acc}${ele.value}`;
          }
          return acc + "";
        },
        ""
      )}`}</p>
      <p className="text-[8px] sm:text-[11px] text-gray-200 font-medium font-inter">
        {`${date.reduce((acc, ele) => {
          if (ele.type === "weekday") {
            return `${acc}${ele.value}, `;
          } else if (ele.type === "month") {
            return `${acc}${ele.value.toUpperCase()} `;
          } else if (ele.type === "day") {
            return `${acc}${ele.value}, `;
          } else if (ele.type === "year") {
            return `${acc}${ele.value}`;
          }
          return acc + "";
        }, "")}`}
      </p>
    </div>
  );
};
