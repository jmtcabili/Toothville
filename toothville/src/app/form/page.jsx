"use client"

import styles from "./personal-information/page.module.css";
import React, {useState, useRef} from "react";
import {useRouter} from "next/navigation"; 
import Link from "next/link";
import {Input} from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { BASE_URL } from "@/utils/constants";

const Header = () => {
    return(
        <>
            <header className = {styles.header}>
                <h1 className = {styles.headerTitle}>Form Password</h1>
            </header>
        </>
    )
}

export default function FormQR(){

    const [disableSubmit, setDisableSubmit] = useState(false); 
    const passRef = useRef(null);
    const router = useRouter();

    const handleSubmit = async(e) => {
        console.log(passRef.current.value);
        setDisableSubmit(true);
        //check with db if password is correct then route
        try{
            const inputPassword = passRef.current.value;
            const res = await fetch(`${BASE_URL}/api/formPassword`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputPassword: inputPassword }),
            })
            console.log(res);
            
            const data = await res.json();
            console.log(data);
            
            if (data.status === true){
                router.push("/form/personal-information");
            }else{
                alert("Incorrect password");
            }
        }catch(error){
           
        }finally{
            setDisableSubmit(false);
        }

        //NOTE: provide cookies with token and clear on form submit
    }
    return(
        <>
            <div className="flex flex-col items-center h-screen ">
                <Header/>
                <div className="flex flex-col items-center justify-center h-full gap-2 px-8 max-w-[400px]">
                    <div>
                        <div className = "py-2">Kindly ask the staff for the password to access the form. </div>
                        <Input className="!bg-white"
                               placeholder = "Enter password"
                               type = "password"
                               ref = {passRef}>
                        </Input>
                        <div className = " flex flex-row justify-between w-full py-2">
                            <button className={`w-full p-2.5 flex flex-row justify-center items-center ${!disableSubmit ? "bg-nav_blue" : "bg-blue-400"} cursor:pointer text-white rounded-md relative`}
                                    disabled={disableSubmit}
                                    onClick={handleSubmit}>
                                <div className="flex flex-row justify-center items-center"> 
                                    Submit
                                </div>
                                {disableSubmit && 
                                <div className="absolute left-3"><Spinner dim = {20} isDarkBg={true}/></div>}
                            </button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}