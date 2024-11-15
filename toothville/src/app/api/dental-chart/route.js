
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

    //refactor in the future to use cached result of getpatient 
    //get id of user 
    const { searchParams } = new URL(request.url)
    const patientID = searchParams.get('_id')

    //get updated tooth statuses
    const {toothIndex, updatedStatus} = await request.json()

    //set updated chart
    const filter = {_id: patientID}
    const update = updatedStatus
    const patient = await patientModel.findOne(filter);

    patient.dentalChart[toothIndex] = updatedStatus;

    patient.save();

    return NextResponse.json(patient)
}