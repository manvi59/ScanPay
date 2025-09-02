"use client"
import React from 'react'

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RiArrowLeftSLine } from "react-icons/ri";
import Link from 'next/link';

 

const MainHeader = () => {

    const pathname = usePathname();

    console.log(pathname)
    
  return (
     <>
     {pathname=="/design" || pathname=="/pay-parking" ?
     
         <div className="parking-header">
             <div className="logo-circle">
               <img src="/tsp_logo.png" alt="logo"  height={100} width={100}  className="p-3"/>
             </div>
           </div> 

           :
     
                 <nav
           className="navbar ps-3  navbar-dark payment_background_light justify-content-start align-items-center"
           style={{ background: 'rgb(0, 0, 0)' }}
         >
            <Link href="/pay-parking">
           <div className="d-flex header_buttons">
             <button
               id="back1"
               type="button"
               className="btn btn-primary p-1"

               
             >
                <RiArrowLeftSLine  size={30}/>
             </button>
           </div>
            </Link>
           <a className="navbar-brand pt-0" href='/pay-parking' style={{ paddingLeft: '1rem' }}>
             Pay Now
           </a>
         </nav>
    }
     
     </>
  )
}

export default MainHeader
