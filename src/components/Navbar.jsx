import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo.png";
import { IoIosSearch, IoMdSettings, IoMdVideocam } from "react-icons/io";
import { TiHome } from "react-icons/ti";
import { useContext } from "react";
import { RouteContext } from "../contexts/routeContext";
import { useNavigate } from "react-router";
import { Search } from "./Search";
import { SearchOptions } from "./SearchOptions";
import { DateInfo } from "./Dateinfo";


export const Navbar = ({ timeZone }) => {
  function handleClick() {
    setCurrentRoute((c) => {
      if (c === 0) {
        navigate("/settings");
        return 1;
      }
      navigate("/");
      return 0;
    });
    console.log(currentRoute);
  }
  function handleInputChange(e){
    console.log(e.target.value);
    setSearchInput(e.target.value)
  }
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState("")
  const [currentRoute, setCurrentRoute] = useContext(RouteContext);
  const iconStyle =
    "text-5xl text-gray-900 hover:rotate-45 transition-transform duration-200 hover:shadow-md rounded-full";


  return (
    <>
      <nav className="h-24 items-center bg-gray-500/20 absolute w-full z-20 flex justify-center">
        <div className=" flex justify-between container">
          <div className="flex items-center flex-1">
            <div className="h-14 w-14 flex items-center justify-center mr-2 md:mr-4">
              <img src={logo} alt="logo.png" />
            </div>
            <Search onInputChange={handleInputChange}/>
          </div>
          <div className="flex items-center gap-4">
            <DateInfo timeZone={timeZone}/>
            {currentRoute === 0 ? (
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
      {searchInput.length>0?<SearchOptions searchQuery={searchInput}/>:null}
    </>
  );
};
