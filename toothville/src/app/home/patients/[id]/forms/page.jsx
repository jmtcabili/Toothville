'use client';
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import styles from './page.module.css';
import PatientSummary from '../PatientSummary';
import { BASE_URL } from '@/utils/constants';

export default function ViewForms({ params }) {
    const { id } = params;
    const [patientData, setPatientData] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editableData, setEditableData] = useState(null);

    useEffect(() => {
        async function fetchPatientData() {
            try {
                const response = await fetch(`${BASE_URL}/api/forms?_id=${id}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const patient = await response.json();
                const data = patient || {};
                const initializedData = {
                    personalInformation: {
                        title: data.personalInformation?.title || '',
                        firstName: data.personalInformation?.firstName || '',
                        middleInitial: data.personalInformation?.middleInitial || '',
                        lastName: data.personalInformation?.lastName || '',
                        nickname: data.personalInformation?.nickname || '',
                        dob: data.personalInformation?.dob || '',
                        address: data.personalInformation?.address || '',
                        suite: data.personalInformation?.suite || '',
                        city: data.personalInformation?.city || '',
                        province: data.personalInformation?.province || '',
                        postalCode: data.personalInformation?.postalCode || '',
                    },
                    contactInformation: {
                        homePhone: data.contactInformation?.homePhone || '',
                        cellularPhone: data.contactInformation?.cellularPhone || '',
                        businessPhone: data.contactInformation?.businessPhone || '',
                        email: data.contactInformation?.email || '',
                        preferredContact: data.contactInformation?.preferredContact || '',
                        occupation: data.contactInformation?.occupation || '',
                        guardianName: data.contactInformation?.guardianName || '',
                        guardianPhone: data.contactInformation?.guardianPhone || '',
                    },
                    emergencyContacts: {
                        name: data.emergencyContacts?.name || '',
                        relation: data.emergencyContacts?.relation || '',
                        phone: data.emergencyContacts?.phone || '',
                    },
                    familyDoctor: {
                        name: data.familyDoctor?.name || '',
                        phone: data.familyDoctor?.phone || '',
                        address: data.familyDoctor?.address || '',
                    },
                    specialist: {
                        name: data.specialist?.name || '',
                        phone: data.specialist?.phone || '',
                        address: data.specialist?.address || '',
                    },
                    pharmacy: {
                        name: data.pharmacy?.name || '',
                        number: data.pharmacy?.number || '',
                    },
                    identification: {
                        driversLicenseNumber: data.identification?.driversLicenseNumber || '',
                        ohipNumber: data.identification?.ohipNumber || '',
                    },
                    insurance: {
                        dentalInsurance: data.insurance?.dentalInsurance || false,
                        employer: data.insurance?.employer || '',
                        primaryInsurancePolicy: data.insurance?.primaryInsurancePolicy || '',
                        secondaryInsurancePolicy: data.insurance?.secondaryInsurancePolicy || '',
                    },
                    referralSource: data.referralSource || '',
                };
                setPatientData(patient);
                setEditableData(initializedData);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        }

        fetchPatientData();
    }, [id]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (key, value) => {
        setEditableData((prev) => ({ ...prev, [key]: value }));
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSave = async () => {
    setIsLoading(true); // Start loading
    try {
        const preparedData = { ...editableData };

        // Ensure dob is converted to ISO format (string)
        if (preparedData.personalInformation?.dob) {
            preparedData.personalInformation.dob = new Date(preparedData.personalInformation.dob).toISOString();
        }

        const response = await fetch(`${BASE_URL}/api/forms?_id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(preparedData),
        });

        if (!response.ok) {
            throw new Error(`Error saving data: ${response.statusText}`);
        }

        const { updatedPatient } = await response.json();

        setPatientData(updatedPatient);
        setEditableData(updatedPatient);
        setIsEditing(false); // Close edit mode
    } catch (error) {
        console.error('Error saving medical history:', error);
    } finally {
        setIsLoading(false); // End loading
    }
};



    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    };

    if (!patientData) {
        return <div className={styles.loading}>Loading patient forms...</div>;
    }

    const personalInfo = [
        {
            question: 'Title',
            key: 'personalInformation.title',
        },
        {
            question: 'First Name',
            key: 'personalInformation.firstName',
        },
        {
            question: 'Middle Initial',
            key: 'personalInformation.middleInitial',
        },
        {
            question: 'Last Name',
            key: 'personalInformation.lastName',
        },
        {
            question: 'Nickname',
            key: 'personalInformation.nickname',
        },
        {
            question: 'Date of Birth',
            key: 'personalInformation.dob',
        },
        {
            question: 'Address',
            key: 'personalInformation.address',
        },
        {
            question: 'Suite',
            key: 'personalInformation.suite',
        },
        {
            question: 'City',
            key: 'personalInformation.city',
        },
        {
            question: 'Province',
            key: 'personalInformation.province',
        },
        {
            question: 'Postal Code',
            key: 'personalInformation.postalCode',
        },
    ];

    const contactInfo = [
        {
            question: 'Home Phone',
            key: 'contactInformation.homePhone',
        },
        {
            question: 'Cellular Phone',
            key: 'contactInformation.cellularPhone',
        },
        {
            question: 'Business Phone',
            key: 'contactInformation.businessPhone',
        },
        {
            question: 'Email Address',
            key: 'contactInformation.email',
        },
        {
            question: 'Preferred Method of Contact',
            key: 'contactInformation.preferredContact',
        },
        {
            question: 'Occupation',
            key: 'contactInformation.occupation',
        },
        {
            question: 'Name of Guardian',
            key: 'contactInformation.guardianName',
        },
        {
            question: 'Contact Number of Guardian',
            key: 'contactInformation.guardianPhone',
        },
    ];

    const emergencyInfo = [
        {
            question: 'Name',
            key: 'emergencyContacts.name',
        },
        {
            question: 'Relationship',
            key: 'emergencyContacts.relation',
        },
        {
            question: 'Contact Number',
            key: 'emergencyContacts.phone',
        },
    ];

    const familyDoctorInfo = [
        {
            question: 'Name',
            key: 'familyDoctor.name',
        },
        {
            question: 'Contact Number',
            key: 'familyDoctor.phone',
        },
        {
            question: 'Address',
            key: 'familyDoctor.address',
        },
    ];

    const specialistInfo = [
        {
            question: 'Name',
            key: 'specialist.name',
        },
        {
            question: 'Contact Number',
            key: 'specialist.phone',
        },
        {
            question: 'Address',
            key: 'specialist.address',
        },
    ];

    const pharmacyInfo = [
        {
            question: 'Name',
            key: 'pharmacy.name',
        },
        {
            question: 'Contact Number',
            key: 'pharmacy.number',
        },
    ];

    const identificationInfo = [
        {
            question: 'Name',
            key: 'identification.driversLicenseNumber',
        },
        {
            question: 'Contact Number',
            key: 'identification.ohipNumber',
        },
    ];

    const insuranceInfo = [
        {
            question: 'Do you have dental insurance?',
            key: 'insurance.dentalInsurance',
        },
        {
            question: 'Employer',
            key: 'insurance.employer',
        },
        {
            question: 'Primary Insurance Policy Number / Certificate Number',
            key: 'insurance.primaryInsurancePolicy',
        },
        {
            question: 'Primary Insurance Policy Number / Certificate Number',
            key: 'insurance.secondaryInsurancePolicy',
        },
    ];

    const referralInfo = [
        {
            question: 'How did you hear about our office?',
            key: 'referralSource',
        },
    ];

    const signatureInfo = [
        {
            question: 'Patient Signature',
            answer: patientData?.signatures?.patientSignature
                ? <img src={`data:image/png;base64,${patientData.signatures.patientSignature}`} alt="Patient Signature" />
                : 'No information provided.',
        },
        {
            question: 'Dentist Signature',
            answer: patientData?.signatures?.dentistSignature
                ? <img src={`data:image/png;base64,${patientData.signatures.dentistSignature}`} alt="Dentist Signature" />
                : 'No information provided.',
        },
    ];

    const displayedPersonalInfo = showMore ? personalInfo : personalInfo;
    const displayedContactInfo = showMore ? contactInfo : contactInfo;
    const displayedEmergencyInfo = showMore ? emergencyInfo : emergencyInfo;
    const displayedFamilyDoctorInfo = showMore ? familyDoctorInfo : familyDoctorInfo;
    const displayedSpecialistInfo = showMore ? specialistInfo : specialistInfo;
    const displayedPharmacyInfo = showMore ? pharmacyInfo : pharmacyInfo;
    const displayedIdentificationInfo = showMore ? identificationInfo : identificationInfo;
    const displayedInsuranceInfo = showMore ? insuranceInfo : insuranceInfo;
    const displayedReferralInfo = showMore ? referralInfo : referralInfo;
    const displayedSignatureInfo = showMore ? signatureInfo : signatureInfo;

    return (
        <>
            <PatientSummary params={params} />
            <div className={styles.container}>
                <div className={styles.containerHeader}>
                    <h3 className={styles.heading}>Patient Data</h3>
                    <button className={styles.editButton} onClick={handleEditToggle}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </button>
                </div>
                <Accordion>
                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Personal Information</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedPersonalInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                        <div className={styles.question}>{item.question}</div>
                                        <div className={styles.answer}>
                                            {isEditing ? (
                                                item.isBoolean ? (
                                                    <div className={styles.checkboxWrapper}>
                                                        <input
                                                            type="checkbox"
                                                            checked={item.key.includes('.')
                                                                ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                                : editableData[item.key] || false}
                                                            onChange={(e) => {
                                                                if (item.key.includes('.')) {
                                                                    const [mainKey, subKey] = item.key.split('.');
                                                                    setEditableData((prev) => ({
                                                                        ...prev,
                                                                        [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                    }));
                                                                } else {
                                                                    handleInputChange(item.key, e.target.checked);
                                                                }
                                                            }}
                                                            className={styles.checkboxInput}
                                                        />
                                                        <label className={styles.checkboxLabel}>
                                                            {editableData[item.key.includes('.')
                                                                ? item.key.split('.')[0]
                                                                : item.key]
                                                                ? 'Yes'
                                                                : 'No'}
                                                        </label>
                                                    </div>
                                                ) : item.key === 'personalInformation.dob' ? (
                                                    <input
                                                        type="date"
                                                        value={
                                                            editableData[item.key]
                                                                ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                                : ''
                                                        }
                                                        onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                        className={styles.dateInput}
                                                    />
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                            : editableData[item.key] || ''}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.value);
                                                            }
                                                        }}
                                                        className={styles.input}
                                                    />
                                                )
                                            ) : (
                                                <span>
                                                    {item.isBoolean
                                                        ? (item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                            : editableData[item.key])
                                                            ? 'Yes'
                                                            : 'No'
                                                        : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                            ? formatDate(editableData[item.key])
                                                            : item.key.includes('.')
                                                                ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                                : editableData[item.key] || 'No information provided.'}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Contact Information</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedContactInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Emergency Contact</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedEmergencyInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Family Doctor</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedFamilyDoctorInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Specialist</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedSpecialistInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Pharmacy</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedPharmacyInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Driver's License</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedIdentificationInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Dental Insurance</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedInsuranceInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Referral Source</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedReferralInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                    <div className={styles.question}>{item.question}</div>
                                    <div className={styles.answer}>
                                        {isEditing ? (
                                            item.isBoolean ? (
                                                <div className={styles.checkboxWrapper}>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || false
                                                            : editableData[item.key] || false}
                                                        onChange={(e) => {
                                                            if (item.key.includes('.')) {
                                                                const [mainKey, subKey] = item.key.split('.');
                                                                setEditableData((prev) => ({
                                                                    ...prev,
                                                                    [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                                                                }));
                                                            } else {
                                                                handleInputChange(item.key, e.target.checked);
                                                            }
                                                        }}
                                                        className={styles.checkboxInput}
                                                    />
                                                    <label className={styles.checkboxLabel}>
                                                        {editableData[item.key.includes('.')
                                                            ? item.key.split('.')[0]
                                                            : item.key]
                                                            ? 'Yes'
                                                            : 'No'}
                                                    </label>
                                                </div>
                                            ) : item.key === 'personalInformation.dob' ? (
                                                <input
                                                    type="date"
                                                    value={
                                                        editableData[item.key]
                                                            ? new Date(editableData[item.key]).toISOString().split('T')[0]
                                                            : ''
                                                    }
                                                    onChange={(e) => handleInputChange(item.key, e.target.value)}
                                                    className={styles.dateInput}
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                                                        : editableData[item.key] || ''}
                                                    onChange={(e) => {
                                                        if (item.key.includes('.')) {
                                                            const [mainKey, subKey] = item.key.split('.');
                                                            setEditableData((prev) => ({
                                                                ...prev,
                                                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.value },
                                                            }));
                                                        } else {
                                                            handleInputChange(item.key, e.target.value);
                                                        }
                                                    }}
                                                    className={styles.input}
                                                />
                                            )
                                        ) : (
                                            <span>
                                                {item.isBoolean
                                                    ? (item.key.includes('.')
                                                        ? editableData[item.key.split('.')[0]][item.key.split('.')[1]]
                                                        : editableData[item.key])
                                                        ? 'Yes'
                                                        : 'No'
                                                    : item.key === 'lastMedicalCheckup' && editableData[item.key]
                                                        ? formatDate(editableData[item.key])
                                                        : item.key.includes('.')
                                                            ? editableData[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                                                            : editableData[item.key] || 'No information provided.'}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    {isEditing && (
                        <><button className={styles.saveButton} onClick={handleSave}>
                            Save
                        </button><br /></>
                    )}

                    <Accordion type="single" collapsible className={styles.accordion} defaultValue="">
                        <AccordionItem value="medicalHistory" className={styles.accordionItem}>
                            <AccordionTrigger className={styles.accordionTrigger}>
                                <span>Consent Signatures</span>
                            </AccordionTrigger>
                            <AccordionContent className={styles.accordionContent}>
                                {displayedSignatureInfo.map((item, index) => (
                                    <div key={index} className={styles.questionAnswer}>
                                        <div className={styles.question}>{item.question}</div>
                                        <div className={styles.answer}>{item.answer}</div>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Accordion>

            </div>
        </>
    );
}
