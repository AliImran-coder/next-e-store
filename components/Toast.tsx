"use client";

import { useEffect } from "react";
import { CheckCircle2, X } from "lucide-react";
import { useRouter } from "next/navigation";
type ToastProps = {
  message: string;
  show: boolean;
  onClose: () => void;
};

function Toast({ message, show, onClose }: ToastProps) {
  const router = useRouter();

  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 7000);

    return () => clearTimeout(timer);
  }, [show, onClose]);

  if (!show) return null;

  const handleGoToCart = () => {
    onClose();
    router.push("/cart");
  };

  return (
    <div
      role="status"
      aria-live="polite"
      onClick={handleGoToCart}
      className="fixed right-3 top-3 z-[200] flex w-[calc(100%-1.5rem)] max-w-sm items-start gap-3 rounded-xl border border-gray-500 bg-gray-700 px-4 py-4 text-white shadow-xl sm:right-5 sm:top-5 sm:w-auto sm:min-w-[280px] sm:max-w-md sm:items-center sm:px-5 sm:py-5 cursor-pointer"
    >
      <CheckCircle2
        size={22}
        className="mt-0.5 shrink-0 text-green-400 sm:mt-0"
        aria-hidden="true"
      />

      <p className="min-w-0 flex-1 break-words text-sm font-medium leading-5 sm:text-base">
        {message}
      </p>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close notification"
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        <X size={20} />
      </button>
    </div>
  );
}

export default Toast;