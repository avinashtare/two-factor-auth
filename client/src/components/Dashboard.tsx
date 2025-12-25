import {
  Calendar,
  CheckCircle,
  Mail,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

interface UserData {
  userId: string;
  name: string;
  email: string;
  twoFactorAuth: { activated: boolean };
  createdAt: Date; // ISO date string
}
function Dashbaord() {
  const [userData] = useState<UserData>({
    userId: "694c298b67b824d8c57f7083",
    name: "admin",
    email: "avinashtare5@gmail.com",
    twoFactorAuth: {
      activated: false,
    },
    createdAt: new Date("2025-12-24T17:57:31.494Z"),
  });

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleEnable2FA = () => {
    // Navigate to 2FA setup
  };

  return (
    <>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {userData.name}!
          </h1>
          <p className="text-gray-400">
            Manage your account and security settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-6">
                Profile Information
              </h2>

              <div className="space-y-6">
                {/* User ID */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">User ID</p>
                    <p className="text-white font-mono text-sm">
                      {userData.userId}
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shrink-0">
                    <User className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Full Name</p>
                    <p className="text-white text-lg font-medium">
                      {userData.name}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Email Address</p>
                    <p className="text-white text-lg font-medium">
                      {userData.email}
                    </p>
                  </div>
                </div>

                {/* Account Created */}
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-400 mb-1">Member Since</p>
                    <p className="text-white text-lg font-medium">
                      {formatDate(userData.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
              <div className="flex items-center space-x-2 mb-6">
                <Shield className="text-purple-400" size={24} />
                <h2 className="text-2xl font-bold text-white">Security</h2>
              </div>

              {/* 2FA Status */}
              <div className="bg-gray-900 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-gray-300 font-medium">
                    Two-Factor Authentication
                  </p>
                  {userData.twoFactorAuth.activated ? (
                    <CheckCircle className="text-green-400" size={24} />
                  ) : (
                    <XCircle className="text-red-400" size={24} />
                  )}
                </div>

                <div
                  className={`px-3 py-2 rounded-lg mb-4 ${
                    userData.twoFactorAuth.activated
                      ? "bg-green-900 bg-opacity-30 border border-green-700"
                      : "bg-red-900 bg-opacity-30 border border-red-700"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${
                      userData.twoFactorAuth.activated
                        ? "text-green-300"
                        : "text-red-300"
                    }`}
                  >
                    Status:{" "}
                    {userData.twoFactorAuth.activated ? "Enabled" : "Disabled"}
                  </p>
                </div>

                {!userData.twoFactorAuth.activated && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-3">
                      Protect your account with an extra layer of security.
                      Enable 2FA now!
                    </p>
                  </div>
                )}

                <button
                  onClick={handleEnable2FA}
                  className={`w-full py-3 rounded-lg transition duration-200 font-medium ${
                    userData.twoFactorAuth.activated
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/30"
                  }`}
                >
                  {userData.twoFactorAuth.activated
                    ? "Manage 2FA"
                    : "Enable 2FA"}
                </button>
              </div>

              {/* Security Tips */}
              <div className="bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-4">
                <p className="text-sm text-purple-300 font-semibold mb-2">
                  🔒 Security Tips
                </p>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• Use a strong, unique password</li>
                  <li>• Enable two-factor authentication</li>
                  <li>• Never share your credentials</li>
                  <li>• Review account activity regularly</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Account Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Account Status</p>
                <p className="text-2xl font-bold text-white">Active</p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Security Level</p>
                <p className="text-2xl font-bold text-white">
                  {userData.twoFactorAuth.activated ? "High" : "Medium"}
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  userData.twoFactorAuth.activated
                    ? "bg-linear-to-br from-green-500 to-emerald-500"
                    : "bg-linear-to-br from-yellow-500 to-orange-500"
                }`}
              >
                <Shield className="text-white" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">Last Login</p>
                <p className="text-2xl font-bold text-white">Today</p>
              </div>
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbaord;
