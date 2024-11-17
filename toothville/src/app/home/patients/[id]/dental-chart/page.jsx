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
    const [chart, setChart] = useState([]); 
    const [filteredTeeth, setFilteredTeeth] = useState([])
    const [selectedFilters, setSelectedFilters] = useState([])


    useEffect(() => {
        async function fetchChart(){
            let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
            let patient = await response.json()   
            setChart(patient.dentalChart)
            setFilteredTeeth(patient.dentalChart)
        }
        fetchChart()
    }, [])

    const handleStatusChange = (index, area) => async(e) => {
        //e.target.val -> new 
        console.log(e.target.value);
        let newChart = [...chart]
        newChart[index][area] = e.target.value
        
        setChart(newChart)
        try{
            let response = await fetch (`http://localhost:3000/api/dental-chart?_id=${id}`, {
                method: "PUT",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(
                    {
                        toothIndex: index, 
                        updatedStatus: newChart[index]
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
    return (
    <>
        {chart.length > 0 ? 
            <>
            <div className="flex flex-row items-center justify-between mb-3">
                <h2 className='font-bold'>Dental Chart</h2>
                <div id="filter"><FilterButton selectedFilters={selectedFilters} 
                                            setSelectedFilters={setSelectedFilters}
                                            chart = {chart}
                                            setFilteredTeeth = {setFilteredTeeth}/>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-end gap-1">
            {(filteredTeeth.map((tooth, index) => {
                return(
                <div key = {index}>
                    <Dialog>
                        <DialogTrigger>
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
            }))}
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