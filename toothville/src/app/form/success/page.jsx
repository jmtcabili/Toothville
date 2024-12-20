"use client"

import styles from "../personal-information/page.module.css"
import Image from "next/image";
import logo from "../../../../public/assets/banner.png";
import React, {useEffect} from "react";
function Header(){
    return(
        <>
            <header className = {styles.header}>
                <h1 className = {styles.headerTitle}>Patiend Information Added</h1>
            </header>
        </>
    )
}
export default function Success(){

    useEffect(() => {
        history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', function (event) {
            console.log("triggered");
            
            history.pushState(null, '', window.location.href);
        });
    }, []);

    return (
        <>
            <div className="flex flex-col items-center h-screen">
                <Header/> 
                <div className="h-full flex flex-col items-center justify-center text-center text-xl max-w-[500px] px-8 flex-wrap gap-4">
                    <Image src = {logo}
                       alt = "Toothville logo"></Image>
                    <div>
                        Your information has been registered. Kindly close this tab and 
                        proceed with your appointment.
                    </div>
                </div>
            </div>
        </>
    )
}