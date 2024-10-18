import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"




export default async function PatientList() {

  let patients =[]
  try{
    const response = await fetch('http://localhost:3000/api/patient-record')
    patients = await response.json()
    console.log(patients)
  }catch{
    console.error('Failed to fetch patients:', error)
  }
  
  return (
    <>
      <Table>
      <TableCaption>List of upcoming dental appointments.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Name</TableHead>
          <TableHead className="w-[250px]">Concern</TableHead>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead className="w-[200px]">Dentist</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell className="font-medium">{appointment.name}</TableCell>
            <TableCell>
              
            </TableCell>
            <TableCell>sdv</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {appointment.dentist}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4} className="text-right">Total Appointments: {patients.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </>
  )
}
