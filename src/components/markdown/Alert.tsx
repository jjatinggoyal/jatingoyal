import React from 'react';
import { AlertCircle, Info, AlertTriangle } from 'lucide-react';

type AlertType = 'info' | 'warning' | 'error';

interface AlertProps {
  type: AlertType;
  children: React.ReactNode;
}

const alertStyles: Record<AlertType, { bg: string; border: string; icon: React.ReactNode }> = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/50',
    border: 'border-blue-200 dark:border-blue-800',
    icon: <Info className="w-5 h-5 text-blue-500 dark:text-blue-400" />
  },
  warning: {
    bg: 'bg-yellow-50 dark:bg-yellow-950/50',
    border: 'border-yellow-200 dark:border-yellow-800',
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/50',
    border: 'border-red-200 dark:border-red-800',
    icon: <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
  }
};

const Alert: React.FC<AlertProps> = ({ type, children }) => {
  const styles = alertStyles[type];

  return (
    <div className={`my-4 p-4 rounded-lg border ${styles.bg} ${styles.border} flex gap-3`}>
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <div className="flex-1 text-slate-700 dark:text-slate-300">
        {children}
      </div>
    </div>
  );
};

export default Alert;