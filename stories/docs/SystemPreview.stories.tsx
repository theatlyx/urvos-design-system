import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComparisonContainer } from './components/ComparisonContainer';
import { PatientBanner } from '../../components/healthcare/PatientBanner';
import { PatientTimeline } from '../../components/healthcare/PatientTimeline';
import { PatientSummary } from '../../components/healthcare/PatientSummary';
import { AllergyManager } from "../../components/healthcare/AllergyManager";
import { MedicationList } from "../../components/healthcare/MedicationList";
import { TelehealthViewer } from '../../components/healthcare/TelehealthViewer';
import { FavoriteOrdersPanel } from '../../components/healthcare/FavoriteOrdersPanel';

// Assuming we have these mock data available or we can just pass empty/minimal props for visual testing
const mockPatient = {
  id: "P-10024",
  name: "Eleanor Rigby",
  dob: "1943-12-04",
  age: 80,
  gender: "Female",
  mrn: "MRN-8849201",
  status: "admitted" as const,
  room: "ICU-4B",
  attending: "Dr. J. Smith",
  alerts: ["Fall Risk", "Penicillin Allergy"]
};

const meta: Meta = {
  title: 'System/Full System Preview',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const ComponentGallery: Story = {
  render: () => (
    <ComparisonContainer>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        <section>
          <h2 className="text-xl font-bold mb-4 text-urvos-text-primary">Patient Banner</h2>
          <PatientBanner patient={mockPatient} />
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-urvos-text-primary">Patient Summary</h2>
          <PatientSummary 
            patient={mockPatient}
            vitals={{
              bp: "120/80",
              hr: 72,
              temp: 98.6,
              o2: 99
            }}
          />
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-urvos-text-primary">Allergies & Medications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AllergyManager 
              allergies={[
                { 
                  resourceType: "AllergyIntolerance",
                  id: "1", 
                  code: { text: "Penicillin" },
                  criticality: "high",
                  reaction: [{ manifestation: [{ text: "Hives" }] }] 
                },
                { 
                  resourceType: "AllergyIntolerance",
                  id: "2", 
                  code: { text: "Peanuts" },
                  criticality: "high",
                  reaction: [{ manifestation: [{ text: "Anaphylaxis" }] }] 
                }
              ]} 
            />
            <MedicationList 
              medications={[
                { 
                  resourceType: "MedicationRequest",
                  id: "1", 
                  medicationCodeableConcept: { text: "Lisinopril" },
                  dosageInstruction: [{ text: "10mg Daily" }],
                  status: "active" 
                },
                { 
                  resourceType: "MedicationRequest",
                  id: "2", 
                  medicationCodeableConcept: { text: "Metformin" },
                  dosageInstruction: [{ text: "500mg BID" }],
                  status: "active" 
                }
              ]} 
            />
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4 text-urvos-text-primary">Telehealth Viewer</h2>
          <div className="h-[400px]">
            <TelehealthViewer 
              patientName="Eleanor Rigby"
              providerName="Dr. Smith"
              status="connected"
              duration="12:45"
            />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4 text-urvos-text-primary">Favorite Orders Panel</h2>
          <FavoriteOrdersPanel 
            orders={[
              { id: "1", name: "CBC w/ Auto Diff", type: "Laboratory", details: "Routine Blood Work" },
              { id: "2", name: "Ibuprofen 400mg", type: "Medication", details: "PO Q6H PRN Pain" }
            ]}
          />
        </section>
      </div>
    </ComparisonContainer>
  ),
};
