export default function ConfirmModal({ isOpen, title, onConfirm, onCancel, confirmText = "Confirmar", cancelText = "Cancelar", loading = false, children, }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs px-4">
            <div className="w-full max-w-md rounded-xl bg-surface border border-outline p-6 shadow-2xl">
                <h2 className="font-display text-xl font-bold text-on-surface">
                    {title}
                </h2>

                <div className="mt-3 text-sm text-on-surface-muted leading-relaxed">
                    {children}
                </div>

                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg border border-outline text-sm font-medium text-on-surface hover:bg-surface-high transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {cancelText}
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-hover text-sm font-semibold text-white transition-colors disabled:opacity-50 cursor-pointer"
                    >
                        {loading ? "Procesando..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}