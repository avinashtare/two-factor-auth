import { Check, Copy, Shield } from "lucide-react";
import { useState } from "react";
import Verify2FA from "./Verify2FA";
import { toast } from "react-toastify";

function Activate2FA({
  qrDataUrl,
  secret: secretKey,
  addRecoverCodes,
}: {
  qrDataUrl: string;
  secret: string;
  addRecoverCodes: (codes: string[]) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(secretKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("copy secret success");
  };

  return (
    <div className="max-w-lg w-full">
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center mb-8">
          {/* Header */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Setup 2FA</h2>
          <p className="text-gray-400 text-sm">
            Scan the QR code with your authenticator app
          </p>

          {/* QR Code Section */}
          <div className="bg-gray-900 rounded-xl p-6 mt-6 mb-6">
            <div className="w-64 h-64 bg-white rounded-lg mx-auto flex items-center justify-center mb-4">
              <img
                src={qrDataUrl}
                alt="QR Code"
                className="w-full h-full rounded-lg"
              />
            </div>
            {/* Manual Entry Code */}
            <div className="bg-gray-800 rounded-lg p-4 mb-5">
              <p className="text-xs text-gray-400 mb-2 text-center">
                Can't scan? Enter this code manually:
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-white font-mono text-sm tracking-wider">
                  {secretKey}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-700 rounded-lg transition duration-200"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="text-green-400" size={16} />
                  ) : (
                    <Copy className="text-gray-400" size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Verify */}
            <Verify2FA isActivated={false} addRecoverCodes={addRecoverCodes} />

            {/* Instructions */}
            <div className="mt-6 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-5">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">?</span>
                </div>
                <p className="text-base text-purple-300 font-semibold">
                  How to Setup 2FA
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      Download an Authenticator App
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Get Google Authenticator, Microsoft Authenticator, or
                      Authy from your app store
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      Scan the QR Code
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Open your authenticator app and scan the QR code above, or
                      manually enter the code
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      Enter the 6-Digit Code
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Your app will generate a 6-digit code. Enter it in the
                      field above
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 font-medium">
                      Verify & Complete
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Click the verify button to enable 2FA and secure your
                      account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activate2FA;
