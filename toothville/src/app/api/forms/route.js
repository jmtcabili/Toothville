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

    return new Response(JSON.stringify(patient), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching patient data:', error);

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

      // Ensure dob is a valid ISO date string before updating
      if (updatedData.personalInformation?.dob) {
          const dob = new Date(updatedData.personalInformation.dob);
          if (isNaN(dob.getTime())) {
              return new Response(JSON.stringify({ error: 'Invalid date format for dob' }), {
                  status: 400,
                  headers: { 'Content-Type': 'application/json' },
              });
          }
      }

      const updatedPatient = await patientModel.findByIdAndUpdate(
          new ObjectId(patientId),
          { $set: updatedData }, // Use $set to update only provided fields
          { new: true } // Return the updated document
      );

      if (!updatedPatient) {
          return new Response(JSON.stringify({ error: 'Patient not found' }), {
              status: 404,
              headers: { 'Content-Type': 'application/json' },
          });
      }

      return new Response(
          JSON.stringify({ updatedPatient }), // Return the updated patient document
          {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
          }
      );
  } catch (error) {
      console.error('Error updating patient data:', error);

      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  }
}

