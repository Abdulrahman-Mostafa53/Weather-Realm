import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.png";
import {IoMdSettings} from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router";
import { Search } from "./Search";
import { SearchOptions } from "./SearchOptions";
import { DateInfo } from "./Dateinfo";

export const Navbar = () => {
  function handleNavigation(lat, lon, timeZone) {
    navigate(
      `/?lat=${lat}&lon=${lon}${timeZone ? `&timezone=${timeZone}` : ""}`
    );
  }
  function handleInputChange(e) {
    setSearchInput(e.target.value);
  }
  function handleClick() {
    if (location["pathname"] == "/") {
      navigate("/settings");
    } else {
      try {
        const { lat, lon, timezone } = JSON.parse(
          localStorage.getItem("current")
        );
        navigate(
          `/?lat=${lat}&lon=${lon}${timezone ? `&timezone=${timezone}` : ""}`
        );
      } catch (error) {
        navigate(`/?lat=${"31.20176"}&lon=${"29.91582"}&timezone=Africa/Cairo`);
      }
    }
  }
  const location = useLocation();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [removeSearch, setRemoveSearch] = useState(0);
  const inputRef = useRef();
  const optionsRef = useRef();
  const iconStyle =
    "text-[40px] sm:text-5xl text-gray-200 hover:rotate-45 transition-transform duration-200 hover:shadow-md rounded-full";
  const current = JSON.parse(localStorage.getItem("current"));
  const [timeZone, setTimeZone] = useState(
    current ? current["timezone"] : "Africa/Cairo"
  );
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
    function updateTimeZone() {
      const timezone = JSON.parse(localStorage.getItem("current"))["timezone"]
      setTimeZone(timezone);
    }
    window.addEventListener("mousedown", unMountSearch);
    window.addEventListener("custom:storage", updateTimeZone);
    return () => {
      window.removeEventListener("mousedown", unMountSearch);
      window.removeEventListener("custom:storage", updateTimeZone);
    };
  }, []);
  return (
    <>
      <nav className="px-3 lg:px-0 h-20 sm:h-24 items-center bg-gray-500/20 absolute w-full z-20 flex justify-center">
        <div className="flex justify-between container gap-4 sm:gap-7">
          <div className="flex items-center flex-1">
            <div className="h-8 w-8 sm:h-14 sm:w-14 flex items-center justify-center mr-2 md:mr-4">
              <img src={logo} alt="logo.png" />
            </div>
            <Search
              ref={inputRef}
              onInputChange={handleInputChange}
              additionalStyles={{
                parent: "min-w-12 max-w-[500px] rounded-4xl",
                input:
                  "bg-gray-200/10 text-gray-50 placeholder:text-gray-300 p-3.5 rounded-4xl",
              }}
            />
          </div>
          <div className="flex items-center gap-1 sm:gap-4">
            {timeZone?<DateInfo timeZone={timeZone} />:null}
            {location["pathname"] === "/" ? (
              <IoMdSettings
                className={iconStyle}
                onClick={() => {
                  handleClick();
                }}
              />
            ) : (
              <TiHome
                className={iconStyle}
                onClick={() => {
                  handleClick();
                }}
              />
            )}
          </div>
        </div>
      </nav>
      {searchInput.length > 0 && removeSearch != 1 ? (
        <SearchOptions
          ref={optionsRef}
          setQueryParams={handleNavigation}
          searchQuery={searchInput}
          changeTimeZone={setTimeZone}
          removeComp={setRemoveSearch}
          additionalStyles="bg-blue-200/20 z-50 container left-1/2 -translate-x-1/2 max-w-4xl mt-[100px]"
        />
      ) : null}
    </>
  );
};
