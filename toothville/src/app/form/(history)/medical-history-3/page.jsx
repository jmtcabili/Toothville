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

    const onSubmit = async (data) => {
        const patientData = {
            personalInformation: {
                title: sessionStorage.getItem('title'),
                firstName: sessionStorage.getItem('firstName'),
                middleInitial: sessionStorage.getItem('middleInitial'),
                lastName: sessionStorage.getItem('lastName'),
                nickname: sessionStorage.getItem('nickname'),
                dob: new Date(sessionStorage.getItem('dob')),
                address: sessionStorage.getItem('address'),
                suite: sessionStorage.getItem('suite'),
                city: sessionStorage.getItem('city'),
                province: sessionStorage.getItem('province'),
                postalCode: sessionStorage.getItem('postalCode'),
            },
            contactInformation: {
                homePhone: sessionStorage.getItem('homePhone'),
                cellularPhone: sessionStorage.getItem('cellularPhone'),
                businessPhone: sessionStorage.getItem('businessPhone'),
                email: sessionStorage.getItem('email'),
                preferredContact: sessionStorage.getItem('preferredContact'),
                occupation: sessionStorage.getItem('occupation'),
                guardianName: sessionStorage.getItem('guardianName'),
                guardianPhone: sessionStorage.getItem('guardianPhone'),
            },
            emergencyContacts: JSON.parse(sessionStorage.getItem('emergencyContacts')) || [],
            familyDoctor: {
                name: sessionStorage.getItem('familyDoctorName'),
                phone: sessionStorage.getItem('familyDoctorPhone'),
                address: sessionStorage.getItem('familyDoctorAddress'),
            },
            specialist: {
                name: sessionStorage.getItem('specialistName'),
                phone: sessionStorage.getItem('specialistPhone'),
                address: sessionStorage.getItem('specialistAddress'),
            },
            pharmacy: {
                name: sessionStorage.getItem('pharmacyName'),
                number: sessionStorage.getItem('pharmacyNumber'),
            },
            identification: {
                driversLicenseNumber: sessionStorage.getItem('driversLicenseNumber'),
                ohipNumber: sessionStorage.getItem('ohipNumber'),
            },
            insurance: {
                dentalInsurance: sessionStorage.getItem('dentalInsurance') === 'true', // Convert to boolean
                employer: sessionStorage.getItem('employer'),
                primaryInsurancePolicy: sessionStorage.getItem('primaryInsurancePolicy'),
                secondaryInsurancePolicy: sessionStorage.getItem('secondaryInsurancePolicy'),
            },
            referralSource: sessionStorage.getItem('referralSource'),
            medicalHistory: {
                treatedMedicalCondition: sessionStorage.getItem('treatedMedicalCondition'),
                treatedMedicalReason: sessionStorage.getItem('treatedMedicalReason'),
                lastMedicalCheckup: new Date(sessionStorage.getItem('lastMedicalCheckup')),
                healthChange: sessionStorage.getItem('healthChange'),
                healthChangeReason: sessionStorage.getItem('healthChangeReason'),
                medications: sessionStorage.getItem('medications'),
                medicationsList: sessionStorage.getItem('medicationsList'),
                allergies: {
                    medications: sessionStorage.getItem('allergiesMedications'),
                    latexRubberMetals: sessionStorage.getItem('allergiesLatexRubberMetals'),
                    others: sessionStorage.getItem('allergiesOthers'),
                },
                adverseReaction: data.adverseReaction,
                reactionExplanation: data.reactionExplanation,
                asthma: data.asthma,
                heartIssues: data.heartIssues,
                heartSurgery: data.heartSurgery,
            },
        };

        try {
            const response = await fetch('/api/patient-record', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to save patient data');
            }
    
            const result = await response.json();
            if (result.message === "created") {
                alert("Patient data saved successfully!");
                router.push('/home/patients');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Error saving patient data: ${error.message}`);
        }
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
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
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
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
