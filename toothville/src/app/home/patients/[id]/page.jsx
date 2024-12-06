
import PatientSummary from './PatientSummary'
import Link from 'next/link'


export default async function PatientDetails({params}){
    const { id }  = params
    const path = `/home/patients/${id}`
  
    let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
    let patient = await response.json()

    const getAge = (patient) => {
        const diff_ms = Date.now() - new Date(patient.personalInformation.dob); 
        const age_dt = new Date(diff_ms);
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    return (
    <>
    <div className='flex justify-center items-center min-h-screen lg:mx-20 lg:mt-10'>
        <div className='w-full'>
        <PatientSummary params = {params}></PatientSummary>
        <div id="bio" className='bg-white px-3 py-3 mb-4 rounded'>
            <h2 className='font-bold mb-2'>Bio</h2>
            <div id="bio-info" className='font-light '>
                <span>{getAge(patient)}</span><br />
                Born on {new Date(patient.personalInformation.dob).toISOString().split("T")[0]} <br />
                {patient.contactInformation.homePhone} <br />
                {patient.contactInformation.email}
            </div>
            <div className="w-full text-right">
                More
            </div>
        </div>
        <div id="patient-actions" className = "px-3 bg-white mb-2 rounded">
            
            <div id = "appointments" className="flex flex-row justify-start gap-2 py-4 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <Link className='underline' href = {`${path}/history`}>Medical & Dental History</Link>
            </div>
            <div id = "appointments" className="flex flex-row justify-start gap-2 py-4 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                    </svg>
                    <Link className = "underline" href = {`${path}/notes`}>Procedures</Link>
            </div>
            <div id = "appointments" className="flex flex-row justify-start gap-2 py-4 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                    </svg>
                    <Link className = "underline" href = {`${path}/dental-chart`}>Dental Chart</Link>
            </div>
            <div id = "appointments" className="flex flex-row justify-start gap-2 py-4 border-b border-gray-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                    </svg>
                    Photos
            </div>
            <div id = "appointments" className="flex flex-row justify-start gap-2 py-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                    </svg>
                    <Link className = "underline" href = {`${path}/forms`}>Forms</Link>
            </div>
        </div>
        </div>
        </div>
    
    </>
    )
}
