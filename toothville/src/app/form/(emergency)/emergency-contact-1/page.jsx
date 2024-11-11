"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";

const formSchema = z.object({
    emergencyContactName: z.string().min(1, "Emergency Contact Name is required."),
    relationship: z.string().min(1, "Relationship is required."),
    emergencyContactPhone: z.string().min(1, "Phone number is required."),
    familyDoctor: z.string().optional(),
    familyDoctorPhone: z.string().optional(),
    familyDoctorAddress: z.string().optional(),
    specialist: z.string().optional(),
    specialistPhone: z.string().optional(),
    specialistAddress: z.string().optional(),
});

export default function EmergencyContactForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            emergencyContactName: "",
            relationship: "",
            emergencyContactPhone: "",
            familyDoctor: "",
            familyDoctorPhone: "",
            familyDoctorAddress: "",
            specialist: "",
            specialistPhone: "",
            specialistAddress: "",
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
        router.push("/form/emergency-contact-2"); // Navigate to the next page
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
                        {...form.register("emergencyContactName")}
                        placeholder="Name"
                        className={styles.input}
                    />
                    <input
                        {...form.register("relationship")}
                        placeholder="Relationship"
                        className={styles.input}
                    />
                    <input
                        {...form.register("emergencyContactPhone")}
                        placeholder="Phone"
                        className={styles.input}
                        type="tel"
                    />

                    <h2 className={styles.sectionTitle}>Family Doctor</h2>
                    <input
                        {...form.register("familyDoctor")}
                        placeholder="Family Doctor"
                        className={styles.input}
                    />
                    <input
                        {...form.register("familyDoctorPhone")}
                        placeholder="Phone"
                        className={styles.input}
                        type="tel"
                    />
                    <input
                        {...form.register("familyDoctorAddress")}
                        placeholder="Address"
                        className={styles.input}
                    />

                    <h2 className={styles.sectionTitle}>Specialist</h2>
                    <input
                        {...form.register("specialist")}
                        placeholder="Specialist"
                        className={styles.input}
                    />
                    <input
                        {...form.register("specialistPhone")}
                        placeholder="Phone"
                        className={styles.input}
                        type="tel"
                    />
                    <input
                        {...form.register("specialistAddress")}
                        placeholder="Address"
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
