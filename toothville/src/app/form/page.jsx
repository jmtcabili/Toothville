"use client"

import { BASE_URL } from "@/utils/constants";
import styles from "./personal-information/page.module.css";
import React, {useState, useRef, useEffect} from "react"
import Link from "next/link"
import {QRCodeCanvas} from "qrcode.react"
import { Input } from "@/components/ui/input";

const Header = () => {
    return(
        <>
            <header className = {styles.header}>
                <h1 className = {styles.headerTitle}>Questionnaire QR Code</h1>
            </header>
        </>
    )
}

export default function FormQR(){

    const [formLink, setFormLink] = useState(`${BASE_URL}/form/personal-information`);  
    const qrRef = useRef(null);

    
    return(
        <>
            <Input className = "!bg-white"></Input>
        </>
    )
}