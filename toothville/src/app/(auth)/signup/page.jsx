"use client";

import React, { useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation"; // Client-side navigation
import styles from "../../page.module.css";
import Link from "next/link";
import Spinner from "@/components/ui/spinner";

import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { BASE_URL } from "@/utils/constants";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const accountCodeRef = useRef(null);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({ username: false, password: false, appCode: false});
  const [showGreeting, setShowGreeting] = useState(false);
  const router = useRouter();

  const [disableRegister, setDisableRegister] = useState(false)
  const [disableLogin, setDisableLogin] = useState(false)

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
    setDisableRegister(true)
    let inputCode = accountCodeRef.current.value;

    if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
      setInputError({ username: false, password: true, appCode: false });
      return;
    }else{
      try {
        const res = await fetch(`${BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, inputCode, password}),
        });
  
        if (res.status === 201) {
          setInputError({ username: false, password: false, appCode: false});
          router.push("/");
        } else {
          const errMsg = await res.text();
          setError(errMsg);
          if (errMsg === "User already exists") {
            setInputError({ username: true, password: false, appCode: false });
          }else if (errMsg === "Invalid code"){
            setInputError({ username: false, password: false, appCode: true }); 
          }
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        setInputError({ username: true, password: true, appCode:true});
      } finally {
        setDisableRegister(false)
      }
    }
    
  };

  return (
    <div className={styles.container}>
        <div className={styles["form-container"]}>
            <img src="/assets/Toothville logo PNG.png"
                alt="Toothville Logo"
                className={styles.logo}
            />
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
              <label htmlFor="accountCode">Account Code</label>
              <input
                  type="password"
                  id="accountCode"
                  ref={accountCodeRef}
                  className={`${styles.inputField} ${inputError.appCode ? styles.errorInput : ""}`}
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

            <button type="submit" 
                className={`${styles.commonButton} ${styles.signInButton}
                            flex flex-row justify-center items-center relative`}
                disabled ={disableRegister}>
            <div className="flex flex-row justify-center items-center">
                Register
            </div>
            {disableRegister && <div className = "absolute left-3"><Spinner dim={20} isDarkBg={true}/></div>}
            </button>
            <Link href={disableRegister ? `javascript:void(0)` : "/"}  className={`${styles.commonButton} ${styles.thirdButton} relative flex flex-col justify-center items-center`}
                        onClick={() => setDisableLogin(true)}>
                    <div>Already have an account?</div>
                    {disableLogin && 
                    <div className="absolute left-3"><Spinner dim = {20} isDarkBg={false}/></div>}
            </Link>
        </form>
        </div>
    </div>
  );
};

export default SignUp;
