import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive";

type ToastProps = {
  title: string;
  description: string;
  variant?: ToastVariant;
};

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = useCallback((props: ToastProps) => {
    const id = Date.now();
    setToasts((prev) => [...prev, props]);
    console.log(`Toast: ${props.title} - ${props.description}`);
    
    // Em um ambiente real, isso seria exibido na UI
    setTimeout(() => {
      setToasts((prev) => prev.filter((_, i) => i !== 0));
    }, 3000);
    
    return id;
  }, []);

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((_, i) => i !== id));
  }, []);

  return { toast, dismiss, toasts };
}
