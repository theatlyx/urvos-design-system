import React, { useState } from 'react';
import { clsx } from 'clsx';
import { Search, Loader2, User } from 'lucide-react';

export interface PatientSearchResult {
  id: string;
  name: string;
  dob?: string;
  gender?: string;
  mrn?: string;
  avatarUrl?: string;
  resourceType?: 'Patient'; // For FHIR compatibility
}

export interface PatientSearchProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  onSearch: (query: string) => Promise<PatientSearchResult[]>;
  onSelect: (patient: PatientSearchResult) => void;
  placeholder?: string;
  debounceMs?: number;
}

export function PatientSearch({
  onSearch,
  onSelect,
  placeholder = 'Search patients by name, DOB, or MRN...',
  debounceMs = 300,
  className,
  ...props
}: PatientSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<PatientSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setIsOpen(true);
    try {
      // In a real app, use a proper debounce hook
      const res = await onSearch(val);
      setResults(res);
    } catch (err) {
      console.error(err);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={clsx('relative w-full', className)} {...props}>
      <div className="relative flex items-center w-full">
        <Search className="absolute left-3 w-5 h-5 text-urvos-text-muted" />
        <input
          type="text"
          className="w-full pl-10 pr-4 py-2 bg-urvos-surface border border-urvos-border rounded-urvos-md text-urvos-text placeholder-urvos-text-muted focus:outline-none focus:ring-2 focus:ring-urvos-primary"
          placeholder={placeholder}
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        {isLoading && (
          <Loader2 className="absolute right-3 w-5 h-5 text-urvos-primary animate-spin" />
        )}
      </div>

      {isOpen && (query.trim().length > 0) && (
        <div className="absolute z-50 w-full mt-2 bg-urvos-surface border border-urvos-border rounded-urvos-md shadow-urvos-hover overflow-hidden max-h-80 overflow-y-auto">
          {results.length === 0 && !isLoading ? (
            <div className="p-4 text-sm text-urvos-text-muted text-center">
              No patients found for "{query}"
            </div>
          ) : (
            <ul className="divide-y divide-urvos-border">
              {results.map((patient) => (
                <li
                  key={patient.id}
                  className="p-3 hover:bg-urvos-surface-alt cursor-pointer flex items-center space-x-3 transition-colors"
                  onClick={() => {
                    onSelect(patient);
                    setIsOpen(false);
                    setQuery('');
                  }}
                >
                  {patient.avatarUrl ? (
                    <img src={patient.avatarUrl} alt={patient.name} className="w-10 h-10 rounded-full" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-urvos-primary/10 flex items-center justify-center text-urvos-primary">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-urvos-text truncate">{patient.name}</p>
                    <div className="flex space-x-2 text-xs text-urvos-text-muted mt-1">
                      {patient.dob && <span>DOB: {patient.dob}</span>}
                      {patient.mrn && <span>MRN: {patient.mrn}</span>}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
