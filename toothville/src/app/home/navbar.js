'use client'

import { useParams, usePathname } from 'next/navigation'

function determineSection(){
  const path = usePathname();
  if (path === '/home'){
      return("Home");
  }
  if (path === '/home/patients'){
    return ("Patients")
  }
}

export default function navbar() {
  return (
    <>
      <div className = "flex justify-between items-center align-middle bg-nav_blue text-white text-xl py-6 px-5 lg:px-12">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
      </svg>
      <div id = 'section' className = "font-bold text-xl md:text-lg">
        <span>{determineSection()}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
        <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
      </svg>

      </div> 
    </>
  )
}
/*
 
*/