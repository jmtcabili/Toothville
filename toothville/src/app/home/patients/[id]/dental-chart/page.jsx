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
import { Description } from '@radix-ui/react-dialog';
  
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

    function Select({ area, toothIndex }) {
        return (
            <div className="flex items-center space-x-2 mb-1">
                <label className="w-16 font-medium">
                    {area}:
                </label>
                <select 
                    name={`select${area}-${toothIndex}`} 
                    className="max-w-[200px] border-gray-300 rounded-md p-1"
                    value={chart[toothIndex][area]} 
                    onChange={handleStatusChange(toothIndex, area)}
                >
                    {statuses.map((status, index) => {
                        return (
                            <option key={index} value={status}>
                                {status.replace(/_/g, " ")}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

    function Tooth({size, tooth}) {
        
        const isLarge = size === 'lg';
        const containerSize = isLarge ? 'h-[154px] w-[150px]' : 'h-[40px] w-[40px]';
        const topClass = isLarge ? style.largeTop : style.trapezoidTop;
        const bottomClass = isLarge ? style.largeBottom : style.trapezoidBottom;
        const leftClass = isLarge ? style.largeLeft : style.trapezoidLeft;
        const rightClass = isLarge ? style.largeRight : style.trapezoidRight;
        console.log(tooth);
        
        return (
            <div className={`${containerSize} border-2 rounded mb-2`}>
                <div className={`${topClass} border-${tooth.top}`}></div>
                <div id="mid" className={`${isLarge ? 'h-[90px]' : 'h-[24px]'} flex items-center justify-between`}>
                    <div className={`${leftClass} border-${tooth.left} ${isLarge ? 'h-[120px]' : 'h-[24px]'}`}></div>
                    <div className={`${isLarge ? 'h-[60px] w-[60px]' : 'h-[16px] w-[16px]'} border-2 rounded bg-${tooth.mid}`}></div>
                    <div className={`${rightClass} border-${tooth.right} ${isLarge ? 'h-[120px]' : 'h-[24px]'}`}></div>
                </div>
                <div className={`${bottomClass} border-${tooth.bottom}`}></div>
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
                                <DialogDescription></DialogDescription>
                                <DialogHeader>
                                <DialogTitle className = "center">Tooth {index +1}</DialogTitle>
                                    <div className="w-full flex flex-col gap-1 items-center">
                                        <div><Tooth size = {"lg"} tooth = {tooth}/></div>
                                        <div>
                                            <Select area = {"top"} toothIndex={index}/>
                                            <Select area = {"left"} toothIndex={index}/>                                       
                                            <Select area = {"mid"} toothIndex={index}/>    
                                            <Select area = {"right"} toothIndex={index}/>    
                                            <Select area = {"bottom"} toothIndex={index}/> 
                                        </div>
                                         
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

//Compile tailwind classes : 
// border-Normal
// border-Missing
// border-Decayed
// border-Impacted
// border-Supernumerary
// border-Root_Fragment
// border-Unerupted
// border-Other
// border-Extracted_due_to_Carries
// border-Extracted_due_to_Other_Causes
// border-Amalgam_Filling
// border-Composite_Filling
// border-Porcelain_Jacket_Crown
// border-Acrylic_Jacket_Crown
// border-Abutment
// border-Pontic
// border-Inlay
// border-Onlay
// border-Implant
// border-Sealants
// border-Removable
// border-Fixed_Bridge
// border-Veneer
// bg-Normal
// bg-Missing
// bg-Decayed
// bg-Impacted
// bg-Supernumerary
// bg-Root_Fragment
// bg-Unerupted
// bg-Other
// bg-Extracted_due_to_Carries
// bg-Extracted_due_to_Other_Causes
// bg-Amalgam_Filling
// bg-Composite_Filling
// bg-Porcelain_Jacket_Crown
// bg-Acrylic_Jacket_Crown
// bg-Abutment
// bg-Pontic
// bg-Inlay
// bg-Onlay
// bg-Implant
// bg-Sealants
// bg-Removable
// bg-Fixed_Bridge
// bg-Veneer