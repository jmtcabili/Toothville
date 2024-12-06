"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "@/utils/constants";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({ username: false, password: false });
  const [showGreeting, setShowGreeting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowGreeting(true);
    }, 500);
  }, []);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/api/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setInputError({ username: false, password: false });
        localStorage.setItem("user", username);
        router.push("/home");
      } else {
        setError("Invalid username or password");
        setInputError({ username: true, password: true });
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      setInputError({ username: true, password: true });
    }
  };

  const handleInputChange = (field, value) => {
    if (field === "username") {
      setUsername(value);
      setInputError((prev) => ({ ...prev, username: false })); // Reset username error
    } else if (field === "password") {
      setPassword(value);
      setInputError((prev) => ({ ...prev, password: false })); // Reset password error
    }
  };

  if (!BASE_URL){
    return null; 
  }
  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <img
          src="/assets/banner.png"
          alt="Toothville Logo"
          className={styles.logo}
        />
        <div className={`${styles.greetingBox} ${showGreeting ? styles.show : ""}`}>
          Welcome back!
        </div>

        <div className={`${styles.greetingBox} ${showGreeting ? styles.show : ""}`}>
          Enter account details to log in!
        </div>

        {error && (
            <div className={styles.error}>
              <ExclamationCircleIcon className={styles.errorIcon} />
              {error}
            </div>
          )}
          
        <form className={styles.form} onSubmit={handleSignIn}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className={`${styles.inputField} ${inputError.username ? styles.errorInput : ""}`}
              required
            />
          </div>
         
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`${styles.inputField} ${inputError.password ? styles.errorInput : ""}`}
              required
            />
          </div>

          <button
            type="submit"
            className={`${styles.commonButton} ${styles.signInButton}`}
          >
            Sign In
          </button>

          <Link
            href="/signup"
            className={`${styles.commonButton} ${styles.thirdButton}`}
          >
            Don't have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Page;
