"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";

// Define form validation schema
const formSchema = z.object({
    title: z.string().min(1, "Please select a title."),
    firstName: z.string().min(1, "First name is required."),
    middleInitial: z.string().optional(),
    lastName: z.string().min(1, "Last name is required."),
    nickname: z.string().optional(),
    dob: z.string().optional(),
    address: z.string().optional(),
    suite: z.string().optional(),
    city: z.string().optional(),
    province: z.string().optional(),
    postalCode: z.string().optional(),
});

export default function MedicalForm() {
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "Mr.",
            firstName: "",
            middleInitial: "",
            lastName: "",
            nickname: "",
            dob: "",
            address: "",
            suite: "",
            city: "",
            province: "",
            postalCode: "",
        },
    });

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
        router.push("/form/contact-information"); // Navigate to the next page
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
                <h2 className={styles.sectionTitle}>Personal Information</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} onChange={onInputChange} className={styles.form}>
                    <div className={styles.formGroup}>
                        <select {...form.register("title")} className={styles.input}>
                            <option>Mr.</option>
                            <option>Ms.</option>
                            <option>Mrs.</option>
                            <option>Dr.</option>
                        </select>
                        <input
                            {...form.register("firstName")}
                            placeholder="First Name"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            {...form.register("middleInitial")}
                            placeholder="M.I."
                            className={styles.input}
                        />
                        <input
                            {...form.register("lastName")}
                            placeholder="Last Name"
                            className={styles.input}
                        />
                    </div>

                    <input
                        {...form.register("nickname")}
                        placeholder="Nick name"
                        className={styles.input}
                    />

                    <input
                        {...form.register("dob")}
                        type="date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = e.target.value ? "date" : "text")}
                        placeholder="Date of Birth"
                        className={styles.input}
                    />

                    <input
                        {...form.register("address")}
                        placeholder="Home Address"
                        className={styles.input}
                    />

                    <div className={styles.formGroup}>
                        <input
                            {...form.register("suite")}
                            placeholder="Suite"
                            className={styles.input}
                        />
                        <input
                            {...form.register("city")}
                            placeholder="City"
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <input
                            {...form.register("province")}
                            placeholder="Province"
                            className={styles.input}
                        />
                        <input
                            {...form.register("postalCode")}
                            placeholder="Postal Code"
                            className={styles.input}
                        />
                    </div>

                    <button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Next →
                    </button>
                </form>
            </div>
        </div>
    );
}
