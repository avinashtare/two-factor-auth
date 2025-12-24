import { Shield, Download, Copy, Check, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RecoveryCodes({
  recoveryCodes,
}: {
  recoveryCodes: string[];
}) {
  const navigate = useNavigate();

  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCopyAll = () => {
    const codesText = recoveryCodes.join("\n");
    navigator.clipboard.writeText(codesText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const codesText = recoveryCodes.join("\n");
    const blob = new Blob([codesText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "myapp-recovery-codes.txt";
    a.click();
    window.URL.revokeObjectURL(url);
    setDownloaded(true);
  };

  const handleContinue = () => {
    if (confirmed) {
      // Navigate to next step
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <Shield className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Save Your Recovery Codes
            </h2>
            <p className="text-gray-400 text-sm">
              Store these codes safely - you'll need them if you lose access to
              your device
            </p>
          </div>

          {/* Warning Alert */}
          <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4 mb-6 flex items-start space-x-3">
            <AlertTriangle
              className="text-yellow-400 shrink-0 mt-0.5"
              size={20}
            />
            <div>
              <p className="text-sm text-yellow-300 font-semibold mb-1">
                Important: Save These Codes Now
              </p>
              <p className="text-xs text-gray-400">
                Each code can only be used once. If you lose access to your
                authenticator app, these codes are the only way to access your
                account.
              </p>
            </div>
          </div>

          {/* Recovery Codes Grid */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-white">
                Your Recovery Codes
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={handleCopyAll}
                  className="flex items-center space-x-2 px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition duration-200 text-sm"
                  title="Copy all codes"
                >
                  {copied ? (
                    <>
                      <Check className="text-green-400" size={16} />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="text-gray-400" size={16} />
                      <span className="text-gray-300">Copy All</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center space-x-2 px-3 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition duration-200 text-sm"
                >
                  <Download className="text-white" size={16} />
                  <span className="text-white">Download</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {recoveryCodes.map((code, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg px-4 py-3 text-center border border-gray-700"
                >
                  <span className="text-gray-400 text-xs block mb-1">
                    Code {index + 1}
                  </span>
                  <span className="text-white font-mono text-sm tracking-wider">
                    {code}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Status */}
          {downloaded && (
            <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-3 mb-6 flex items-center space-x-3">
              <Check className="text-green-400" size={20} />
              <p className="text-sm text-green-300">
                Recovery codes downloaded successfully!
              </p>
            </div>
          )}

          {/* Confirmation Checkbox */}
          <div className="bg-gray-900 rounded-lg p-4 mb-6">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="mt-1 w-5 h-5 rounded border-gray-600 bg-gray-800 text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              <div>
                <p className="text-sm text-gray-300 font-medium">
                  I have saved my recovery codes in a secure location
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  You won't be able to see these codes again after leaving this
                  page
                </p>
              </div>
            </label>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!confirmed}
            className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition duration-200 font-medium shadow-lg shadow-purple-500/30"
          >
            Continue to Dashboard
          </button>

          {/* Instructions */}
          <div className="mt-6 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-5">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">💡</span>
              </div>
              <p className="text-base text-purple-300 font-semibold">
                Best Practices for Recovery Codes
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Store in Multiple Locations
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Save codes in a password manager, print them out, or store
                    in an encrypted file
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Keep Them Private
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Never share your recovery codes with anyone, including
                    support staff
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    One-Time Use Only
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Each code can only be used once. Cross them off as you use
                    them
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Generate New Codes
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    You can generate new codes anytime from your security
                    settings
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
