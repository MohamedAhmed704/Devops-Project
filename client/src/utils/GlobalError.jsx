import { AlertTriangle, RotateCcw } from "lucide-react";

export default function GlobalError({
  title = "Something went wrong",
  message = "We couldn’t load the data. Please try again.",
  onRetry,
}) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl max-w-md w-full">
        <div className="flex justify-center mb-4 text-red-600 dark:text-red-400">
          <AlertTriangle size={40} />
        </div>

        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          {title}
        </h2>

        <p className="text-slate-600 dark:text-slate-400 mt-2">
          {message}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
          >
            <RotateCcw size={16} />
            Retry
          </button>
        )}
      </div>
    </div>
  );
}
