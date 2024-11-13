
import  dbConnect  from '../../lib/db'
import { patientModel } from '../../lib/db';
import { NextResponse } from 'next/server'

export async function GET(request){
    //get id of user 
    const { searchParams } = new URL(request.url)
    const patientID = searchParams.get('_id')

    //find patient record
    const patient = await patientModel.findOne({_id: patientID})

    return NextResponse.json(patient.dentalChart)
}

export async function PUT(request){

    //get id of user 
    const { searchParams } = new URL(request.url)
    const patientID = searchParams.get('_id')

    //find patient record
    const patient = await patientModel.findOne({_id: patientID})

    //get updated chart
    const updatedChart = await request.json();

    //set updated chart
    patient.dentalChart = updatedChart; 

    patient.save();

    return NextResponse.json(patient)
}