import dbConnect from '../../lib/db';
import { patientModel } from '../../lib/db';
import { ObjectId } from 'mongodb';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('_id');

    if (!patientId) {
      return new Response(JSON.stringify({ error: 'Patient ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await dbConnect();

    const patient = await patientModel.findById(new ObjectId(patientId));

    if (!patient) {
      return new Response(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ medicalHistory: patient.medicalHistory }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error fetching medical history:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PUT(req) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('_id');
    const updatedData = await req.json();

    if (!patientId) {
      return new Response(JSON.stringify({ error: 'Patient ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await dbConnect();

    // Validate and sanitize updatedData here if needed
    const updatedPatient = await patientModel.findByIdAndUpdate(
      new ObjectId(patientId),
      { medicalHistory: updatedData },
      { new: true }
    );

    if (!updatedPatient) {
      return new Response(JSON.stringify({ error: 'Patient not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(
      JSON.stringify({ medicalHistory: updatedPatient.medicalHistory }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error updating medical history:', error);

    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
