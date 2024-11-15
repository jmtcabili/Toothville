"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";

const formSchema = z.object({
    adverseReaction: z.enum(["yes", "no", "maybe"]).optional(),
    reactionExplanation: z.string().optional(),
    asthma: z.enum(["yes", "no", "maybe"]).optional(),
    heartIssues: z.enum(["yes", "no", "maybe"]).optional(),
    heartSurgery: z.enum(["yes", "no", "maybe"]).optional(),
});

export default function MedicalConditionsForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adverseReaction: undefined,
            reactionExplanation: "",
            asthma: undefined,
            heartIssues: undefined,
            heartSurgery: undefined,
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
        router.push("/form/concern"); // Navigate to the next page
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
                        Have you ever had a peculiar or adverse reaction to any medications or injections?
                    </label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("adverseReaction")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("adverseReaction")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("adverseReaction")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>
                    <input
                        {...form.register("reactionExplanation")}
                        placeholder="If yes, please explain"
                        className={styles.input}
                    />

                    <label className={styles.label}>Do you have or ever had asthma?</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("asthma")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("asthma")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("asthma")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>

                    <label className={styles.label}>Do you have or ever had any heart or blood pressure problems?</label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("heartIssues")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("heartIssues")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("heartIssues")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>

                    <label className={styles.label}>
                        Do you have or ever had a replacement or repair of a heart valve, infection of the heart 
                        (infective endocarditis), a heart condition from birth (congenital heart disease) or a heart transplant?
                    </label>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="yes"
                                {...form.register("heartSurgery")}
                            />
                            Yes
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="no"
                                {...form.register("heartSurgery")}
                            />
                            No
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="maybe"
                                {...form.register("heartSurgery")}
                            />
                            Maybe or Not Sure
                        </label>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Next →
                    </button>
                </form>
            </div>
        </div>
    );
}
