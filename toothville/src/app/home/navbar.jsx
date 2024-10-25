'use client'

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import styles from './home.module.css';

function determineSection() {
  const path = usePathname();
  if (path === '/home') {
    return 'Home';
  } else {
    return 'Patients';
  }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <img src="/assets/bannersimp.png" alt="Logo" className={styles.logo} width={227} />
      </div>

      {/* Hamburger Menu */}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      <div className={`${styles['nav-items']} ${isOpen ? styles.open : ''}`}>
        <div className={`${styles['nav-item']} ${styles.active}`}>
          <span>Home</span>
        </div>
        <div className={styles['nav-item']}>
          <span>Appointments</span>
        </div>
        <div className={styles['nav-item']}>
          <span>Patients</span>
        </div>
        <div className={styles['nav-item']}>
          <span>Analytics</span>
        </div>
        <div className={styles['nav-item-profile']}>
          <span>Profile</span>
        </div>
      </div>

      <div className={styles['profile-button']}>
        <img
          src="/assets/defaultpfp.webp"
          alt="Profile Picture"
          className={styles.profilePic}
          width={40}
          height={40}
        />
        <div className={styles['profile-details']}>
          <span className={styles.profileName}>Dr. Michelle Lajara</span>
          <span className={styles.role}>Head Dentist</span>
        </div>
      </div>
    </div>
  );
}
