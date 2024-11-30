import dbConnect, { patientModel } from '../../lib/db'
import { notesModel } from '../../lib/db'
import { NextResponse } from 'next/server'

await  dbConnect();

export async function POST(request){
    const {patientID, date, procedures, comment} = await request.json(); 

    //procedure -> object of procedureSchema
    
    
    const tempPatientNote = new notesModel({
        patientID: patientID, 
        date: date, 
        procedures: procedures, 
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


    const {date, procedures, comment} = await request.json(); 
    console.log(date);
    
    //get node id 
    const {searchParams} = new URL(request.url)
    const noteID = searchParams.get("_id")

    const currNote = await notesModel.findById(noteID);

    currNote.date = date; 
    currNote.procedures = procedures;
    currNote.comment = comment;

    //await currNote.save(); 

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

