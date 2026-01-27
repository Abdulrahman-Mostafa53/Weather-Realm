import { useEffect, useState } from "react";
import { CircleFlag } from "react-circle-flags";

export const SearchOptions = ({
  ref,
  setQueryParams,
  searchQuery,
  changeTimeZone,
  allowMount,
  removeComp,
  additionalStyles = "",
  handleAddLocation,
}) => {
  const [data, setData] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery}&count=5&language=en&format=json`
        );
        if (!response.ok) {
          throw Error("baddd naiaaa");
        }
        const locationData = await response.json();
        if (locationData["results"]) {
          locationData["results"] = locationData["results"].filter((lo) => {
            return lo["country"] ? true : false;
          });
        } else {
          setData("");
        }
        if (!locationData["results"]) {
          setData("");
        } else {
          setData(locationData["results"]);
        }
      } catch (e) {}
    }
    loadData();
    return allowMount;
  }, [searchQuery]);
  return (
    <div
      ref={ref}
      className={`${additionalStyles} absolute p-6 rounded-xl shadow-md shadow-blue-500/80 backdrop-blur-3xl  `}
    >
      {!data ? (
        <p>Results not found</p>
      ) : (
        <ul className="border-gray-500 border rounded-2xl overflow-hidden">
          {data.map((loc, index) => {
            return (
              <li>
                <button
                  onClick={(e) => {
                    removeComp(1);
                    if (changeTimeZone) {
                      changeTimeZone(loc["timezone"]);
                      if (loc["timezone"]) {
                        setQueryParams(
                          loc["latitude"],
                          loc["longitude"],
                          loc["timezone"]
                        );
                      } else {
                        setQueryParams(loc["latitude"], loc["longitude"]);
                      }
                      localStorage.setItem("current",JSON.stringify({
                        id: `${loc["latitude"]}${loc["longitude"]}`,
                        countryCode: loc["country_code"],
                        name: loc["name"],
                        lat: loc["latitude"],
                        lon: loc["longitude"],
                        timezone: loc["timezone"],
                      }));
                    }
                    if (handleAddLocation) {
                      handleAddLocation(
                        loc["country_code"],
                        loc["name"],
                        loc["latitude"],
                        loc["longitude"],
                        loc["timezone"]
                      );
                    }
                  }}
                  className={`z-50 flex gap-5 items-center p-5 bg-gray-500/30 backdrop-blur-xl w-full ${
                    index === data.length - 1 ? "" : "border-b"
                  } border-gray-500  hover:bg-gray-300/30 transition-all`}
                >
                  <CircleFlag
                    className="pointer-events-none"
                    countryCode={loc["country_code"].toLowerCase()}
                    width="35"
                  />
                  {loc["name"]}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
