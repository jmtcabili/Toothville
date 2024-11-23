'use client';
import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import styles from './page.module.css';
import PatientSummary from '../PatientSummary';

export default function HistoryPage({ params }) {
  const { id } = params;
  const [medicalHistory, setMedicalHistory] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    async function fetchMedicalHistory() {
      try {
        const response = await fetch(`/api/medical-history?_id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const patient = await response.json();
        setMedicalHistory(patient.medicalHistory);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    }

    fetchMedicalHistory();
  }, [id]);

  if (!medicalHistory) {
    return <div className={styles.loading}>Loading medical history...</div>;
  }

  const questionsAndAnswers = [
    {
      question: 'Are you being treated for any medical condition at the present or have been treated within the past year?',
      answer: medicalHistory.treatedMedicalReason || 'No information provided.',
    },
    {
      question: 'When was your last medical checkup?',
      answer: medicalHistory.lastMedicalCheckup
        ? new Date(medicalHistory.lastMedicalCheckup).toLocaleDateString()
        : 'No information provided.',
    },
    {
      question: 'Has there been any change in your general health in the past year?',
      answer: medicalHistory.healthChangeReason || 'No information provided.',
    },
    {
      question: 'Are you taking any medications, non-prescription drugs, or natural supplements of any kind?',
      answer: medicalHistory.medicationsList || 'No information provided.',
    },
    {
      question: 'Do you have any allergies?',
      answer: `
        Medications: ${medicalHistory.allergies?.medications || 'None'},
        Latex / Rubber Products / Metals: ${medicalHistory.allergies?.latexRubberMetals || 'None'},
        Others: ${medicalHistory.allergies?.others || 'None'}
      `,
    },
    {
      question: 'Have you ever had a peculiar or adverse reaction to any medications or injections?',
      answer: medicalHistory.adverseReaction
        ? medicalHistory.reactionExplanation || 'Yes'
        : 'No',
    },
    {
      question: 'Do you have or ever had asthma?',
      answer: medicalHistory.asthma ? 'Yes' : 'No',
    },
    {
      question: 'Do you have or ever had any heart or blood pressure problems?',
      answer: medicalHistory.heartIssues ? 'Yes' : 'No',
    },
    {
      question:
        'Do you have or ever had a replacement or repair of a heart valve, infection of the heart (infective endocarditis), a heart condition from birth (congenital heart disease), or a heart transplant?',
      answer: medicalHistory.heartSurgery ? 'Yes' : 'No',
    },
  ];

  const displayedQuestions = showMore ? questionsAndAnswers : questionsAndAnswers.slice(0, 2);

  return (
    <>
      <PatientSummary params={params} />
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h3 className={styles.heading}>Patient History</h3>
          <button className={styles.editButton}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
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
                  <div className={styles.answer}>{item.answer}</div>
                </div>
              ))}
              <button
                className={styles.showMoreButton}
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Show Less' : 'More'}
              </button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}
