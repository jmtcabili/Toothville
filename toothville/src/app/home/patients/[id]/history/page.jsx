'use client';
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import styles from './page.module.css';
import PatientSummary from '../PatientSummary';

export default function HistoryPage({ params }) {
  const { id } = params;
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableHistory, setEditableHistory] = useState(null);

  useEffect(() => {
    async function fetchMedicalHistory() {
      try {
        const response = await fetch(`/api/medical-history?_id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const patient = await response.json();
        const history = patient.medicalHistory || {};
        const initializedHistory = {
          treatedMedicalReason: history.treatedMedicalReason || '',
          lastMedicalCheckup: history.lastMedicalCheckup || '',
          healthChangeReason: history.healthChangeReason || '',
          medicationsList: history.medicationsList || '',
          allergies: {
            medications: history.allergies?.medications || '',
            latexRubberMetals: history.allergies?.latexRubberMetals || '',
            others: history.allergies?.others || '',
          },
          adverseReaction: history.adverseReaction || false,
          reactionExplanation: history.reactionExplanation || '',
          asthma: history.asthma || false,
          heartIssues: history.heartIssues || false,
          heartSurgery: history.heartSurgery || false,
        };
        setMedicalHistory(history);
        setEditableHistory(initializedHistory);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    }

    fetchMedicalHistory();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (key, value) => {
    setEditableHistory((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      // Flatten nested fields before sending if necessary
      const preparedData = { ...editableHistory };

      // Convert fields as needed, e.g., dates back to ISO format
      if (preparedData.lastMedicalCheckup) {
        preparedData.lastMedicalCheckup = new Date(preparedData.lastMedicalCheckup).toISOString();
      }

      const response = await fetch(`/api/medical-history?_id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        throw new Error(`Error saving data: ${response.statusText}`);
      }

      const updatedData = await response.json();
      setMedicalHistory(updatedData.medicalHistory);
      setEditableHistory(updatedData.medicalHistory);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving medical history:', error);
    }
  };


  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  };

  if (!medicalHistory) {
    return <div className={styles.loading}>Loading medical history...</div>;
  }

  const questionsAndAnswers = [
    {
      key: 'treatedMedicalReason',
      question: 'Are you being treated for any medical condition at the present or have been treated within the past year?',
    },
    {
      key: 'lastMedicalCheckup',
      question: 'When was your last medical checkup?',
    },
    {
      key: 'healthChangeReason',
      question: 'Has there been any change in your general health in the past year?',
    },
    {
      key: 'medicationsList',
      question: 'Are you taking any medications, non-prescription drugs, or natural supplements of any kind?',
    },
    {
      key: 'allergies.medications',
      question: 'Do you have any allergies to medications?',
    },
    {
      key: 'allergies.latexRubberMetals',
      question: 'Do you have any allergies to latex, rubber, or metals?',
    },
    {
      key: 'allergies.others',
      question: 'Do you have other allergies?',
    },
    {
      key: 'adverseReaction',
      question: 'Have you ever had a peculiar or adverse reaction to any medications or injections?',
      isBoolean: true,
    },
    {
      key: 'reactionExplanation',
      question: 'If yes, explain the reaction.',
    },
    {
      key: 'asthma',
      question: 'Do you have or ever had asthma?',
      isBoolean: true,
    },
    {
      key: 'heartIssues',
      question: 'Do you have or ever had any heart or blood pressure problems?',
      isBoolean: true,
    },
    {
      key: 'heartSurgery',
      question:
        'Do you have or ever had a replacement or repair of a heart valve, infection of the heart, congenital heart disease, or a heart transplant?',
      isBoolean: true,
    },
  ];


  const displayedQuestions = showMore ? questionsAndAnswers : questionsAndAnswers.slice(0, 2);

  return (
    <>
      <PatientSummary params={params} />
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h3 className={styles.heading}>Patient History</h3>
          <button className={styles.editButton} onClick={handleEditToggle}>
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <Accordion type="single" collapsible className={styles.accordion} defaultValue="medicalHistory">
          <AccordionItem value="medicalHistory" className={styles.accordionItem}>
            <AccordionTrigger className={styles.accordionTrigger}>
              <span>Medical History</span>
            </AccordionTrigger>
            <AccordionContent className={styles.accordionContent}>
              {displayedQuestions.map((item, index) => (
                <div key={index} className={styles.questionAnswer}>
                  <div className={styles.question}>{item.question}</div>
                  <div className={styles.answer}>
                    {isEditing ? (
                      item.isBoolean ? (
                        <input
                          type="checkbox"
                          checked={item.key.includes('.')
                            ? editableHistory[item.key.split('.')[0]][item.key.split('.')[1]] || false
                            : editableHistory[item.key] || false}
                          onChange={(e) => {
                            if (item.key.includes('.')) {
                              const [mainKey, subKey] = item.key.split('.');
                              setEditableHistory((prev) => ({
                                ...prev,
                                [mainKey]: { ...prev[mainKey], [subKey]: e.target.checked },
                              }));
                            } else {
                              handleInputChange(item.key, e.target.checked);
                            }
                          }}
                        />
                      ) : (
                        <input
                          type="text"
                          value={item.key.includes('.')
                            ? editableHistory[item.key.split('.')[0]][item.key.split('.')[1]] || ''
                            : editableHistory[item.key] || ''}
                          onChange={(e) => {
                            if (item.key.includes('.')) {
                              const [mainKey, subKey] = item.key.split('.');
                              setEditableHistory((prev) => ({
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
                            ? editableHistory[item.key.split('.')[0]][item.key.split('.')[1]]
                            : editableHistory[item.key])
                            ? 'Yes'
                            : 'No'
                          : item.key === 'lastMedicalCheckup' && editableHistory[item.key]
                            ? formatDate(editableHistory[item.key])
                            : item.key.includes('.')
                              ? editableHistory[item.key.split('.')[0]][item.key.split('.')[1]] || 'No information provided.'
                              : editableHistory[item.key] || 'No information provided.'}
                      </span>
                    )}
                  </div>

                </div>
              ))}
              {isEditing && (
                <button className={styles.saveButton} onClick={handleSave}>
                  Save
                </button>
              )}
              {!isEditing && (
                <button
                  className={styles.showMoreButton}
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Show Less' : 'More'}
                </button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
