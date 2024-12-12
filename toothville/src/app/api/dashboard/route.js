import  dbConnect  from '../../lib/db'
import { patientModel, notesModel } from '../../lib/db';

import { NextResponse } from 'next/server'

await dbConnect();  

export async function GET(){

    let allCount = await patientModel.countDocuments();
    let endDate = new Date(); //date today
    let month = endDate.getMonth();
    let year = endDate.getFullYear();
    let startDate = new Date(year, month, endDate.getDay()-7)
    let sum = 0; 
    const filter = {
        dateRecorded: {
            $lte: endDate,
            $gte: startDate,
        }
    }

    const patientNotes = await notesModel.find().lean()
    patientNotes.forEach(note => {
        if (note.procedures != null){
            note.procedures.forEach(procedure => {
                sum += procedure.price
            })
        }
    })
    sum = sum.toFixed(2)

    try{
        const patients = await patientModel.find(filter);
        const newCount = patients.length;
        return NextResponse.json({allCount: allCount, newCount: newCount, earnings: sum});
    }catch (err){
        console.log(err);        
    }
}