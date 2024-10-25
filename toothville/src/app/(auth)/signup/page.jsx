"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Client-side navigation
import styles from "./page.module.css";
import Link from "next/link";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showGreeting, setShowGreeting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowGreeting(true); // Trigger animation on load after a short delay
    }, 500);
  }, []);

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
        router.push("/?success=Account created");
      } else {
        setError("Error creating account");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
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
          Welcome! :3
        </div>

        <div className={`${styles.greetingBox} ${showGreeting ? styles.show : ""}`}>
          Nice to meet you &lt;3
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

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
