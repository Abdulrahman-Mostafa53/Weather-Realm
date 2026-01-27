import React, {useEffect, useRef, useState } from "react";
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";

export const Swipe = ({
  title,
  current,
  setCurrent,
  first,
  len,
  children,
  className = "",
}) => {
  
  const fullView = Array(len)
    .fill(0)
    .map((start, index) => start + index);
  const [gridCols, setGridCols] = useState(0);
  const inView = fullView.slice(current, current + gridCols);
  const grid = useRef();
  useEffect(() => {
    function defGrid() {
      setGridCols(
        window
          .getComputedStyle(grid.current)
          .getPropertyValue("grid-template-columns")
          .split(" ").length
      );
  
    }
    const gridObserver = new ResizeObserver(defGrid)
    gridObserver.observe(grid.current)
    return () => {
      gridObserver.disconnect()
    };
  }, []);
  useEffect(() => {
    let startPos = 0;
    function setStartPos(e) {
      startPos = e.touches[0].clientX;
    }
    function validateSwipe(e) {
      if (e.changedTouches[0].clientX - startPos > 50) {
        if (current > first) {
          setCurrent((p) => {
            return p - 1;
          });
        }
      } else if (startPos - e.changedTouches[0].clientX > 50) {
        if (current + gridCols < len) {
          setCurrent((p) => {
            return p + 1;
          });
        }
      }
    }
    grid.current.addEventListener("touchstart", setStartPos);
    grid.current.addEventListener("touchend", validateSwipe);
    return () => {
      try {
        grid.current.removeEventListener("touchstart", setStartPos);
        grid.current.removeEventListener("touchend", validateSwipe);
      } catch (error) {}
    };
  }, [current]);
  return (
    <div
      className={`${className} group bg-gray-800/30 overflow-hidden flex backdrop-blur-sm border shadow-md shadow-gray-700/70 border-gray-400/45 rounded-2xl container`}
    >
      <p className="py-10 bg-gray-800/20 text-xs md:text-base z-10 border-r pl-3 md:pl-7  text-gray-100  border-gray-500/40 font-semibold tracking-wider flex items-center">
        {title}
      </p>
      <ul
        ref={grid}
        className="relative w-full max-h-96 grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
      >
        {current > first ? (
          <button
            onClick={() => {
              setCurrent((p) => {
                return p - 1;
              });
            }}
            className="absolute left-0  origin-left transition-all scale-x-0 group-hover:scale-x-100 text-gray-50 opacity-0 group-hover:opacity-100 text-3xl top-1/2 -translate-y-1/2 p-2.5 h-full bg-gray-400/30 z-50"
          >
            <LiaAngleLeftSolid />
          </button>
        ) : null}
        {inView.map((cur, index) => {
          return children(cur, index);
        })}
        {current + gridCols < len ? (
          <button
            onClick={() => {
              setCurrent((p) => {
                return p + 1;
              });
            }}
            className="absolute right-0 scale-x-0 origin-right transition-all opacity-0 group-hover:scale-x-100 group-hover:opacity-100 text-gray-50 text-3xl top-1/2 -translate-y-1/2 p-2.5 h-full bg-gray-400/30 z-50"
          >
            <LiaAngleRightSolid />
          </button>
        ) : null}
      </ul>
    </div>
  );
};
