import dbConnect, { patientModel } from '../../lib/db'
import { notesModel } from '../../lib/db'
import { NextResponse } from 'next/server'

await  dbConnect();
export async function PUT(request){


    const {procedures} = await request.json(); 
    
    //get node id 
    const {searchParams} = new URL(request.url)
    const noteID = searchParams.get("_id")

    const currNote = await notesModel.findById(noteID);

    currNote.procedures = procedures;

    await currNote.save(); 

    return NextResponse.json({message: "note updated", currNote: currNote}); 
}
