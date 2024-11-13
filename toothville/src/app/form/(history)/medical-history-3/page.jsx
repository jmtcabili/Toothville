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
        const formData = sessionStorage.getItem('formData')
        const parsedData = JSON.parse(formData);
        const patientData = {
            personalInformation: {
                title: parsedData.title,
                firstName: parsedData.firstName,
                middleInitial: parsedData.middleInitial,
                lastName: parsedData.lastName,
                nickname: parsedData.nickname,
                dob: new Date(parsedData.dob),
                address: parsedData.address,
                suite: parsedData.suite,
                city: parsedData.city,
                province: parsedData.province,
                postalCode: parsedData.postalCode,
            },
            contactInformation: {
                homePhone: parsedData.homePhone,
                cellularPhone: parsedData.cellularPhone,
                businessPhone: parsedData.businessPhone,
                email: parsedData.email,
                preferredContact: parsedData.preferredContact,
                occupation: parsedData.occupation,
                guardianName: parsedData.guardianName,
                guardianPhone: parsedData.guardianPhone,
            },
            emergencyContacts: JSON.parse(sessionStorage.getItem('emergencyContacts')) || [],
            familyDoctor: {
                name: parsedData.familyDoctor,
                phone: parsedData.familyDoctorPhone,
                address: parsedData.familyDoctorAddress,
            },
            specialist: {
                name: parsedData.specialist,
                phone: parsedData.specialistPhone,
                address: parsedData.specialistAddress,
            },
            pharmacy: {
                name: parsedData.pharmacyName,
                number: parsedData.pharmacyNumber,
            },
            identification: {
                driversLicenseNumber: parsedData.driversLicenseNumber,
                ohipNumber: parsedData.ohipNumber,
            },
            insurance: {
                dentalInsurance: parsedData.dentalInsurance === true, // Convert to boolean
                employer: parsedData.employer,
                primaryInsurancePolicy: parsedData.primaryInsurancePolicy,
                secondaryInsurancePolicy: parsedData.secondaryInsurancePolicy,
            },
            referralSource: parsedData.referralSource,
            medicalHistory: {
                treatedMedicalCondition: parsedData.treatedMedicalCondition,
                treatedMedicalReason: parsedData.treatedMedicalReason,
                lastMedicalCheckup: new Date(parsedData.lastMedicalCheckup),
                healthChange: parsedData.healthChange,
                healthChangeReason: parsedData.healthChangeReason,
                medications: parsedData.medications,
                medicationsList: parsedData.medicationsList,
                allergies: {
                    medications: parsedData.medicationAllergies,
                    latexRubberMetals: parsedData.latexAllergies,
                    others: parsedData.otherAllergies,
                },
                adverseReaction: data.adverseReaction,
                reactionExplanation: data.reactionExplanation,
                asthma: data.asthma,
                heartIssues: data.heartIssues,
                heartSurgery: data.heartSurgery,
            },
        };

        try {
            console.log("Patient data (front): ", patientData);
            
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
                router.push('/home');
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
