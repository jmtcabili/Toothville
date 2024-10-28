import dbConnect, { patientModel } from '../../lib/db'
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

export async function PUT(request){


    const {date, procedureName, comment} = await request.json(); 

    //get node id 
    const {searchParams} = new URL(request.url)
    const noteID = searchParams.get("_id")

    const currNote = await notesModel.findById(noteID);

    currNote.date = date; 
    currNote.procedureName = procedureName;
    currNote.comment = comment;

    await currNote.save(); 

    return NextResponse.json({message: "note updated"}); 
}

export async function DELETE(request){

    //get node id 
    const {searchParams} = new URL(request.url)
    const noteID = searchParams.get("_id")

    //delete user 
    await notesModel.deleteOne({'_id': noteID})

    return NextResponse.json({message: "note deleted"})

}

