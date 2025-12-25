import { API_ROUTES } from "@/const/api.const";
import type { TVerify2FaSuccess } from "@/types/api.types";
import { sendRequest } from "@/utils/api.utils";
import { Loader2, Shield } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Verify2FA({
  isActivated,
  addRecoverCodes,
}: {
  isActivated: boolean;
  addRecoverCodes: (codes: string[]) => void;
}) {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);

    const resData = { totp: String(verificationCode) };

    const res = (await sendRequest(API_ROUTES.VERIFY_TFA.url, resData, {
      method: API_ROUTES.VERIFY_TFA.method,
      credentials: "include",
    })) as TVerify2FaSuccess;

    setLoading(false);

    if (res?.success) {
      const recoveryCodes = res.data.recoveryCodes;
      // if user recoveryCodes exist so it's fisrt time so send to downlaod page
      if (recoveryCodes.length > 0) {
        addRecoverCodes(recoveryCodes);
      } else {
        navigate("/");
      }

      toast.success("Verification success");
      return;
    } else {
      if (res.message === "Invalid credentials") {
        setVerificationCode("");
        toast.error("invalid code", { autoClose: 1000 });
        return;
      }
      if (res.message === "Unauthorized") {
        navigate("/login");
      }

      // all other errors
      toast.error(res.message);
    }
  };

  const handleForgot = () => {
    alert("Forgot 2FA clicked");
    // Handle forgot 2FA logic here
  };

  const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setVerificationCode(value);
  };

  return (
    <div className={"max-w-md w-full"}>
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
        {/* header */}
        <div className="text-center mb-8" hidden={!isActivated}>
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Shield className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Verify 2FA</h2>
          <p className="text-gray-400 text-sm">
            Enter the code from your authenticator app
          </p>
        </div>

        {/* Verification Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              value={verificationCode}
              onChange={handleCodeChange}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition duration-200 text-center text-2xl tracking-widest font-mono"
              placeholder="000000"
              maxLength={6}
            />
          </div>

          <button
            onClick={handleVerify}
            disabled={verificationCode.length !== 6 || isLoading}
            className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 cursor-pointer disabled:cursor-not-allowed  text-white py-3 rounded-lg transition duration-200 font-medium shadow-lg shadow-purple-500/30 flex justify-center"
          >
            {!isLoading ? "Verify Code" : <Loader2 className="animate-spin" />}
          </button>

          <div className="text-center">
            <button
              onClick={handleForgot}
              className="text-sm text-purple-400 hover:text-purple-300 transition duration-200"
            >
              Forgot 2FA or Lost Access?
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div
          className="mt-6 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-5"
          hidden={!isActivated}
        >
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">?</span>
            </div>
            <p className="text-base text-purple-300 font-semibold">
              Important: Save Your Code
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">1</span>
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">
                  Write Down Backup Codes
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Save your backup codes in a secure location like a password
                  manager or safe place
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">2</span>
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">
                  Keep Codes Offline
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Store codes on paper or encrypted storage, not in plain text
                  files or screenshots
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">3</span>
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">
                  Never Share Your Codes
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Your 2FA codes are personal. Never share them with anyone,
                  even support staff
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <div>
                <p className="text-sm text-gray-300 font-medium">
                  Multiple Backup Options
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Store backup codes in multiple secure locations in case you
                  lose access to one
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify2FA;
