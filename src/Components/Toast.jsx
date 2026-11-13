import PropTypes from 'prop-types';

const Toast = ({ toasts, onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-5 z-50 flex flex-col gap-2 pointer-events-none sm:max-w-sm">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 ${
              isSuccess
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : isWarning
                ? 'bg-amber-950/90 border-amber-500/40 text-amber-200'
                : 'bg-slate-900/90 border-slate-700/60 text-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-medium">
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                isSuccess ? 'bg-emerald-400' : isWarning ? 'bg-amber-400' : 'bg-blue-400'
              }`}></span>
              <p className="leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-xs opacity-70 hover:opacity-100 px-2 py-1 rounded transition-opacity font-medium flex-shrink-0"
              aria-label="Dismiss notification"
            >
              Dismiss
            </button>
          </div>
        );
      })}
    </div>
  );
};

Toast.propTypes = {
  toasts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default Toast;
