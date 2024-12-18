'use client'

//next imports
import Link from 'next/link';
import React, {useState, useEffect} from "react"
import Spinner from "@/components/ui/spinner"
import { UserRoundPlus, NotebookTabs, Settings} from 'lucide-react'


//chart imports
import { Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts"
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import { UsersIcon, UserPlusIcon, BanknotesIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'
import styles from './home.module.css'
import { BASE_URL } from '@/utils/constants';


const chartConfig = {
  patients: {
    label: "patients",
    color: "#60a5fa",
  },
} 





function StatCard({ title, count, iconBgColor, icon: Icon }) {
  return (
    <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white w-full md:w-1/4 lg:w-[26%] mx-0 mb-4 md:mb-0">
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
    <div className="w-full flex flex-wrap justify-center">
        <div className="grid grid-cols-2 lg:w-10/12 w-full rounded-lg shadow-lg lg:mt-6  mt-4 gap-2 px-4 py-6 mb-2 bg-white ">
            
            <div className="col-span-2">
              <div id = "action1" className="flex flex-row gap-x-2 justify-center gap-2 items-center bg-[#0487D5] text-white text-xl py-4 px-2 w-full rounded min-h-[75px]">
                 <UserRoundPlus/>
                  <div id="details" className="flex flex-col justify-center">
                      <Link href = "../form-qr" className='font-bold text-xl'>Add Patient</Link>
                  </div>
              </div>
            </div>
            
        
            <div id = "action2" className="">
                <div className="flex flex-row gap-x-2 justify-center items-center bg-nav_blue py-6 px-2 w-full h-20 rounded">
                    <NotebookTabs color='white' size={24}/>
                    <div className="font-bold lg:text-lg text-white text-center">
                        <Link href='/home/patients'>View patients</Link>
                    </div>
                </div>
            </div>

          
          <div id = "action3" className="">
          <div className="flex flex-row gap-x-2 justify-center items-center bg-nav_blue py-6 px-2 h-20 w-full rounded">
                <Settings color='white' size={24}/>
                <div className="font-bold text-white lg:text-lg text-center">
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
  const [newPatients, setNewPatients] = React.useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [user, setUser] = useState({
    name: "", 
    type: ""
  })

  const getPatients = async () => {
     
    const resCount = await fetch(`${BASE_URL}/api/dashboard`);
    const {allCount, newCount, earnings} = await resCount.json();

    setNumPatients(allCount);
    setEarnings(earnings);
    setNewPatients(newCount); // Update state
  };

  useEffect(() => {
    getPatients();
    const date = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    setCurrentDate(date.toLocaleDateString(undefined, options));
    setUser({...user, name: sessionStorage.getItem("user"), type: "Dentist"});
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <h1 className={styles.dashboardHeader}>Dashboard</h1>

        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h2>Good Morning, Dr. {user.name}</h2>
          <p className={styles.subText}>Today is {currentDate}.</p>
          <button className={styles.appointmentsButton}>Welcome to Toothville!</button>
        </div>

        {/* Stat Cards */}
        <div className="flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-6">
          <StatCard 
            title="Total Patients" 
            count={numPatients} 
            iconBgColor="bg-blue-400" 
            icon={UsersIcon} 
          />
          <StatCard
            title="New Patients"
            count={newPatients} // Use newPatients state
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

        <Actions />
      </div>
    </>
  );
}
