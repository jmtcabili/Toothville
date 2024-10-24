"use client"

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Link from "next/link";

const Page = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
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
          Welcome back! :3
        </div>

        <div className={`${styles.greetingBox} ${showGreeting ? styles.show : ""}`}>
          Please enter your details &lt;3
        </div>
        <form className={styles.form} onSubmit={handleSignIn}>
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
