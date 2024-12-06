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

  const [patients, setPatients] = useState(null);
  const [nameSearch, setNameSearch] = useState("");
  const [dentistSearch, setDentistSearch] = useState("All");
  const [dentists, setDentists] = useState([]);
  

  useEffect(() => {
      async function fetchPatientList(){
          let response = await fetch('http://localhost:3000/api/patient-record')
          let data = await response.json();
          setPatients(data)
          setDentists(["All", ...new Set(data.map((patient)=> patient.dentist))])
      }
      fetchPatientList()
  }, [])

  const getDetails = (patient) =>{
    return patient.personalInformation.firstName + " " + patient.personalInformation.lastName
  }

  if (patients == null){
    return(
        <>
            <div>Retrieving patients...</div>
        </>
    )
  }else{
    const filteredPatients = patients.filter(
      (patient) => {
        const name = getDetails(patient)
        return (name.toLowerCase().includes(nameSearch.toLowerCase())
        && (dentistSearch === "All" || patient.dentist === dentistSearch))
      }
        
    )
    return (
    
      <>
        <div className="lg:mx-20 lg:mt-10 m-4">
          {/* Search & Filters Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3">
              <h2 className="text-xl font-bold mb-4">Search & Filters</h2>

              {/* Name Search */}
              <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
                <label htmlFor="nameSearch" className="block text-md font-semibold mb-2">
                  Name
                </label>
                <input
                  id="nameSearch"
                  placeholder="Search name of patient"
                  value={nameSearch}
                  onChange={(e) => setNameSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              {/* Dentist Filter */}
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <label htmlFor="dentistFilter" className="block text-md font-semibold mb-2">
                  Dentist
                </label>
                <select
                  id="dentistFilter"
                  value={dentistSearch}
                  onChange={(e) => setDentistSearch(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white"
                >
                  {dentists.map((dentist, index) => (
                    <option key={index} value={dentist}>
                      {dentist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Records Section */}
            <div className="w-full md:w-2/3">
              <h2 className="text-xl font-bold mb-4">Patient Records</h2>
              <div className="bg-white border border-gray-300 rounded-lg lg:p-4 shadow-md">
                <Table>
                  <TableCaption>List of patients.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px] font-bold">Name</TableHead>
                      <TableHead className="w-[250px] font-bold">Concern</TableHead>
                      <TableHead className="w-[100px] font-bold">ID</TableHead>
                      <TableHead className="w-[200px] font-bold">Dentist</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <Link
                            href={`/home/patients/${patient._id}`}
                            className="underline"
                          >
                            {getDetails(patient)}
                          </Link>
                        </TableCell>
                        <TableCell>{patient.concern}</TableCell>
                        <TableCell>{patient._id.slice(-4)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">{patient.dentist}</div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4} className="text-left font-bold text-white">
                        Total patients: {filteredPatients.length}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </div>
          </div>
        </div>

      </>
    )
  }
  
}
