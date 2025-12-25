import {
  AlertCircle,
  RefreshCw,
  WifiOff,
  Database,
  ServerCrash,
  AlertTriangle,
  Clock,
  FileX,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

// Type definitions
export type ErrorType =
  | "server"
  | "network"
  | "database"
  | "notfound"
  | "timeout"
  | "unauthorized"
  | "empty"
  | "generic";

export type SizeType = "sm" | "md" | "lg";

export interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  retryLabel?: string;
  backLabel?: string;
  fullScreen?: boolean;
  size?: SizeType;
  showErrorCode?: boolean;
  errorCode?: string;
  showTimestamp?: boolean;
}

interface ErrorConfig {
  Icon: LucideIcon;
  defaultTitle: string;
  defaultMessage: string;
  iconBg: string;
}

interface SizeConfig {
  iconSize: number;
  container: string;
  iconPadding: string;
  title: string;
  message: string;
  button: string;
}

// Main ErrorState component
function ErrorState({
  type = "generic",
  title,
  message,
  onRetry,
  onGoBack,
  retryLabel = "Try Again",
  backLabel = "Go Back",
  fullScreen = false,
  size = "md",
  showErrorCode = false,
  errorCode,
  showTimestamp = false,
}: ErrorStateProps) {
  const errorTypes: Record<ErrorType, ErrorConfig> = {
    server: {
      Icon: ServerCrash,
      defaultTitle: "Server Error",
      defaultMessage:
        "We're having trouble connecting to our servers. Please try again.",
      iconBg: "from-red-500 to-orange-500",
    },
    network: {
      Icon: WifiOff,
      defaultTitle: "Connection Lost",
      defaultMessage: "Please check your internet connection and try again.",
      iconBg: "from-blue-500 to-cyan-500",
    },
    database: {
      Icon: Database,
      defaultTitle: "Data Unavailable",
      defaultMessage: "Unable to fetch data. Please refresh the page.",
      iconBg: "from-purple-500 to-pink-500",
    },
    notfound: {
      Icon: AlertTriangle,
      defaultTitle: "Not Found",
      defaultMessage: "The resource you're looking for doesn't exist.",
      iconBg: "from-yellow-500 to-orange-500",
    },
    timeout: {
      Icon: Clock,
      defaultTitle: "Request Timeout",
      defaultMessage:
        "The request took too long to complete. Please try again.",
      iconBg: "from-orange-500 to-red-500",
    },
    unauthorized: {
      Icon: ShieldAlert,
      defaultTitle: "Unauthorized",
      defaultMessage: "You do not have permission to access this resource.",
      iconBg: "from-red-500 to-pink-500",
    },
    empty: {
      Icon: FileX,
      defaultTitle: "No Data Found",
      defaultMessage: "There is no data available to display at the moment.",
      iconBg: "from-gray-500 to-slate-500",
    },
    generic: {
      Icon: AlertCircle,
      defaultTitle: "Something Went Wrong",
      defaultMessage: "An unexpected error occurred. Please try again.",
      iconBg: "from-gray-500 to-gray-600",
    },
  };

  const config = errorTypes[type];
  const IconComponent = config.Icon;

  const sizes: Record<SizeType, SizeConfig> = {
    sm: {
      iconSize: 24,
      container: "w-14 h-14",
      iconPadding: "p-3",
      title: "text-lg",
      message: "text-sm",
      button: "px-4 py-2 text-sm",
    },
    md: {
      iconSize: 32,
      container: "w-20 h-20",
      iconPadding: "p-4",
      title: "text-2xl",
      message: "text-base",
      button: "px-6 py-3 text-base",
    },
    lg: {
      iconSize: 40,
      container: "w-24 h-24",
      iconPadding: "p-5",
      title: "text-3xl",
      message: "text-lg",
      button: "px-8 py-3 text-lg",
    },
  };

  const sizeConfig = sizes[size];
  const containerClass = fullScreen
    ? "min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className={`${sizeConfig.container} relative`}>
            <div
              className={`absolute inset-0 rounded-full bg-linear-to-br ${config.iconBg} opacity-20 animate-pulse`}
            ></div>
            <div
              className={`relative bg-linear-to-br ${config.iconBg} rounded-full ${sizeConfig.iconPadding} flex items-center justify-center`}
            >
              <IconComponent
                className="text-white"
                size={sizeConfig.iconSize}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-3 mb-8">
          <h2 className={`${sizeConfig.title} font-bold text-white`}>
            {title || config.defaultTitle}
          </h2>
          <p className={`${sizeConfig.message} text-gray-400 leading-relaxed`}>
            {message || config.defaultMessage}
          </p>

          {/* Error Details */}
          {(showErrorCode || showTimestamp) && (
            <div className="flex flex-col gap-1 mt-4 text-xs text-gray-500">
              {showErrorCode && errorCode && (
                <span>Error Code: {errorCode}</span>
              )}
              {showTimestamp && (
                <span>Time: {new Date().toLocaleString()}</span>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className={`${sizeConfig.button} bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer`}
            >
              <RefreshCw size={18} />
              {retryLabel}
            </button>
          )}

          {onGoBack && (
            <button
              onClick={onGoBack}
              className={`${sizeConfig.button} bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer`}
            >
              {backLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Export the component and types
export { ErrorState };
