'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const user = {
  "name": "Dr. Michelle Lajara",
  "type": "Dentist"
}

function Profile(){
  return(
  <>
    <div className="flex flex-row gap-x-2 justify-start items-center bg-white py-4 px-4 w-5/6 rounded-lg max-h-[200px]">
      <img
        src="/path-to-your-image.jpg"
        alt="Profile Picture"
        className="w-20 h-20 rounded-full border-4 border-nav_blue object-cover"
      />
      <div className="bg-black h-full min-h-[70px] w-[2px]"></div>
      <div id="details" className="flex flex-col justify-center items-left">
        <div className="font-bold text-xl">{user.name}</div>
        <div id="usertype" className="font-extralight">{user.type}</div>
      </div>
    </div>
      
    </>
  )
}

function Appointments(){
  
}



export default function Dashboard() {
  return (
    <>

        <div className="flex flex-col gap-y-2 justify-start items-center py-6">
            <Profile/>
          <div id="appointments">
            <Appointments/>
          </div>     
        </div>
           
    </>
  )
}
