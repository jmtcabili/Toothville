"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";

const allergyFormSchema = z.object({
    medications: z.enum(["yes", "no", "maybe"]).optional(),
    medicationsList: z.string().optional(),
    allergies: z.enum(["yes", "no", "maybe"]).optional(),
    medicationAllergies: z.string().optional(),
    latexAllergies: z.string().optional(),
    otherAllergies: z.string().optional(),
});

export default function AllergyForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(allergyFormSchema),
        defaultValues: {
            medications: undefined,
            medicationsList: "",
            allergies: undefined,
            medicationAllergies: "",
            latexAllergies: "",
            otherAllergies: "",
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
        router.push("/form/medical-history-3"); // Navigate to the next page
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
                <h2 className={styles.sectionTitle}>Medical History</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={onInputChange} className={styles.form}>
                    <label className={styles.label}>
                        Are you taking any medications, non-prescription drugs, or natural supplements?
                    </label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("medications")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("medications")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("medications")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>
                    <input
                        {...form.register("medicationsList")}
                        placeholder="If yes, please provide a list of doses."
                        className={styles.input}
                    />

                    <label className={styles.label}>Do you have any allergies?</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("allergies")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("allergies")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("allergies")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>
                    <label className={styles.subLabel}>a) Medications</label>
                    <input
                        {...form.register("medicationAllergies")}
                        placeholder="If yes, please list below."
                        className={styles.input}
                    />

                    <label className={styles.subLabel}>b) Latex / Rubber Products / Metals</label>
                    <input
                        {...form.register("latexAllergies")}
                        placeholder="If yes, please list below."
                        className={styles.input}
                    />

                    <label className={styles.subLabel}>c) Other (e.g., Hayfever, Foods, Dyes)</label>
                    <input
                        {...form.register("otherAllergies")}
                        placeholder="If yes, please list below."
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
