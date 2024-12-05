import dbConnect, { patientModel } from '../../lib/db'
import { notesModel } from '../../lib/db'
import { NextResponse } from 'next/server'

await  dbConnect();


export async function GET(request){

    
    //find all notes
    let sum = 0; 
    const patientNotes = await notesModel.find()    
    patientNotes.forEach(note => {
        
        note.procedures.forEach(procedure => {
            sum += procedure.price
        })
    })
    return NextResponse.json(sum.toFixed(2))
    
}