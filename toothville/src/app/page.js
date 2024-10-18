import Image from "next/image";
import Link from 'next/link';

 
export default function Home() {
  return (
    <>
      <div className = "flex flex-col w-screen h-screen justify-center items-center"> 
        <Link href = "/home"> Login </Link>
        <br></br>
        <Link href = '/signup'>Signup</Link>
        <div className = 'font-anekOdia text-3xl font-bold'>
          sample
        </div>
      </div>
    </>
  );
}