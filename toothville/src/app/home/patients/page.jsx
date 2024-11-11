'use client'

import { useState, useEffect, useRef} from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from 'next/link'


export default function PatientList() {

  const [patients, setPatients] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [dentistSearch, setDentistSearch] = useState("All");
  const [dentists, setDentists] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]); 

  useEffect(() => {
      async function fetchPatientList(){
          let response = await fetch('http://localhost:3000/api/patient-record')
          let data = await response.json();
          setPatients(data)
          setDentists(["All", ...new Set(data.map((patient)=> patient.dentist))])
      }
      fetchPatientList()
  }, [])

  

  if (patients == null){
    return(
        <>
            <div>Retrieving patients...</div>
        </>
    )
  }else{

    
    const filteredPatients = patients.filter(withinSearch)
    function withinSearch(patient){
        if (patient.name != null){
            return(patient.name.toLowerCase().includes(nameSearch.toLowerCase()) &&
            (dentistSearch === "All" || patient.dentist === dentistSearch))
        }
    }
    
    
    return (
    
      <>
        <div className="px-4 mb-2 flex flex-col gap-3 md:flex-row">
          <div id="name" className = "flex flex-row items-center border rounded border-1 bg-gray-200 max-w-max">
            <div className="w-[75px] px-1">Name: </div>
            <input 
              placeholder='Search name of patient'
              value = {nameSearch}
              onChange = {(e) => setNameSearch(e.target.value)}
              className='py-1 px-2 min-w-[70px] rounded-r focus:outline-none focus:ring-2 focus: ring-blue-300'/>
          </div>
          <div id="name" className = "flex flex-row items-center border rounded border-1 bg-gray-200 max-w-max">
            <div className="w-[75px] px-1">Dentist: </div>
            <select
              value = {dentistSearch}
              onChange={(e) => {setDentistSearch(e.target.value)}}
              className='py-1 px-2 min-w-[70px] rounded-r focus:outline-none focus:ring-2 focus: ring-blue-300'>
              {dentists.map((dentist, index) =>{
                return (<option value = {dentist}>{dentist}</option>)
              })}
            </select>
          </div>
            
        </div>
        <Table>
        <TableCaption>List of patients.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Name</TableHead>
            <TableHead className="w-[250px]">Concern</TableHead>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead className="w-[200px]">Dentist</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPatients.map((patient, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                  <Link href = {`/home/patients/${patient._id}`}
                        className = "underline">
                      {patient.name}
                  </Link>
              </TableCell>
              <TableCell>{patient.concern}</TableCell>
              <TableCell>{patient._id.slice(-4)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {patient.dentist}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-left">Total patients: {filteredPatients.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </>
    )
  }
  
}
