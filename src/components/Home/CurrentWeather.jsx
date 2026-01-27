import React from 'react'
import getIcon from '../../utils/iconCodeMap'


export const CurrentWeather = ({temp,code,isDay}) => {
  const tempunit = JSON.parse(localStorage.getItem("tempunit"))
  return (
    <div className='w-44 h-44 relative justify-center items-center z-10 bg-gray-900/30 flex backdrop-blur-sm border-2 shadow-md shadow-gray-700/70 border-gray-400/45 rounded-full'>
        <img src={getIcon(code)} alt="" className='absolute top-1'/>
        <span className={`z-10 text-[42px] max-w-full border-2 text-shadow-gray-900 text-shadow-2xs font-inter font-extrabold pt-10 ${isDay?"text-gray-900 bg-gray-200/20 border-gray-300/10":"text-white bg-gray-600/20 border-gray-500"} backdrop-blur-xs shadow-md rounded-full flex justify-center items-center p-5 aspect-square`}>{temp}{tempunit==="C"?"°C":"°F"}</span>
    </div>
  )
}
