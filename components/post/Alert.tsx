import React from 'react';
import { AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertProps {
  type?: AlertType;
  children: React.ReactNode;
}

const Alert: React.FC<AlertProps> = ({ type = 'info', children }) => {
  const styles = {
    info: {
      container: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      icon: 'text-blue-600 dark:text-blue-400',
      text: 'text-blue-800 dark:text-blue-200'
    },
    success: {
      container: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      icon: 'text-green-600 dark:text-green-400',
      text: 'text-green-800 dark:text-green-200'
    },
    warning: {
      container: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      icon: 'text-yellow-600 dark:text-yellow-400',
      text: 'text-yellow-800 dark:text-yellow-200'
    },
    error: {
      container: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
      icon: 'text-red-600 dark:text-red-400',
      text: 'text-red-800 dark:text-red-200'
    }
  };

  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle
  };

  const Icon = icons[type];

  return (
    <div className={`flex items-start p-4 mb-6 border rounded-lg ${styles[type].container}`}>
      <Icon className={`h-5 w-5 mt-0.5 mr-3 ${styles[type].icon}`} />
      <div className={`flex-1 ${styles[type].text}`}>
        {children}
      </div>
    </div>
  );
};

export default Alert; 