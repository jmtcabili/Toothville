'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './home.module.css';
import { Bars3Icon, ArrowLeftIcon } from "@heroicons/react/24/solid";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    router.push('/signout'); 
  };
  
  

  return (
    <div className="flex justify-between items-center w-full top-0 p-6 md:p-8 lg:pb-0 z-50 shadow-lg md:shadow-none md:bg-transparent">

      {currentPath !== '/home' && (
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center h-full bg-f0f0f0 text-black rounded-full hover:bg-gray-200 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeftIcon className="h-7 text-black" />
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center ml-6">
        <img
          src="/assets/bannersimp.png"
          alt="Logo"
          className="w-36 md:w-48 lg:w-56"
        />
      </div>

      {/* Center Nav Items */}
      <div className={`${styles['nav-items']}`}>
        {/* Home Link */}
        <Link href="/home">
          <span
            className={`${styles['nav-item']} ${currentPath === '/home' ? styles.active : ''}`}
          >
            Home
          </span>
        </Link>

        {/* Procedures Link */}
        <Link href="/home/procedures">
          <span
            className={`${styles['nav-item']} ${currentPath === '/home/procedures' ? styles.active : ''}`}
          >
            Procedures
          </span>
        </Link>

        {/* Patients Link */}
        <Link href="/home/patients">
          <span
            className={`${styles['nav-item']} ${currentPath === '/home/patients' ? styles.active : ''}`}
          >
            Patients
          </span>
        </Link>
      </div>

      {/* Mobile Dropdown Menu */}
      <button
        className="block md:hidden text-gray-600"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Bars3Icon className="h-9" />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-6 w-48 bg-white shadow-lg rounded-lg z-50">
          <ul className="flex flex-col">
            {/* Home Link */}
            <li>
              <Link href="/home">
                <span
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                    currentPath === '/home' ? 'font-bold' : ''
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Home
                </span>
              </Link>
            </li>

            {/* Procedures Link */}
            <li>
              <Link href="/home/procedures">
                <span
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                    currentPath === '/home/procedures' ? 'font-bold' : ''
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Procedures
                </span>
              </Link>
            </li>

            {/* Patients Link */}
            <li>
              <Link href="/home/patients">
                <span
                  className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                    currentPath === '/home/patients' ? 'font-bold' : ''
                  }`}
                  onClick={() => setIsOpen(false)} // Close menu on link click
                >
                  Patients
                </span>
              </Link>
            </li>

            {/* Sign Out Option */}
            <li>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Profile */}
      <div
        className={`hidden md:flex items-center gap-2 p-3 rounded-full shadow-lg relative cursor-pointer ${isHovered ? `${styles.signOutButton} text-white` : 'bg-white text-gray-700'
          }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleSignOut}
      >
        {isHovered ? (
          <span>Sign Out</span>
        ) : (
          <>
            <img
              src="/assets/defaultpfp.png"
              alt="Profile Picture"
              className="rounded-full border-2 border-white h-10"
            />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-lg ">Dr. Michelle Lajara</span>
              <span className="text-sm font-light">Head Dentist</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
