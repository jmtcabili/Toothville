'use client'
import PatientSummary from "../PatientSummary"
import {useState, useEffect, useRef} from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

export default function page({params}) {
    const { id }  = params
    const dateRef = useRef(); 
    const procedureRef = useRef();
    const commentsRef = useRef(); 

    //let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
    //let patient = await response.json()
    //use shadcn form next time -> validation 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const formData = {
            patientID: id, 
            date: dateRef.current.value, 
            procedureName: procedureRef.current.value, 
            comment: commentsRef.current.value
        }

        try{
            const response = await fetch("http://localhost:3000/api/notes",{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData), 

            }); 
            const result = await response.json(); 
            if (response.ok){
                console.log('note added', result);
            }else{
                console.log('error', result);                
            }
            
        }
        catch (error){
            console.error('req failed', error);
        }
    }

    function AddNote(){
        
        return (
        <>
            <div className="bg-white px-3 py-3 rounded mb-2">
                Create note
                <form  className = "py-2 flex flex-col">
                    <label htmlFor="date" className = "font-semibold mb-1">Date: </label>
                    <input type="date" ref = {dateRef} required className = "border mb-2"/>
                    <label htmlFor="procedure" className = "font-semibold mb-1">Procedure: </label>
                    <input type="text" ref = {procedureRef} required className="border mb-1"/>
                    <label htmlFor="procedure" className = "font-semibold mb-1">Comments: </label>
                    <input type="text" ref = {commentsRef} required className="border mb-4 min-h-[50px]"/>

                    <button type = "submit" 
                            onClick={handleSubmit}
                            className = "bg-nav_blue py-3 rounded text-white">Add note</button>
                </form>
            </div>
        </>
        )
    }
    function NoteComponent({note, index}){
        const {procedureName, date, comment} = note; 
        return(
        <>  
            <AccordionItem value={`item-${index}`} className="group border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 group-data-[state=open]:bg-primary-foreground transition-colors">
                {procedureName}
                </AccordionTrigger>
                <AccordionContent className="px-4 group-data-[state=open]:bg-primary-foreground">
                <div>Date: {date}</div>
                <div>Comments: {comment}</div>
                </AccordionContent>
            </AccordionItem>
        </>
        )
    }

    const [notes, setNotes] = useState([]); 

    useEffect(() => {
        async function fetchPatientNotes(){
            let result = await fetch(`http://localhost:3000/api/notes?patientID=${id}`)
            let patientNotes = await result.json(); 
            setNotes(patientNotes); 
        }
        fetchPatientNotes(); 
    }, [])

    return (
    <>
        <PatientSummary params={params}/>
        <AddNote/>  
        <div className="bg-white px-3 py-3 rounded min-h-[300px]">
            <div id="title" className = "flex flex-row gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
                <h3>Progress Notes</h3>
            </div>
            <div id="notes" className = "flex flex-col gap-2 px-2 py-4">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {notes.map((note, index) => {
                        return(
                            <NoteComponent note = {note} key = {index} index = {index}></NoteComponent>
                        )
                    })}
                </Accordion>
            </div>
        </div>
    </>
    )
}
