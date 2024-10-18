'use client'

import { useState, useEffect } from 'react'
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
    useEffect(() => {
        async function fetchPatientList(){
            let response = await fetch('http://localhost:3000/api/patient-record')
            let data = await response.json();
            setPatients(data)
        }
        fetchPatientList()
    }, [])

  if (patients == null){
    return(
        <>
            <div>Retrieving patients...</div>
        </>
    )
  }
  return (
    <>
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
        {patients.map((patient, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
                <Link href = {`/home/patients/${patient._id}`}>
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
          <TableCell colSpan={4} className="text-left">Total patients: {patients.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </>
  )
}
