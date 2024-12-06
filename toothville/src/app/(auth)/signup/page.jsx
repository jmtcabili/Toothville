"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Client-side navigation
import styles from "../../page.module.css";
import Link from "next/link";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({ username: false, password: false });
  const [showGreeting, setShowGreeting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowGreeting(true); // Trigger animation on load after a short delay
    }, 500);
  }, []);

  const handleInputChange = (field, value) => {
    if (field === "username") {
      setUsername(value);
      setInputError((prev) => ({ ...prev, username: false })); // Reset username error
    } else if (field === "password") {
      setPassword(value);
      setInputError((prev) => ({ ...prev, password: false })); // Reset password error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.status === 201) {
        setInputError({ username: false, password: false });
        router.push("/?success=Account created");
      } else {
        setError("Username is already taken. Please choose a different one.");
        setInputError({ username: true, password: true });
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setInputError({ username: true, password: true });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles["form-container"]}>
        <img
          src="/assets/Toothville logo PNG.png"
          alt="Toothville Logo"
          className={styles.logo}
        />
        <div className={`${styles.greetingBox} ${showGreeting ? styles.show : ""}`}>
          Welcome!
        </div>

        <div className={`${styles.greetingBox} ${showGreeting ? styles.show : ""}`}>
          Sign up for an account!
        </div>

        {error && (
            <div className={styles.error}>
              <ExclamationCircleIcon className={styles.errorIcon} />
              {error}
            </div>
          )}
          

        <form className={styles.form} onSubmit={handleSubmit}>
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

          <button type="submit" className={`${styles.commonButton} ${styles.signInButton}`}>
            Register
          </button>

          <Link href="/" className={`${styles.commonButton} ${styles.secondaryButton}`}>
            Already have an account?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
