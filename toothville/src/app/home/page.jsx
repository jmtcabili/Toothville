'use client'

//next imports
import Link from 'next/link';
import Image from 'next/image'; 
import React, {useState, useEffect} from "react"

//chart imports
import { Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import { UsersIcon, UserPlusIcon, BanknotesIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'
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

function StatCard({ title, count, iconBgColor, icon: Icon }) {
  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white w-full md:w-1/4 lg:w-[23%] mx-0 mb-4 md:mb-0">
      <div className="flex justify-between items-center p-4">
        <h3 className="text-gray-700 font-semibold">{title}</h3>
        <span className={`p-2 rounded-lg ${iconBgColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </span>
      </div>
      <h4 className="text-2xl font-bold mt-2 px-4 pb-4">{count}</h4>

      <div className={`w-full h-1 rounded-b-lg ${iconBgColor}`}></div>
    </div>
  );
}

function Chart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-auto">
      <h2 className="text-2xl font-semibold py-2 mb-2 text-center">WEEKLY PATIENT COUNT</h2>
      <ChartContainer config={chartConfig} className="min-h-[150px] h-1/2 md:min-h-[300px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={true} />
          <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
          <YAxis tickLine={false} tickMargin={10} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="patients" fill="var(--color-patients)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
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
        <div className="grid grid-cols-2 w-full rounded-lg shadow-lg mt-2 gap-2 px-2 py-4 mb-2">
            
            <div className="col-span-2">
              <div id = "action1" className="flex flex-row gap-x-2 justify-center gap-2 items-center bg-blue-500 text-white text-xl py-4 px-2 w-full rounded min-h-[75px]">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <div id="details" className="flex flex-col justify-center">
                      <Link href = "../form/personal-information" className='font-bold'>Add Patient</Link>
                  </div>
              </div>
            </div>
            
        
            <div id = "action2" className="">
                <div className="flex flex-col gap-x-2 justify-center items-center bg-nav_blue py-6 px-2 w-full h-20 rounded">
                    <div id="details" className="flex flex-col">
                        <div className="font-bold text-sm text-white">
                            <Link href='/home/patients'>View patients</Link>
                        </div>
                    </div>
                </div>
            </div>

          
          <div id = "action3" className="">
          <div className="flex flex-row gap-x-2 justify-center items-center bg-nav_blue py-6 px-2 h-20 w-full rounded">
              <div id="details" className="flex flex-col">
                <div className="font-bold text-white text-sm text-center">
                    <Link href = "/home/procedures">Manage Procedures</Link>
                </div>
              </div>
            </div>
          </div>
        </div>    
    </>
  )
  
}



export default function Dashboard() {

  const [numPatients, setNumPatients] = React.useState(0);
  const [earnings, setEarnings] = React.useState(0);

  const getPatients = async() =>{
    const res_patients = await fetch('http://localhost:3000/api/patient-record')
    const patients = await res_patients.json()

    const res_earnings = await fetch('http://localhost:3000/api/all-notes')
    const earning = await res_earnings.json()
    setNumPatients(patients.length)
    setEarnings(earning)
  }

  useEffect(() => {
    getPatients()
  }, [])
  return (
    <>
      <div className={styles.dashboard}>
        <h1 className={styles.dashboardHeader}>Dashboard</h1>

        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h2>Good Morning, Dr. Michelle Lajara</h2>
          <p className={styles.subText}>Today is Tuesday, November 12, 2024.</p>
          <button className={styles.appointmentsButton}>See Today's Appointments</button>
        </div>

        {/* Stat Cards */}
        <div className="flex flex-wrap justify-between gap-1">
          <StatCard 
            title="Total Patients" 
            count={numPatients} 
            iconBgColor="bg-blue-400" 
            icon={UsersIcon} 
          />
          <StatCard 
            title="New Patients" 
            count=""
            iconBgColor="bg-yellow-400" 
            icon={UserPlusIcon} 
          />
          <StatCard
            title="Earnings"
            count={`₱${earnings}`} 
            iconBgColor="bg-green-400"
            icon={BanknotesIcon}
          />
        </div>

        <Actions/>
      </div>    
    </>
  )
}
