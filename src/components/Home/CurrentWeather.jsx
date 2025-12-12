import React from 'react'
import pp from "../../assets/images/WeatherConIcons/RainThunder.svg"

export const CurrentWeather = () => {
  return (
    <div className='w-44 h-44 relative  justify-center items-center z-10 bg-gray-800/30 flex backdrop-blur-sm border-2 shadow-md shadow-gray-700/70 border-gray-400/45 rounded-full'>
        <img src={pp} alt="" className='absolute top-1 opacity-90' />
        <span className='z-10 text-5xl  font-inter font-extrabold pt-10 text-gray-900 bg-white/40 backdrop-blur-xs shadow-md rounded-full flex justify-center items-center p-5 aspect-square'>15°C</span>
    </div>
  )
}
