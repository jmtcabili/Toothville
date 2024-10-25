'use client'

//next imports
import Link from 'next/link';
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
          ickLine={false}
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
            <div id = "action1" className="flex flex-row gap-x-2 justify-evenly items-center bg-white py-4 px-2 w-full rounded-t-lg max-h-[200px]">
              <img
                src="/path-to-your-image.jpg"
                alt="icon"
                className="w-20 h-20 rounded-full border-4 border-nav_blue object-cover"
              />
              <div id="details" className="flex flex-col justify-center items-left">
                <div className="font-bold ">See Patient</div>
                <div id="usertype" className="font-extralight"></div>
              </div>
            </div>
          </div>
          <div id = "action2" className="">
            <div className="flex flex-row gap-x-2 justify-start items-center bg-nav_blue py-6 px-2 w-full rounded-bl-lg max-h-[200px]">
              <div id="details" className="flex flex-col justify-center items-left">
                <div className="font-bold text-white">
                  <Link href='/home/patients'>View patients</Link></div>
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
        <p className={styles.subText}>You have no appointments today</p>
        <button className={styles.appointmentsButton}>See Today's Appointments</button>
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
