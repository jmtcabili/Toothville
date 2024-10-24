import dbConnect from '../../lib/db'
import { notesModel } from '../../lib/db'
import { NextResponse } from 'next/server'

export async function POST(request){
    const {patientID, date, procedureName, comment} = await request.json(); 

    const tempPatientNote = new notesModel({
        patientID: patientID, 
        date: date, 
        procedureName: procedureName, 
        comment: comment
    }); 

    await tempPatientNote.save(); 

    return NextResponse.json({message: "note created"}); 
}

export async function GET(request){
    //get id of user
    const { searchParams } = new URL(request.url)
    const patientID = searchParams.get('patientID')
    
    //find list of based on id
    const patientNotes = await notesModel.find({patientID: patientID})
    return NextResponse.json(patientNotes)
    
}