import React from "react";
import { IoIosSearch } from "react-icons/io";

export const Search = ({onInputChange}) => {
  return (
    <div className="flex-1 max-w-64 md:max-w-80 flex items-center relative">
      <input
        type="search"
        className="bg-gray-50 focus:outline-none rounded-3xl peer p-1.5 pl-5 w-full placeholder:text-gray-400 placeholder:font-light placeholder:font-inter"
        placeholder="Search location"
        name=""
        id="sh"
        onChange={(e)=>{onInputChange(e)}}
      />
      <IoIosSearch className="absolute right-6 text-xl text-gray-900 peer-focus:hidden" />
    </div>
  );
};
