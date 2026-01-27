import React from 'react'
import Bg from '../assets/images/ErrorBg.png'
import Content from '../assets/images/ErrorFront.png'
import { useNavigate } from 'react-router'
export const NotFound = () => {
  const navigate = useNavigate()
  return (
    <>
        <img src={Bg} alt="error background" className='absolute size-full '/>
        <div className='mx-auto flex flex-col items-center justify-center container h-screen relative'>
          <h1 className='flex flex-col items-center text-gray-50 font-bold text-[32px] tracking-wide mt-4'><span className='font-bold text-gray-50 text-[160px]/35'>404</span>PAGE NOT FOUND</h1>
          <div className='max-w-[450px]'>
              <img src={Content} alt="" className='-mt-6 animate' />
          </div>
          <button className='bg-blue-400/40 mt-8 text-gray-200 font-medium tracking-wide px-4 py-3 text rounded-3xl hover:bg-blue-400/20 transition-colors' onClick={()=>{navigate("/")}}>Go back to your Home!</button>
        </div>
    </>

  )
}
