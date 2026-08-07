"use client";

import React, { forwardRef, useRef, useState } from "react";
import { UploadCloud, X, File as FileIcon } from "lucide-react";
import { clsx } from "clsx";

export interface FileUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  maxSizeMB?: number;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      label,
      error,
      onFilesChange,
      maxFiles = 1,
      maxSizeMB = 5,
      className,
      onChange,
      ...props
    },
    ref
  ) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | File[]) => {
      let newFiles = Array.from(files);
      
      if (maxFiles === 1) {
        newFiles = [newFiles[0]];
      } else {
        newFiles = [...selectedFiles, ...newFiles].slice(0, maxFiles);
      }

      // Check sizes
      const validFiles = newFiles.filter(f => f.size <= maxSizeMB * 1024 * 1024);

      setSelectedFiles(validFiles);
      if (onFilesChange) onFilesChange(validFiles);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        handleFiles(e.target.files);
      }
      if (onChange) onChange(e);
    };

    const handleDrag = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFiles(e.dataTransfer.files);
      }
    };

    const removeFile = (index: number) => {
      const updated = selectedFiles.filter((_, i) => i !== index);
      setSelectedFiles(updated);
      if (onFilesChange) onFilesChange(updated);
    };

    return (
      <div className={clsx("field", className)}>
        {label && <label className="field__label">{label}</label>}
        
        <div
          className={clsx(
            "file-upload",
            dragActive && "file-upload--active",
            error && "file-upload--error"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={(e) => {
              // @ts-ignore
              inputRef.current = e;
              if (typeof ref === "function") ref(e);
              else if (ref) ref.current = e;
            }}
            type="file"
            className="hidden"
            onChange={handleChange}
            multiple={maxFiles > 1}
            {...props}
          />
          <UploadCloud className="file-upload__icon" />
          <p className="file-upload__text">
            Drag & drop files or <span className="file-upload__browse">browse</span>
          </p>
          <p className="file-upload__hint">
            Max {maxSizeMB}MB {maxFiles > 1 ? `(up to ${maxFiles} files)` : ""}
          </p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="file-upload__list">
            {selectedFiles.map((file, i) => (
              <div key={`${file.name}-${i}`} className="file-upload__item">
                <FileIcon className="w-4 h-4 text-urvos-ink/60" />
                <span className="file-upload__filename">{file.name}</span>
                <button
                  type="button"
                  className="file-upload__remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {error && <div className="field__error">⚠ {error}</div>}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
