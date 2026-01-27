import React, {useState } from "react";
import { IoIosSearch } from "react-icons/io";

export const Search = ({ onInputChange, ref, additionalStyles = "" }) => {
  const [showIcon, setShowIcon] = useState(true);
  return (
    <div
      className={`${additionalStyles.parent} overflow-hidden flex-1 max-w-64 flex items-center relative`}
    >
      <input
        ref={ref}
        type="search"
        className={`${additionalStyles.input} focus:outline-none peer pl-3 sm:pl-5 w-full placeholder:text-sm sm:placeholder:text-base sm:text-md placeholder:font-light placeholder:font-inter h-11 sm:h-full`}
        placeholder="Search location"
        name=""
        id="sh"
        onChange={(e) => {
          onInputChange(e);
          e.target.value.length > 0 ? setShowIcon(false) : setShowIcon(true);
        }}
      />
      <span>
        {showIcon ? (
          <IoIosSearch className="absolute right-0 top-0 w-10 sm:w-14 p-2 sm:p-3 backdrop-blur-[1px] h-full text-gray-300 peer-focus:hidden" />
        ) : null}
      </span>
    </div>
  );
};
