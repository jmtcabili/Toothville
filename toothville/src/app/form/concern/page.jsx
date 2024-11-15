"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";
import SignatureModal from "@/components/ui/SignatureModal";

const formSchema = z.object({
    concern: z.string().max(45, "Concern must be 45 characters or less").optional(),
});

export default function SubmissionForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concern: "",
        },
    });

    const [patientSignature, setPatientSignature] = useState(null);
    const [dentistSignature, setDentistSignature] = useState(null);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [isDentistModalOpen, setIsDentistModalOpen] = useState(false);
    const router = useRouter();

    // Retrieve data from sessionStorage and set mount status
    useEffect(() => {
        const savedData = sessionStorage.getItem("formData");
        const patientSignature = sessionStorage.getItem("patientSignature");
        const dentistSignature = sessionStorage.getItem("dentistSignature");

        if (savedData) {
            form.reset(JSON.parse(savedData));
        }

        if (patientSignature) {
            setPatientSignature(patientSignature);
        }

        if (dentistSignature) {
            setDentistSignature(dentistSignature);
        }

        setIsMounted(true);
    }, []);

    const onSubmit = async (data) => {
        const patientSignature = sessionStorage.getItem("patientSignature");
        const dentistSignature = sessionStorage.getItem("dentistSignature");

        if (!patientSignature || !dentistSignature) {
            alert("Both signatures are required!");
            return;
        }

        const formData = sessionStorage.getItem('formData');
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
                dentalInsurance: parsedData.dentalInsurance === true,
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
                adverseReaction: parsedData.adverseReaction,
                reactionExplanation: parsedData.reactionExplanation,
                asthma: parsedData.asthma,
                heartIssues: parsedData.heartIssues,
                heartSurgery: parsedData.heartSurgery,
            },
            concern: data.concern,
            signatures: {
                patient: patientSignature,
                dentist: dentistSignature,
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
                <h1 className={styles.headerTitle}>Concern</h1>
                <IoPersonCircle size={24} className={styles.profileIcon} />
            </header>
            <div className={styles.container}>
                <h2 className={styles.sectionTitle}>Concern</h2>
                <form onSubmit={form.handleSubmit(onSubmit)} className={styles.form}>
                    <label className={styles.label}>General Concerns:</label>
                    <input
                        {...form.register("concern")}
                        placeholder="Enter your concern (max 45 characters)"
                        maxLength={45}
                        className={styles.input}
                    />
                    <div>
                        <label className={styles.label}>Consent Signatures:</label>
                        <button
                            type="button"
                            className={styles.signatureButton}
                            onClick={() => setIsPatientModalOpen(true)} // Open the Patient Signature Modal
                        >
                            Add Patient Signature
                        </button>
                        <button
                            type="button"
                            className={styles.signatureButton}
                            onClick={() => setIsDentistModalOpen(true)} // Open the Dentist Signature Modal
                        >
                            Add Dentist Signature
                        </button>
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Submit
                    </button>
                </form>


            </div>

            <SignatureModal
                isOpen={isPatientModalOpen}
                onClose={() => setIsPatientModalOpen(false)}
                onSave={setPatientSignature}
                title="Patient's Signature"
                storageKey="patientSignature"
            />
            <SignatureModal
                isOpen={isDentistModalOpen}
                onClose={() => setIsDentistModalOpen(false)}
                onSave={setDentistSignature}
                title="Dentist's Signature"
                storageKey="dentistSignature"
            />
        </div>
    );
}
