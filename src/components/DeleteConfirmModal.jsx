import { X } from 'lucide-react'

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, habitName }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-gray-200 dark:border-slate-800">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100">
              Delete Habit
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
              This action cannot be undone
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-2">
          <p className="text-sm text-gray-700 dark:text-slate-300">
            Are you sure you want to delete <span className="font-semibold text-gray-900 dark:text-slate-100">"{habitName}"</span> and all its history? This will permanently remove all check-ins and progress data.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Delete Habit
          </button>
        </div>
      </div>
    </div>
  )
}
