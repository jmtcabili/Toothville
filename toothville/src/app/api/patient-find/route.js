import  dbConnect  from '../../lib/db'
import { patientModel } from '../../lib/db';
import { NextResponse } from 'next/server'

await dbConnect();

export async function GET(request) {

    //get id of user
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('_id')
    
    //find user based on id
    const patient = await patientModel.findOne({_id: id})

    return NextResponse.json(patient)
}