"use client";

import * as React from "react";
import Image from "next/image";
import { UploadCloud, X, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { uploadService, type Upload } from "@/services/api/upload.service";
import { ApiError } from "@/services/api/api-error";
import { toast } from "sonner";

interface FileUploadFieldProps {
  value?: Upload | null;
  onChange: (upload: Upload | null) => void;
  accept?: string;
  maxSizeMb?: number;
  variant?: "image" | "file";
  disabled?: boolean;
  className?: string;
}

export function FileUploadField({
  value,
  onChange,
  accept = "image/*",
  maxSizeMb = 25,
  variant = "image",
  disabled,
  className,
}: FileUploadFieldProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  const handleFile = React.useCallback(
    async (file: File) => {
      if (file.size > maxSizeMb * 1024 * 1024) {
        toast.error(`File must be smaller than ${maxSizeMb}MB`);
        return;
      }

      setIsUploading(true);
      setProgress(0);

      try {
        const upload = await uploadService.upload(file, setProgress);
        onChange(upload);
      } catch (error) {
        toast.error(error instanceof ApiError ? error.message : "Upload failed");
      } finally {
        setIsUploading(false);
      }
    },
    [maxSizeMb, onChange]
  );

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) void handleFile(file);
  };

  if (value) {
    return (
      <div className={cn("relative rounded-xl border border-border p-3", className)}>
        <div className="flex items-center gap-3">
          {variant === "image" ? (
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image src={value.secureUrl} alt={value.originalName} fill className="object-cover" />
            </div>
          ) : (
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
              <FileText className="h-6 w-6 text-muted-foreground" />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{value.originalName}</p>
            <p className="text-xs text-muted-foreground">{(value.sizeBytes / 1024).toFixed(0)} KB</p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={() => onChange(null)}
            aria-label="Remove file"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") inputRef.current?.click();
      }}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-8 text-center transition-colors",
        isDragging ? "border-primary bg-amber-50 dark:bg-amber-900/10" : "border-border-strong",
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleFile(file);
        }}
      />
      {isUploading ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <Progress value={progress} className="w-32" />
          <p className="text-xs text-muted-foreground">Uploading… {progress}%</p>
        </>
      ) : (
        <>
          <UploadCloud className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-muted-foreground">
            {variant === "image" ? "PNG, JPG, WEBP" : "PDF, DOCX, TXT"} up to {maxSizeMb}MB
          </p>
        </>
      )}
    </div>
  );
}
