import PatientSummary from "../PatientSummary"

export default async function page({params}) {
    const { id }  = params
    let response = await fetch(`http://localhost:3000/api/patient-find?_id=${id}`)
    let patient = await response.json()

    return (
    <>
        <PatientSummary params={params}/>
    </>
    )
    
}
