import React, { useState, useRef, useEffect } from "react";
import Bg from "../assets/images/ErrorBg.png";
import { Search } from "../components/Search.jsx";
import { CircleFlag } from "react-circle-flags";
import { GoTrash } from "react-icons/go";
import { SearchOptions } from "../components/SearchOptions.jsx";
import useLocalStorage from "../hooks/localStorage.jsx";

export const Settings = () => {
  const storageCustom = new CustomEvent("custom:storage");
  const [timeUnit, setTimeUnit] = useLocalStorage("timeunit", 1);
  const [searchInput, setSearchInput] = useState("");
  const [removeSearch, setRemoveSearch] = useState(0);
  const [tempUnit, setTempUnit] = useLocalStorage("tempunit", "C");
  const [savedLocations, setSavedLocations] = useLocalStorage("locations", [
    {
      id: "31.2017629.91582",
      countryCode: "Eg",
      name: "Alexandria",
      lat: "31.20176",
      lon: "29.91582",
      timezone: "Africa/Cairo",
    },
  ]);
  const [currentLocation, setCurrentLocation] = useLocalStorage("current", {
    id: "31.2017629.91582",
    countryCode: "Eg",
    name: "Alexandria",
    lat: "31.20176",
    lon: "29.91582",
    timezone: "Africa/Cairo",
  });
  const inputRef = useRef();
  const optionsRef = useRef();
  useEffect(() => {
    function unMountSearch(e) {
      let flag = false;
      if (
        e.target != inputRef["current"] &&
        e.target != optionsRef["current"]
      ) {
        try {
          for (const ele of optionsRef["current"].children[0].children) {
            if (e.target === ele.children[0]) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            setRemoveSearch(1);
          }
        } catch (error) {}
      } else {
        setRemoveSearch(0);
      }
    }
    window.addEventListener("mousedown", unMountSearch);

    return () => {
      window.removeEventListener("mousedown", unMountSearch);
    };
  }, []);
  useEffect(() => {
    dispatchEvent(storageCustom);
  }, [currentLocation]);
  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }
  function handleAddLocation(code, name, la, lo, zone) {
    setSavedLocations((p) => {
      return [
        ...p,
        {
          id: `${la}${lo}`,
          countryCode: code,
          name: name,
          lat: la,
          lon: lo,
          timezone: zone,
        },
      ];
    });
  }
  return (
    <>
      <img
        src={Bg}
        alt="error background"
        className="absolute h-full w-full -z-10"
      />
      <div className="container mx-auto pt-28 p-3 lg:p-5 lg:pt-36 min-h-screen  overflow-hidden">
        <div className="bg-gray-700/25 mb-2.5 py-6 sm:py-11 px-5 md:px-10 lg:px-16 rounded-2xl shadow-md border border-gray-400/50 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-gray-50 tracking-wider mb-6 w-full border-b border-gray-400/40 pb-4 ">
            General
          </h2>
          <form
            action=""
            className="flex gap-10 flex-col"
            onSubmit={(e) => {
              e.preventDefault();
            }}
            onChange={(e) => {
              e.target.id === "opt1" ? setTempUnit("C") : setTempUnit("F");
            }}
          >
            <div className="flex flex-wrap">
              <h3 className="text-md md:text-lg text-gray-50 font-semibold mb-6 md:mb-8 tracking-wider w-full">
                Temperature Unit
              </h3>
              <label
                htmlFor="opt1"
                className="flex items-center mr-16 mb-5 sm:mb-0"
              >
                <div className="relative mr-3.5 w-7 h-7">
                  <input
                    onChange={(e) => {
                      setTempUnit(e.target.value === 1 ? "C" : "F");
                    }}
                    defaultChecked={tempUnit === "C"}
                    type="radio"
                    name="temperature"
                    id="opt1"
                    className="peer appearance-none bg-gray-500-/40 border-2 border-white/50 size-full rounded-full"
                  />
                  <span className="bg-blue-400 border border-blue-500/80 rounded-full w-4 peer-checked:block hidden h-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></span>
                </div>

                <span className="text-gray-200">°C {"(Celesius)"}</span>
              </label>
              <label htmlFor="opt2" className="flex items-center">
                <div className="relative mr-3.5 w-7 h-7">
                  <input
                    defaultChecked={tempUnit === "F"}
                    type="radio"
                    name="temperature"
                    id="opt2"
                    className="peer appearance-none bg-gray-500-/40 border-2 border-white/50 size-full rounded-full"
                  />
                  <span className="bg-blue-400 border border-blue-500/80 rounded-full w-4 peer-checked:block hidden h-4 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"></span>
                </div>
                <span className="text-gray-200">°F {"(Fahrenheit)"}</span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-md md:text-lg text-gray-50 flex flex-wrap gap-2 sm:gap-6 font-semibold tracking-wider">
                Time Format
                <span className="text-base tracking-widest text-gray-300 font-normal">
                  12-Hour (AM/PM)
                </span>
              </h3>

              <button
                onClick={() => {
                  setTimeUnit((p) => {
                    return p === 0 ? 1 : 0;
                  });
                }}
                className={`${
                  timeUnit === 1 ? "bg-blue-400/50" : "bg-gray-500/50"
                } border relative border-blue-200/35 min-w-[75px] w-[75px] h-10 size-full rounded-3xl`}
              >
                <span
                  className={`absolute w-8 h-8 bg-gray-50 transition-all top-1/2 ${
                    timeUnit === 1 ? "right-1" : "left-1"
                  } -translate-y-1/2 rounded-full`}
                ></span>
              </button>
            </div>
          </form>
        </div>
        <div className="bg-gray-700/25 p-7 py-6 sm:py-11 px-5 md:px-10 lg:px-16 rounded-2xl shadow-md border border-gray-400/50 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-gray-50 tracking-wider mb-6 w-full border-b border-gray-400/40 pb-4 ">
            Saved Locations
          </h2>
          <div className="flex">
            <div className="flex relative flex-1 max-w-[600px]">
              <Search
                ref={inputRef}
                onInputChange={handleInputChange}
                additionalStyles={{
                  parent: "md:max-w-full",
                  input:
                    "bg-gray-700/20 text-gray-50 placeholder:text-gray-300 p-3.5 rounded-l-md",
                }}
              />
              <button
                onClick={() => {
                  inputRef.current.focus();
                }}
                className=" rounded-r-md  text-2x bg-blue-500/80 w-20 text-3xl text-gray-50"
              >
                +
              </button>
              {searchInput.length > 0 && removeSearch != 1 ? (
                <SearchOptions
                  removeComp={setRemoveSearch}
                  searchQuery={searchInput}
                  ref={optionsRef}
                  additionalStyles="mt-[60px] w-full bg-gray-700/70 text-gray-50"
                  handleAddLocation={handleAddLocation}
                />
              ) : null}
            </div>
          </div>
          <ul className="h-[536px] overflow-auto bg-gray-800/20 rounded-md mt-5 p-4 flex flex-col gap-4">
            {savedLocations.map((loc) => {
              return (
                <li
                  id={loc.id}
                  onClick={() => {
                    setCurrentLocation({
                      id: loc.id,
                      countryCode: loc.countryCode,
                      name: loc.name,
                      lat: loc.lat,
                      lon: loc.lon,
                      timezone: loc.timezone,
                    });
                  }}
                  className={`transition-colors ${
                    currentLocation.id === loc.id
                      ? "bg-blue-400/50"
                      : "bg-gray-200/15"
                  } flex items-between sm:items-center justify-between p-3 md:p-5 rounded-md flex-col sm:flex-row`}
                >
                  <div className="flex items-center">
                    <CircleFlag
                      countryCode={loc.countryCode.toLowerCase()}
                      className="w-9 md:w-12"
                    />
                    <span className="text-md md:text-xl text-gray-100 ml-2 md:ml-4">
                      {loc.name}
                    </span>
                  </div>
                  {currentLocation.id !== loc.id &&
                  savedLocations.length > 1 ? (
                    <GoTrash
                      onClick={(e) => {
                        e.stopPropagation();
                        setSavedLocations((p) =>
                          p.filter((location) => {
                            return location.id != loc.id;
                          })
                        );
                      }}
                      className="bg-red-500/70 shadow-md self-end shadow-gray-500 hover:shadow-[0px_0px_10px] hover:shadow-red-400 transition-all text-gray-100 rounded-full min-h-10 min-w-10 md:min-w-12 md:min-h-12 p-1 md:p-2 "
                    />
                  ) : null}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
