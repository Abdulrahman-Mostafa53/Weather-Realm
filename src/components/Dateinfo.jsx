import { useState } from "react";
import { useEffect } from "react";

function getime(timeZone) {
  const date = new Date();
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
import React from "react";

export const DateInfo = ({timeZone}) => {
  const [date, setDate] = useState(getime(timeZone));
  useEffect(() => {
    const id = setInterval(() => {
      setDate(getime(timeZone));
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);
  return (
    <div className="flex flex-col items-center">
      <p className="text-[24px] font-bold text-gray-900">{`${date.reduce(
        (acc, ele) => {
          if (ele.type === "hour") {
            return `${acc}${ele.value}:`;
          } else if (ele.type === "minute") {
            return `${acc}${ele.value} `;
          } else if (ele.type === "dayPeriod") {
            return `${acc}${ele.value} `;
          }
          return acc + "";
        },
        ""
      )}`}</p>
      <p className="text-[11px] text-gray-700 font-medium font-inter">
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
