'use client'


import {useState, useEffect} from 'react'
import Image from 'next/image';
import style from './style.module.css'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  
  const statuses = [
    "Normal",
    "Missing",
    "Decayed",
    "Impacted",
    "Supernumerary",
    "Root_Fragment",
    "Unerupted",
    "Other",
    "Extracted_due_to_Carries",
    "Extracted_due_to_Other_Causes",
    "Amalgam_Filling",
    "Composite_Filling",
    "Porcelain_Jacket_Crown",
    "Acrylic_Jacket_Crown",
    "Abutment",
    "Pontic",
    "Inlay",
    "Onlay",
    "Implant",
    "Sealants",
    "Removable",
    "Fixed_Bridge",
    "Veneer"
];

function handleClick(){
    console.log("clicked");
    
}


export default function dentalChart({params}) {

    const { id } = params
    const [chart, setChart] = useState([]); 
    
    useEffect(() => {
        async function fetchChart(){
            let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
            let patient = await response.json()   
            setChart(patient.dentalChart)
        }
        fetchChart()
    }, [])

    const handleStatusChange = (index, area) => e => {
        //e.target.val -> new 
        console.log(e.target.value);
        let newChart = [...chart]
        newChart[index][area] = e.target.value
        
        setChart(newChart)
    }

    function Select({area, toothIndex}){
        return(
        <>
            <span>
            {area}: 
            <select name="top" id="top" className = "max-w-[200px]" value = {chart[toothIndex][area]} onChange = {handleStatusChange(toothIndex, area)}>
                {statuses.map((status, index) => {
                    return (
                        <option key = {index} value = {status}>
                            {status.replace(/_/g, " ")}
                        </option>
                    )
                })}
            </select>
            </span>
        </>
        )
    }

    function Tooth({size, tooth}) {
        
        const isLarge = size === 'lg';
        const containerSize = isLarge ? 'h-[154px] w-[150px]' : 'h-[40px] w-[40px]';
        const topClass = isLarge ? style.largeTop : style.trapezoidTop;
        const bottomClass = isLarge ? style.largeBottom : style.trapezoidBottom;
        const leftClass = isLarge ? style.largeLeft : style.trapezoidLeft;
        const rightClass = isLarge ? style.largeRight : style.trapezoidRight;
        const topColor = tooth.top
        const leftColor = statuses[tooth.left]
        const midColor = statuses[tooth.mid]
        const rightColor = statuses[tooth.right]
        const bottomColor = statuses[tooth.bottom]
        
        
        return (
            <div className={`${containerSize} border-2 rounded mb-2`}>
                <div className={`${topClass} border-${topColor}`}></div>
                <div id="mid" className={`${isLarge ? 'h-[90px]' : 'h-[24px]'} flex items-center justify-between`}>
                    <div className={`${leftClass} ${leftColor} ${isLarge ? 'h-[120px]' : 'h-[24px]'}`}></div>
                    <div className={`${isLarge ? 'h-[60px] w-[60px]' : 'h-[16px] w-[16px]'} border rounded bg-gray-500`}></div>
                    <div className={`${rightClass} ${rightColor} ${isLarge ? 'h-[120px]' : 'h-[24px]'}`}></div>
                </div>
                <div className={`${bottomClass} ${bottomColor}`}></div>
            </div>
        );
    }

    return (
    <>
        <div className="flex flex-wrap flex-row gap-1">
            {chart.length > 0 ? (chart.map((tooth, index) => {
                return (
                    <div key = {index}>
                        <Dialog>
                            <DialogTrigger>
                                <div className = "flex flex-col items-center" >
                                    {index+1}
                                    <Tooth size = {"sm"} tooth = {tooth}/>
                                </div>
                            </DialogTrigger>
                            <DialogContent className = "sm:max-w-[350px] bg-gradient-to-br from-white to-gray-100">
                                <DialogHeader>
                                <DialogTitle>Tooth {index +1}</DialogTitle>
                                    <div className="w-full flex flex-col items-center">
                                        <Tooth size = {"lg"} tooth = {tooth}/>
                                        <Select area = {"top"} toothIndex={index}/>
                                        <Select area = {"left"} toothIndex={index}/>                                       
                                        <Select area = {"mid"} toothIndex={index}/>    
                                        <Select area = {"right"} toothIndex={index}/>    
                                        <Select area = {"bottom"} toothIndex={index}/>    
                                    </div>
                                </DialogHeader>
                        </DialogContent>
                        </Dialog>
                    </div>
                )
            })) : (<>Loading chart...</>)}
        </div>
        
    </>
    )
}
