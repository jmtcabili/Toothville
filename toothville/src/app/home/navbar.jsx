'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './home.module.css';
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const currentPath = usePathname();
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSignOut = () => {
    router.push('/placeholder-signout'); // Navigate to the sign-out page
  };

  return (
    <div className="flex justify-between items-center w-full top-0 p-6 md:p-8 lg:pb-0 z-50 shadow-lg md:shadow-none md:bg-transparent">
      {/* Logo */}
      <div className="flex items-center">
        <img
          src="/assets/bannersimp.png"
          alt="Logo"
          className="w-36 md:w-48 lg:w-56"
        />
      </div>

      {/* Center Nav Items */}
      <div className={`${styles['nav-items']} ${isOpen ? styles.open : ''}`}>
        <div className={`${styles['nav-item']} ${styles.active}`}>
          <span>Home</span>
        </div>
        <div className={styles['nav-item']}>
          <span>Procedures</span>
        </div>
        <div className={styles['nav-item']}>
          <span>Patients</span>
        </div>
      </div>

      {/* Menu Button */}
      <button
        className="block md:hidden text-gray-600"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Bars3Icon className="h-9" />
      </button>

      {/* Profile */}
      <div
        className={`hidden md:flex items-center gap-2 p-3 rounded-full shadow-lg relative cursor-pointer ${
          isHovered ? `${styles.signOutButton} text-white` : 'bg-white text-gray-700'
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
