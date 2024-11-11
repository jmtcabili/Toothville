"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle, IoCall, IoMail } from "react-icons/io5";

const formSchema = z.object({
    homePhone: z.string().optional(),
    cellularPhone: z.string().optional(),
    businessPhone: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    preferredContact: z.enum(["Home Phone", "Cellular Phone", "Business Phone", "Email"]).optional(),
    occupation: z.string().optional(),
    guardianName: z.string().optional(),
    guardianPhone: z.string().optional(),
});

export default function ContactInformationForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            homePhone: "",
            cellularPhone: "",
            businessPhone: "",
            email: "",
            preferredContact: "",
            occupation: "",
            guardianName: "",
            guardianPhone: "",
        },
    });

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        const savedData = sessionStorage.getItem("formData");
        if (savedData) {
            form.reset(JSON.parse(savedData));
        }
        setIsMounted(true);
    }, []);

    // Save form data to sessionStorage on change
    const onInputChange = () => {
        sessionStorage.setItem("formData", JSON.stringify(form.getValues()));
    };

    const onSubmit = (data) => {
        console.log("Form data:", data);
        router.push("/form/emergency-contact-1"); // Navigate to the next page
    };

    if (!isMounted) {
        return null;
    }

    return (
        <div>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <IoArrowBack size={24} />
                </button>
                <h1 className={styles.headerTitle}>Medical Questionnaire</h1>
                <IoPersonCircle size={24} className={styles.profileIcon} />
            </header>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Contact Information</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={onInputChange} className={styles.form}>
                    <div className={styles.inputContainer}>
                        <div className={styles.inputWrapper}>
                            <img src="/icons/retro-phone.png" alt="Home Phone" className={styles.retrophone} />
                            <input
                                {...form.register("homePhone")}
                                placeholder="Home Phone"
                                className={styles.inputWithIcon}
                            />
                        </div>
                    </div>


                    <div className={styles.inputContainer}>
                        <IoCall className={styles.icon} />
                        <input
                            {...form.register("cellularPhone")}
                            placeholder="Cellular Phone"
                            className={styles.inputWithIcon}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <IoCall className={styles.icon} />
                        <input
                            {...form.register("businessPhone")}
                            placeholder="Business Phone"
                            className={styles.inputWithIcon}
                        />
                    </div>

                    <div className={styles.inputContainer}>
                        <IoMail className={styles.icon} />
                        <input
                            {...form.register("email")}
                            placeholder="Email address"
                            className={styles.inputWithIcon}
                        />
                    </div>

                    <select {...form.register("preferredContact")} className={styles.input}>
                        <option value="">Preferred Method of Contact</option>
                        <option value="Home Phone">Home Phone</option>
                        <option value="Cellular Phone">Cellular Phone</option>
                        <option value="Business Phone">Business Phone</option>
                        <option value="Email">Email</option>
                    </select>

                    <input
                        {...form.register("occupation")}
                        placeholder="Occupation"
                        className={styles.input}
                    />

                    <h3>If under 18 or under guardianship:</h3>
                    <input
                        {...form.register("guardianName")}
                        placeholder="Name of Guardian or Parents"
                        className={styles.input}
                    />
                    <input
                        {...form.register("guardianPhone")}
                        placeholder="Phone Number"
                        className={styles.input}
                    />

                    <button type="submit" className={styles.submitButton}>
                        Next →
                    </button>
                </form>
            </div>
        </div>
    );
}
