"use client";

import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

type ToastProps = {
  id: number;
  title: string;
  description: string;
  variant?: "default" | "destructive";
  onDismiss: () => void;
};

export function Toast({ id, title, description, variant = "default", onDismiss }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // dar tempo para a animação de fade out
    }, 5000);

    return () => clearTimeout(timer);
  }, [onDismiss]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-md shadow-lg transition-all duration-300 ${variant === "destructive" ? "bg-red-50 text-red-900" : "bg-white text-zinc-900"} p-4 flex items-start gap-3 max-w-md`}
    >
      {variant === "destructive" ? (
        <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
      ) : (
        <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
      )}
      <div className="flex-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm opacity-80">{description}</p>
      </div>
      <button onClick={onDismiss} className="shrink-0">
        <X className="h-5 w-5 opacity-50 hover:opacity-100" />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onDismiss }: { toasts: any[]; onDismiss: (id: number) => void }) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast, index) => (
        <Toast key={index} id={index} {...toast} onDismiss={() => onDismiss(index)} />
      ))}
    </div>
  );
}
