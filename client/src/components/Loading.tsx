import {
  Shield,
  Lock,
  CheckCircle,
  Upload,
  Download,
  RefreshCw,
  User,
  Key,
} from "lucide-react";

interface LoadingScreenProps {
  type:
    | "login"
    | "signup"
    | "logout"
    | "2fa-setup"
    | "2fa-verify"
    | "qr-generation"
    | "recovery-codes"
    | "profile-load"
    | "authentication"
    | "upload"
    | "download"
    | "processing"
    | "default";
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
}

export default function LoadingScreen({
  type,
  size = "md",
  fullScreen = true,
}: LoadingScreenProps) {
  // Configuration for each loading type
  const loadingConfig = {
    login: {
      icon: <Lock className="text-white" />,
      message: "Logging in...",
      subMessage: "Verifying your credentials",
    },
    signup: {
      icon: <User className="text-white" />,
      message: "Creating your account...",
      subMessage: "Setting up your profile",
    },
    logout: {
      icon: <Lock className="text-white" />,
      message: "Logging out...",
      subMessage: "Securing your session",
    },
    "2fa-setup": {
      icon: <Shield className="text-white" />,
      message: "Setting up 2FA...",
      subMessage: "Configuring two-factor authentication",
    },
    "2fa-verify": {
      icon: <Shield className="text-white" />,
      message: "Verifying code...",
      subMessage: "Checking your authentication code",
    },
    "qr-generation": {
      icon: <Shield className="text-white" />,
      message: "Generating QR Code...",
      subMessage: "Creating your secure QR code",
    },
    "recovery-codes": {
      icon: <Key className="text-white" />,
      message: "Generating recovery codes...",
      subMessage: "Creating backup codes for your account",
    },
    "profile-load": {
      icon: <User className="text-white" />,
      message: "Loading your profile...",
      subMessage: "Fetching account information",
    },
    authentication: {
      icon: <Lock className="text-white" />,
      message: "Authenticating...",
      subMessage: "Please wait while we verify your identity",
    },
    upload: {
      icon: <Upload className="text-white" />,
      message: "Uploading...",
      subMessage: "Transferring your files",
    },
    download: {
      icon: <Download className="text-white" />,
      message: "Downloading...",
      subMessage: "Preparing your files",
    },
    processing: {
      icon: <RefreshCw className="text-white animate-spin" />,
      message: "Processing...",
      subMessage: "Please wait a moment",
    },
    default: {
      icon: <CheckCircle className="text-white" />,
      message: "Loading...",
      subMessage: "Please wait",
    },
  };

  const config = loadingConfig[type];

  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: 32,
      icon: 20,
      text: "text-sm",
      subText: "text-xs",
      container: "w-12 h-12",
      iconContainer: "p-2",
    },
    md: {
      spinner: 48,
      icon: 24,
      text: "text-base",
      subText: "text-sm",
      container: "w-16 h-16",
      iconContainer: "p-3",
    },
    lg: {
      spinner: 64,
      icon: 32,
      text: "text-lg",
      subText: "text-base",
      container: "w-20 h-20",
      iconContainer: "p-4",
    },
  };

  const sizeConf = sizeConfig[size];

  // Container classes based on fullScreen prop
  const containerClasses = fullScreen
    ? "min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4"
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClasses}>
      <div className="text-center">
        {/* Loading Spinner with Icon */}
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Outer spinning ring */}
          <div className={`${sizeConf.container} relative`}>
            <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
          </div>

          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`bg-liner-to-br from-purple-500 to-pink-500 rounded-full ${sizeConf.iconContainer}`}
            >
              {config.icon}
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className={`${sizeConf.text} font-semibold text-white`}>
            {config.message}
          </p>

          <p className={`${sizeConf.subText} text-gray-400`}>
            {config.subMessage}
          </p>

          {/* Animated dots */}
          <div className="flex items-center justify-center space-x-1 pt-2">
            <div
              className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            ></div>
            <div
              className="w-2 h-2 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
