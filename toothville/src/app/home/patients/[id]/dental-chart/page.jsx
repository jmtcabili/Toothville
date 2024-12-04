'use client'


import {useState, useEffect} from 'react'
import Tooth from "./Tooth"
import FilterButton from "./FilterButton"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Filter } from 'lucide-react'
  
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



export default function dentalChart({params}) {

    const { id } = params
    const [chart, setChart] = useState({
        Upper_Right: [],
        Upper_Left: [],
        Lower_Right: [],
        Lower_Left: [], 
    }); 
    
    const [selectedFilters, setSelectedFilters] = useState(["Upper_Right", "Upper_Left", "Lower_Right", "Lower_Left"])
    const [toothDialogNum, setToothDialogNum] = useState(null)
    
    
    useEffect(() => {
        async function fetchChart(){
            let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
            let patient = await response.json()   
            setChart(patient.dentalChart)
        }
        fetchChart()
    }, [])

  
    const handleStatusChange = (index, area, region) => async(e) => {
        //index -> index of tooth in area
        //area -> area of tooth (field of dental chart) [string]
        //region -> region of tooth updated (i.e. top, left, right, mid, bottom) [string]
        //e.target.val -> new status

        //update chart with new status
        let updatedChart = {...chart}
        updatedChart[area][index][region] = e.target.value //set status in copy of chart
        setChart(updatedChart) //updateState
        
         
        try{
            let response = await fetch (`http://localhost:3000/api/dental-chart?_id=${id}`, {
                method: "PUT",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(
                    {
                        updatedTooth: updatedChart[area][index],
                        area: area, 
                        toothIdx: index,
                    }
                )
            })
            const result = await response.json()
            if (response.ok){
                console.log("Tooth updated");
            }else{
                console.log("error: ", result);
            }
        }catch(error){
            console.error("error: ", error)
        }
    }

    function Select({ region, toothIndex, area}) {
        return (
            <div className="flex items-center space-x-2 mb-1">
                <span className="w-16 font-medium">
                    {region}:
                </span>
                <select 
                    name={`select${region}-${toothIndex}`} 
                    className="max-w-[200px] border-gray-300 rounded-md p-1"
                    value={chart[area][toothIndex][region]} 
                    onChange={handleStatusChange(toothIndex, area, region)}
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

    function TeethDisplay({ area }) {
        //area -> string
        let row1, row2 = []
        let offset = 0
        let justify = "justify-end"
        if (area.split("_")[0]==="Upper"){
            row1 = chart[area].slice(0, 5)
            row2 = chart[area].slice(5)
            offset = 5
        }else{
            row1 = chart[area].slice(0, 8)
            row2 = chart[area].slice(8)
            offset = 8
        }
        if (area.split("_")[1]==="Left"){
            justify = "justify-start"
        }
        return(
            <>
            {(row1 == null || row2 == null) ? <>Loading...</> : 
            <>
                <h2 className = "font-bold text-gray-400">{area.replace("_", " ")}</h2>
                <div className={`flex flex-row flex-wrap ${justify} gap-0.5 sm:gap-4`}>
                    {row1.map((tooth, index) => {
                        return(
                        <div key = {index}>
                            <Dialog
                                open={toothDialogNum === tooth.toothNum}
                                onOpenChange={(open) => setToothDialogNum(open ? tooth.toothNum : null)}
                                >
                                <DialogTrigger asChild className = "hover: cursor-pointer">
                                    <div className = "flex flex-col items-center" >
                                        {tooth.toothNum}
                                        <Tooth size = {"sm"} tooth = {tooth}/>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className = "sm:max-w-[350px] bg-gradient-to-br from-white to-gray-100">
                                    <DialogDescription></DialogDescription>
                                    <DialogHeader>
                                    <DialogTitle className = "center">Tooth {tooth.toothNum}</DialogTitle>
                                        <div className="w-full flex flex-col gap-1 items-center">
                                            <div><Tooth size = {"lg"} tooth = {tooth}/></div>
                                            <div>
                                                <Select region = {"top"} toothIndex={index} area={area}/>
                                                <Select region = {"left"} toothIndex={index} area={area}/>                                       
                                                <Select region = {"mid"} toothIndex={index} area={area}/>    
                                                <Select region = {"right"} toothIndex={index} area={area}/>    
                                                <Select region = {"bottom"} toothIndex={index} area={area}/> 
                                            </div>
                                                
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        )
                    })}
                </div>
                <div className={`flex flex-row flex-wrap ${justify} gap-0.5`}>
                    {row2.map((tooth, index) => {
                        return(
                        <div key = {index}>
                            <Dialog
                                open={toothDialogNum === tooth.toothNum}
                                onOpenChange={(open) => setToothDialogNum(open ? tooth.toothNum : null)}
                                >
                                <DialogTrigger asChild className = "hover: cursor-pointer">
                                    <div className = "flex flex-col items-center" >
                                        {tooth.toothNum}
                                        <Tooth size = {"sm"} tooth = {tooth}/>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className = "sm:max-w-[350px] bg-gradient-to-br from-white to-gray-100">
                                    <DialogDescription></DialogDescription>
                                    <DialogHeader>
                                    <DialogTitle className = "center">Tooth {tooth.toothNum}</DialogTitle>
                                        <div className="w-full flex flex-col gap-1 items-center">
                                            <div><Tooth size = {"lg"} tooth = {tooth}/></div>
                                            <div>
                                                <Select region = {"top"} toothIndex={index+offset} area={area}/>
                                                <Select region = {"left"} toothIndex={index+offset} area={area}/>                                       
                                                <Select region = {"mid"} toothIndex={index+offset} area={area}/>    
                                                <Select region = {"right"} toothIndex={index+offset} area={area}/>    
                                                <Select region = {"bottom"} toothIndex={index+offset} area={area}/> 
                                            </div>
                                                
                                        </div>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                        )
                    })}
                </div>
                <hr />
            </>
            }
            </>
        )
    }


    return (
    <>
        {chart != null ? 
            <>
            <div className="flex flex-row items-center justify-between mb-3">
                <h2 className='font-bold'>Dental Chart</h2>
                <div id="filter"><FilterButton selectedFilters={selectedFilters} 
                                            setSelectedFilters={setSelectedFilters}
                                            chart = {chart}/>
                </div>
            </div>
            
            <div className="flex flex-col flex-wrap justify-end gap-2">
                {selectedFilters.map((area, index) => {
                    return(
                        <div key = {index}>
                            <TeethDisplay area = {area}/>
                        </div>
                    )
                })}
            </div>
            </>
        : 
        (<>Loading chart...</>)}
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