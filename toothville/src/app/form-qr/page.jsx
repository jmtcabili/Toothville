'use client'

import { BASE_URL } from "@/utils/constants";
import styles from "../form/personal-information/page.module.css";
import React, {useState, useRef} from "react"
import Link from "next/link"
import {QRCodeCanvas} from "qrcode.react"

export function Header(){
    return(
        <>
            <header className = {styles.header}>
                <h1 className = {styles.headerTitle}>Questionnaire QR Code</h1>
            </header>
        </>
    )
}

export default function FormQR(){

    const [formLink, setFormLink] = useState(`${BASE_URL}/form`);  
    const qrRef = useRef(null);

    
    return(
        <>
            <div className = "h-screen flex flex-col">
                <Header/>
                <div id="content" className = "h-full py-8 px-4 flex flex-col gap-2 items-center">
                    <div id="instructions" className = "max-w-[500px] py-2">
                        <h1 className = "font-semibold underline">Instructions</h1>
                        <p>Let the patient scan the qr code or enter the link on their phone.</p>
                    </div>
                    <div id="qr-link" className = "flex flex-col items-center gap-2 py-2">
                        <div id="qr" ref = {qrRef} className = "border border-black mb-2">
                           <QRCodeCanvas value = {formLink} size={300}/>
                        </div>
                        <div id="link" className = "text-wrap w-[300px] text-center border">
                            <Link href = {formLink} className = "text-wrap text-blue-700 underline">{formLink}</Link>
                        </div>
                    </div>
                </div>
            </div>
            
           
            
        </>
    )
}