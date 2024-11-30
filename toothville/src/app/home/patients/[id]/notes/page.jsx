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
    const [currDate, setDate] = useState((new Date()).toISOString().split("T")[0]);

    const [updatingIdx, setIdx] = useState(-1)
    const formRef = useRef(); 
    const dateRef = useRef(); 
    const procedureRef = useRef();
    const commentsRef = useRef(); 

    //let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
    //let patient = await response.json()
    //use shadcn form next time -> validation 

    function handleDateChange(e){
        setDate(e.target.value)
    }
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
                fetchPatientNotes(); 
                console.log('note added', result);
            }else{
                console.log('error', result);                
            }
            
        }
        catch (error){
            console.error('req failed', error);
        }
        formRef.current.reset(); 
    }

    const handleUpdate = async (index) =>  {
        if (updatingIdx == -1)
            setIdx(index)
        else{
            setIdx(-1)
        }
    }

    //should not be able to add note while current notes are not available

    function AddNote(){
        
        return (
        <>
            <div className="bg-white px-3 py-3 rounded mb-2">
                Create note
                <form ref = {formRef} className = "py-2 flex flex-col">
                    <label htmlFor="date" className = "font-semibold mb-1">Date: </label>
                    <input type="date" ref = {dateRef} value = {currDate} onChange={handleDateChange} required className = "border mb-2"/>
                    <label htmlFor="procedure" className = "font-semibold mb-1">Procedure: </label>
                    <input type="text" ref = {procedureRef} required className="border mb-1"/>
                    <label htmlFor="procedure" className = "font-semibold mb-1">Comments: </label>
                    <textarea type="text" ref = {commentsRef} required className="border mb-4 min-h-[50px]"/>

                    <button type = "submit" 
                            onClick={handleSubmit}
                            className = "bg-nav_blue py-3 rounded text-white">Add note</button>
                        
                </form>
            </div>
        </>
        )
    }
    function NoteComponent({note, index, update}){

        const {_id, procedures, date, comment} = note; 
        
        const [noteDate, setNoteDate] = useState((new Date(date)).toISOString().split("T")[0]);
        const [noteComment, setComment] = useState(comment);

        const handleReset = () =>{
            setNoteDate((new Date(date)).toISOString().split("T")[0]);
            setComment(comment);
        }
        const handleConfirm = async() =>{
            try{
                const response = await fetch(`http://localhost:3000/api/notes?_id=${_id}`, {
                    method: "PUT",
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify(
                        {
                            date: noteDate,
                            procedures: procedures,
                            comment: noteComment
                        }
                    ), 
                })
                const result = await response.json()
                if (response.ok){
                    console.log("note updated", result);
                }else{
                    console.log("error", result);
                }
            }
            catch (error){
                console.error("error", result);
            }
        }
        const handleDelete = async() => {
            try{
                const response = await fetch(`http://localhost:3000/api/notes?_id=${_id}`, {method: "DELETE"})
                const result = await response.json()
                if (response.ok){
                    console.log("note deleted: ", result)
                }else{
                    console.log("response not okay [delete] ", result);
                }
            }
            catch (error){
                console.error("error in deleting: ", error);
            }
        }
        const accordionContent = (update == true) ? 
        (<>
            <div>Date: <input type="date" value={noteDate} onChange={(e) => setNoteDate(e.target.value)}></input></div>
            <div className="flex flex-col"> Comments: &nbsp; 
                <textarea value={noteComment} onChange = {(e => setComment(e.target.value))} className="border mb-4 min-h-[80px] w-full"/>
            </div>
            <div className="flex flex-row gap-2 py-2">
                <button className="px-2 py-2 text-white bg-nav_blue rounded-md min-w-[75px]"
                            onClick={async () => {handleUpdate(index); await handleConfirm(); fetchPatientNotes();}}> Confirm </button>
                <button className="px-2 py-2 text-white bg-red-500 rounded-md min-w-[75px]"
                            onClick={handleReset}> Reset </button>
            </div>
        </>) : 
        (<>
            <div className="font-bold">Procedures performed: </div>
            {procedures.map((proc, index) => {return <div key={index}>{index+1}.) {proc.name}</div>})}
            <br />
            <div className="flex flex-col">Comments: &nbsp; 
                <textarea readOnly value={comment} className = "min-h-[80px] w-full"></textarea>
            </div>
            
            <div className="flex flex-row flex-wrap gap-2 py-2">
                <button className="px-2 py-2 text-white bg-nav_blue rounded-md min-w-[75px]"
                        onClick={() => handleUpdate(index)}> Edit </button>
                <button className="px-3 py-2 text-white bg-green-800 rounded-md min-w-[75px]">
                        View Billing</button>
                <button className="px-2 py-2 text-white bg-red-500 rounded-md min-w-[75px]"
                        onClick={async() => { await handleDelete(); fetchPatientNotes();}}> Delete</button>
            </div>
        </>)
        return(
        <>  
            <AccordionItem value={`item-${index}`} className="group border rounded-lg overflow-hidden">
                <AccordionTrigger className="px-4 group-data-[state=open]:bg-primary-foreground transition-colors">
                {new Date(date).toDateString().split(" ").slice(1).join(" ")}
                </AccordionTrigger>
                <AccordionContent className="px-4 group-data-[state=open]:bg-primary-foreground">
                   {accordionContent}
                </AccordionContent>
            </AccordionItem>
        </>
        )
    }

    const [notes, setNotes] = useState([]); 
    
    async function fetchPatientNotes(){
        let result = await fetch(`http://localhost:3000/api/notes?patientID=${id}`)
        let patientNotes = await result.json(); 
        setNotes(patientNotes); 
    }
    useEffect(() => {
        fetchPatientNotes(); 
    }, [])

    return (
    <>
        <PatientSummary params={params}/> 
        
        <div className="bg-white px-3 py-3 rounded min-h-[300px]">
            <div id="title" className = "flex flex-row gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
                <h3>Progress Notes</h3> <br />
            </div>
            <div id="notes" className = "flex flex-col gap-2 px-2 py-4 mt-2 overflow-scroll max-h-[325px]">
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {notes.map((note, index) => {
                        const isUpdating = (index == updatingIdx)
                        return(
                            <NoteComponent note = {note} 
                                           key = {index} 
                                           index = {index}
                                           update = {isUpdating}/>          
                        )
                    })}
                </Accordion>
            </div>
        </div>
        <button className = "bg-nav_blue w-full px-2 py-2 text-white rounded-sm mt-2"> Add note</button>
        
    </>
    )
}
