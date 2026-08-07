import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { ToothData } from '../ToothChart';

interface NotesTabProps {
  activeTooth: ToothData;
  onAddNote: (toothId: string, type: string, text: string) => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({ activeTooth, onAddNote }) => {
  const [noteType, setNoteType] = useState('SOAP Note');
  const [noteText, setNoteText] = useState('');

  const handleSave = () => {
    if (!noteText.trim()) return;
    onAddNote(activeTooth.id, noteType, noteText);
    setNoteText('');
  };

  return (
    <div className="space-y-4 flex flex-col">
      <div className="bg-white p-4 rounded-xl border border-urvos-border shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-urvos-text">Add Clinical Note</h3>
        <div className="flex gap-2">
          <select 
            value={noteType}
            onChange={(e) => setNoteType(e.target.value)}
            className="text-xs border border-urvos-border rounded-md px-2 py-1.5 bg-gray-50 text-urvos-text outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="SOAP Note">SOAP Note</option>
            <option value="Observation">Observation</option>
            <option value="Recommendation">Recommendation</option>
            <option value="Alert">Alert</option>
          </select>
        </div>
        <textarea 
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Enter clinical note details..."
          className="w-full text-sm border border-urvos-border rounded-md p-3 min-h-[100px] outline-none focus:ring-1 focus:ring-blue-500 resize-none"
        />
        <div className="flex justify-end">
          <button 
            onClick={handleSave}
            disabled={!noteText.trim()}
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Save Note
          </button>
        </div>
      </div>
      
      {activeTooth.notes && activeTooth.notes.length > 0 ? (
        <div className="space-y-3 mt-4">
           {activeTooth.notes.map((note) => (
              <div key={note.id} className="bg-white p-3 rounded-lg border border-urvos-border shadow-sm">
                <div className="flex items-center justify-between mb-2">
                   <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-700">{note.type}</span>
                   <span className="text-xs text-gray-500">{new Date(note.timestamp).toLocaleDateString()}</span>
                </div>
                <p className="text-sm text-urvos-text whitespace-pre-wrap">{note.text}</p>
              </div>
           ))}
        </div>
      ) : (
        <div className="py-8 flex flex-col items-center text-center opacity-50">
          <FileText className="w-8 h-8 mb-2 mx-auto text-gray-400" />
          <p className="text-xs text-urvos-text-muted">No notes available.</p>
        </div>
      )}
    </div>
  );
};
