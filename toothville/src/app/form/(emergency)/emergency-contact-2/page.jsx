"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";

const formSchema = z.object({
    pharmacyName: z.string().optional(),
    pharmacyNumber: z.string().optional(),
    driversLicenseNumber: z.string().optional(),
    ohipNumber: z.string().optional(),
    dentalInsurance: z.boolean().optional(),
    employer: z.string().optional(),
    primaryInsurancePolicy: z.string().optional(),
    secondaryInsurancePolicy: z.string().optional(),
    referralSource: z.string().optional(),
});

export default function InsuranceForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pharmacyName: "",
            pharmacyNumber: "",
            driversLicenseNumber: "",
            ohipNumber: "",
            dentalInsurance: false,
            employer: "",
            primaryInsurancePolicy: "",
            secondaryInsurancePolicy: "",
            referralSource: "",
        },
    });

    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Load form data from sessionStorage on mount
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
        router.push("/form/medical-history-1"); // Navigate to the next page
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
                <h2 className={styles.sectionTitle}>Emergency Contact</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={onInputChange} className={styles.form}>
                    <input
                        {...form.register("pharmacyName")}
                        placeholder="Pharmacy Name"
                        className={styles.input}
                    />
                    <input
                        {...form.register("pharmacyNumber")}
                        placeholder="Pharmacy Number"
                        className={styles.input}
                        type="tel"
                    />
                    <input
                        {...form.register("driversLicenseNumber")}
                        placeholder="Driver's License Number"
                        className={styles.input}
                    />
                    <input
                        {...form.register("ohipNumber")}
                        placeholder="OHIP Number"
                        className={styles.input}
                    />

                    <div className={styles.checkboxGroup}>
                        <input
                            type="checkbox"
                            {...form.register("dentalInsurance")}
                            className={styles.checkbox}
                        />
                        <label className={styles.checkboxLabel}>Dental Insurance</label>
                    </div>

                    <input
                        {...form.register("employer")}
                        placeholder="Employer"
                        className={styles.input}
                    />
                    <input
                        {...form.register("primaryInsurancePolicy")}
                        placeholder="Primary Insurance Policy Number"
                        className={styles.input}
                    />
                    <input
                        {...form.register("secondaryInsurancePolicy")}
                        placeholder="Secondary Insurance Policy Number"
                        className={styles.input}
                    />
                    <textarea
                        {...form.register("referralSource")}
                        placeholder="How did you hear about our office?"
                        className={styles.textarea}
                    />

                    <button type="submit" className={styles.submitButton}>
                        Next →
                    </button>
                </form>
            </div>
        </div>
    );
}
