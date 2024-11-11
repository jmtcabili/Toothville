'use client'

//next imports
import Link from 'next/link';
import Image from 'next/image'; 

//chart imports
import { Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import styles from './home.module.css'


const chartConfig = {
  patients: {
    label: "patients",
    color: "#60a5fa",
  },
} 

const user = {
  "name": "Dr. Michelle Lajara",
  "type": "Dentist"
}

const chartData = [
  { "day": "Monday", "patients": 23 },
  { "day": "Tuesday", "patients": 19 },
  { "day": "Wednesday", "patients": 27 },
  { "day": "Thursday", "patients": 22 },
  { "day": "Friday", "patients": 25 },
  { "day": "Saturday", "patients": 30 },
  { "day": "Sunday", "patients": 15 }
]

function Chart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[150px] h-1/2 md:min-h-[300px] w-5/6">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={true}/>
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="patients" fill="var(--color-patients)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}


function Profile(){
  return(
  <>
    <div className={styles.profileContainer}>
      {/* Profile Picture */}
      <img
        src="/assets/defaultpfp.webp"
        alt="Profile Picture"
        className={styles.profilePicture}
        width={80}
        height={80}
      />
      <div className={styles.divider}></div>

      {/* User Details */}
      <div id="details" className={styles.details}>
        <div className={styles.userName}>{user.name}</div>
        <div className={styles.userType}>{user.type}</div>
      </div>
    </div>
      
    </>
  )
}

function Actions(){
  return (
    <>
        <div className="grid grid-cols-2 rounded-full w-full">
            <div className="col-span-2">
                <div id = "action1" className="flex flex-row gap-x-2 justify-center gap-2 items-center bg-white py-4 px-2 w-full rounded-t-lg min-h-[100px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <div id="details" className="flex flex-col justify-center items-left">
                        <Link href = "/home/see-patient" className='font-bold'>See Patient</Link>
                    </div>
                </div>
            </div>
            <div id = "action2" className="">
                <div className="flex flex-row gap-x-2 justify-start items-center bg-nav_blue py-6 px-2 w-full rounded-bl-lg max-h-[200px]">
                    <div id="details" className="flex flex-col justify-center items-left">
                        <div className="font-bold text-white">
                            <Link href='/home/patients'>View patients</Link>
                        </div>
                        <div id="usertype" className="font-extralight"></div>
                    </div>
                </div>
            </div>

          
          <div id = "action3" className="">
          <div className="flex flex-row gap-x-2 justify-start items-center bg-blue-200 py-6 px-2 w-full rounded-br-lg max-h-[200px]">
              <div id="details" className="flex flex-col justify-center items-left">
                <div className="font-bold text-black">Notify patient</div>
                <div id="usertype" className="font-extralight"></div>
              </div>
            </div>
          </div>
        </div>    
    </>
  )
  
}



export default function Dashboard() {
  return (
    <>
<div className={styles.dashboard}>
      <h1 className={styles.dashboardHeader}>Dashboard</h1>
      
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <h2>Good Morning, {user.name}</h2>
      </div>
  {/* <Profile /> */}
      <hr />
      <div> 
        <h2 className="font-medium py-2 mb-2 text-align-center w-full">WEEKLY PATIENT COUNT</h2>
        <div id="chart" className="mb-2">
          <Chart />
        </div>
      </div>
      <Actions />
    </div>           
    </>
  )
}
