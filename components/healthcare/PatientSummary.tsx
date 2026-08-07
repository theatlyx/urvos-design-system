import React from 'react';
import { clsx } from 'clsx';
import { User, Phone, Mail, MapPin, Hash, Calendar, Heart, ShieldAlert } from 'lucide-react';

export interface PatientSummaryData {
  id: string;
  name: string;
  dob: string;
  gender: string;
  mrn: string;
  phone?: string;
  email?: string;
  address?: string;
  bloodType?: string;
  allergies?: string[];
  primaryProvider?: string;
  avatarUrl?: string;
}

export interface PatientSummaryProps extends React.HTMLAttributes<HTMLDivElement> {
  patient: PatientSummaryData;
}

export function PatientSummary({ patient, className, ...props }: PatientSummaryProps) {
  const age = Math.floor((new Date().getTime() - new Date(patient.dob).getTime()) / 31557600000);

  return (
    <div className={clsx('bg-urvos-surface border border-urvos-border rounded-urvos-lg shadow-urvos-soft overflow-hidden', className)} {...props}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-urvos-primary/10 to-urvos-background p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border-b border-urvos-border">
        {patient.avatarUrl ? (
          <img src={patient.avatarUrl} alt={patient.name} className="w-24 h-24 rounded-full border-4 border-urvos-surface shadow-sm object-cover" />
        ) : (
          <div className="w-24 h-24 rounded-full bg-urvos-primary/20 flex items-center justify-center border-4 border-urvos-surface shadow-sm text-urvos-primary">
            <User className="w-12 h-12" />
          </div>
        )}
        
        <div className="flex-1 text-center md:text-left space-y-2">
          <h2 className="text-2xl font-bold text-urvos-text">{patient.name}</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-urvos-text-muted">
            <span className="flex items-center"><Calendar className="w-4 h-4 mr-1" /> {patient.dob} ({age} yrs)</span>
            <span className="flex items-center"><User className="w-4 h-4 mr-1" /> {patient.gender}</span>
            <span className="flex items-center"><Hash className="w-4 h-4 mr-1" /> MRN: {patient.mrn}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-urvos-border">
        {/* Contact Info */}
        <div className="p-5 space-y-4">
          <h3 className="text-sm font-semibold text-urvos-text-muted uppercase tracking-wider mb-2">Contact</h3>
          {patient.phone && (
            <div className="flex items-start">
              <Phone className="w-4 h-4 text-urvos-primary mt-0.5 mr-3" />
              <span className="text-sm text-urvos-text">{patient.phone}</span>
            </div>
          )}
          {patient.email && (
            <div className="flex items-start">
              <Mail className="w-4 h-4 text-urvos-primary mt-0.5 mr-3" />
              <span className="text-sm text-urvos-text">{patient.email}</span>
            </div>
          )}
          {patient.address && (
            <div className="flex items-start">
              <MapPin className="w-4 h-4 text-urvos-primary mt-0.5 mr-3" />
              <span className="text-sm text-urvos-text">{patient.address}</span>
            </div>
          )}
        </div>

        {/* Clinical Summary */}
        <div className="p-5 space-y-4">
          <h3 className="text-sm font-semibold text-urvos-text-muted uppercase tracking-wider mb-2">Clinical Details</h3>
          {patient.bloodType && (
            <div className="flex items-start">
              <Heart className="w-4 h-4 text-urvos-danger mt-0.5 mr-3" />
              <div className="text-sm">
                <span className="text-urvos-text-muted mr-1">Blood Type:</span>
                <span className="text-urvos-text font-medium">{patient.bloodType}</span>
              </div>
            </div>
          )}
          {patient.primaryProvider && (
            <div className="flex items-start">
              <User className="w-4 h-4 text-urvos-primary mt-0.5 mr-3" />
              <div className="text-sm">
                <span className="text-urvos-text-muted mr-1">PCP:</span>
                <span className="text-urvos-text font-medium">{patient.primaryProvider}</span>
              </div>
            </div>
          )}
        </div>

        {/* Alerts & Allergies */}
        <div className="p-5 space-y-4 bg-urvos-danger-bg">
          <h3 className="text-sm font-semibold text-urvos-danger uppercase tracking-wider mb-2 flex items-center">
            <ShieldAlert className="w-4 h-4 mr-2" />
            Allergies
          </h3>
          {patient.allergies && patient.allergies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {patient.allergies.map(allergy => (
                <span key={allergy} className="px-2 py-1 bg-urvos-danger-bg text-urvos-danger border border-urvos-danger/20 rounded-urvos-sm text-xs font-medium">
                  {allergy}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-urvos-text-muted italic">No known allergies</p>
          )}
        </div>
      </div>
    </div>
  );
}
