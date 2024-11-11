"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";

const formSchema = z.object({
    treatedMedicalCondition: z.enum(["yes", "no", "maybe"]).optional(),
    treatedMedicalReason: z.string().optional(),
    lastMedicalCheckup: z.string().optional(),
    healthChange: z.enum(["yes", "no", "maybe"]).optional(),
    healthChangeReason: z.string().optional(),
});

export default function MedicalHistoryForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            treatedMedicalCondition: undefined,
            treatedMedicalReason: "",
            lastMedicalCheckup: "",
            healthChange: undefined,
            healthChangeReason: "",
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
        router.push("/form/medical-history-2"); // Navigate to the next page
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
                <p className={styles.description}>
                    <i>The following information is required to enable us to provide you with 
                        the best possible dental care. All information is strictly private and 
                        is protected. The dentist will review the questions and explain any that 
                        you do not understand. Please fill in the entire form.</i>
                </p>
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={onInputChange} className={styles.form}>
                    <label className={styles.label}>Are you being treated for any medical condition at the present or have been treated within the past year?</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("treatedMedicalCondition")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("treatedMedicalCondition")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("treatedMedicalCondition")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>
                    <input
                        {...form.register("treatedMedicalReason")}
                        placeholder="If so, why?"
                        className={styles.input}
                    />

                    <label className={styles.label}>When was your last medical checkup?</label>
                    <input
                        {...form.register("lastMedicalCheckup")}
                        type="date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
                        placeholder="Date"
                        className={styles.input}
                    />

                    <label className={styles.label}>Has there been any change in your general health in the past year?</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("healthChange")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("healthChange")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("healthChange")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>
                    <input
                        {...form.register("healthChangeReason")}
                        placeholder="If yes, please explain."
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
