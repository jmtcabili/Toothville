"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { IoArrowBack, IoPersonCircle } from "react-icons/io5";
import SignatureModal from "@/components/ui/SignatureModal";
import { BASE_URL } from "@/utils/constants";

const formSchema = z.object({
    concern: z.string().max(50, "Concern must be 50 characters or less").optional(),
    dentist: z.string().max(50, "Concern must be 50 characters or less").optional(),
    signatures: z.object({
        patientSignature: z.string().nonempty("Patient signature is required"),
        dentistSignature: z.string().nonempty("Dentist signature is required"),
    }),
});

export default function SubmissionForm() {
    const [isMounted, setIsMounted] = useState(false);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            concern: "",
            dentist: "",
            signatures: {
                patientSignature: "",
                dentistSignature: "",
            },
        },
    });

    const [patientSignature, setPatientSignature] = useState(null);
    const [dentistSignature, setDentistSignature] = useState(null);
    const [isPatientModalOpen, setIsPatientModalOpen] = useState(false);
    const [isDentistModalOpen, setIsDentistModalOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedData = sessionStorage.getItem("formData");
        const savedPatientSignature = sessionStorage.getItem("patientSignature");
        const savedDentistSignature = sessionStorage.getItem("dentistSignature");

        if (savedData) {
            form.reset(JSON.parse(savedData));
        }

        if (savedPatientSignature) {
            setPatientSignature(savedPatientSignature);
            form.setValue("signatures.patientSignature", savedPatientSignature);
        }

        if (savedDentistSignature) {
            setDentistSignature(savedDentistSignature);
            form.setValue("signatures.dentistSignature", savedDentistSignature);
        }

        setIsMounted(true);
    }, []);

    const onSubmit = async (data) => {
        const { signatures } = data;

        if (!signatures.patientSignature || !signatures.dentistSignature) {
            alert("Both signatures are required!");
            return;
        }

        const formData = sessionStorage.getItem("formData");
        const parsedData = JSON.parse(formData);
        const currentDate = new Date();

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
            emergencyContacts: {
                name: parsedData.emergencyContactName,
                relation: parsedData.relationship,
                phone: parsedData.emergencyContactPhone,
            },
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
            dentist: data.dentist,
            signatures: {
                patientSignature: data.signatures.patientSignature,
                dentistSignature: data.signatures.dentistSignature,
            },
            dateRecorded: currentDate,
        };

        try {
            const response = await fetch(`${BASE_URL}/api/patient-record`, {
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
                sessionStorage.clear();
                router.push('/form/finish');
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
                    <label className={styles.label}>Dentist Name:</label>
                    <input
                        {...form.register("dentist")}
                        placeholder="Enter dentist's name"
                        maxLength={50}
                        className={styles.input}
                    />
                    <label className={styles.label}>General Concerns:</label>
                    <input
                        {...form.register("concern")}
                        placeholder="Enter your concern (max 50 characters)"
                        maxLength={50}
                        className={styles.input}
                    />
                    <div>
                    <br></br>
                        <label className={styles.label}>Patient's Signature:</label>
                        {patientSignature ? (
                            <img
                                src={`data:image/png;base64,${patientSignature}`}
                                alt="Patient's Signature"
                                className={styles.signatureImage}
                            />
                        ) : (
                            <p>No signature added yet</p>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsPatientModalOpen(true)}
                            className={styles.signatureButton}
                        >
                            Add Patient Signature
                        </button>
                        <br></br>
                        <label className={styles.label}>Dentist's Signature:</label>
                        {dentistSignature ? (
                            <img
                                src={`data:image/png;base64,${dentistSignature}`}
                                alt="Dentist's Signature"
                                className={styles.signatureImage}
                            />
                        ) : (
                            <p>No signature added yet</p>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsDentistModalOpen(true)}
                            className={styles.signatureButton}
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
                onSave={(signature) => {
                    sessionStorage.setItem("patientSignature", signature);
                    setPatientSignature(signature);
                    form.setValue("signatures.patientSignature", signature); 
                }}
                title="Patient's Signature"
            />
            <SignatureModal
                isOpen={isDentistModalOpen}
                onClose={() => setIsDentistModalOpen(false)}
                onSave={(signature) => {
                    sessionStorage.setItem("dentistSignature", signature);
                    setDentistSignature(signature);
                    form.setValue("signatures.dentistSignature", signature); 
                }}
                title="Dentist's Signature"
            />

        </div>
    );
}
