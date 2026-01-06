import { useEffect, useState } from "react";
import { KeyRound, Loader2, ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { API_ROUTES } from "@/const/api.const";
import { sendRequest } from "@/utils/api.utils";
import type { TRecovery2FaSuccess } from "@/types/api.types";
import { toast } from "react-toastify";
import { setCookie } from "@/utils/cookie.utils";
import useUserContext from "@/contexts/user/UserContext";

function RecoverAccount() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setLogin } = useUserContext();

  const [recoveryCode, setRecoveryCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // verify recovery code
  const handleRecover = async () => {
    setIsLoading(true);

    // recovery code body
    const resData = { recoverCode: String(recoveryCode) };

    // put request for send request
    const res = (await sendRequest(API_ROUTES.RECOVER_TFA.url, resData, {
      method: API_ROUTES.RECOVER_TFA.method,
      credentials: "include",
    })) as TRecovery2FaSuccess;

    setIsLoading(false);

    if (res?.success) {
      // add activated flag in cookie
      setCookie("activated", "yes");

      // login user in user context
      setLogin(true);
      navigate("/dashboard", { state: { isLogin: true } });

      toast.success("Verification success");
      return;
    } else {
      if (res.message === "Unauthorized") {
        navigate("/login");
      }

      // all other errors
      toast.error(res.message);
    }
  };

  // go back to verify page
  const handleBackTo2FA = () => {
    navigate(-1);
  };

  // is user comes from verify page or not
  useEffect(() => {
    if (!location.state?.recover) {
      // send to loing
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-purple-500 to-pink-500 rounded-full mb-4">
              <KeyRound className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Recover Account
            </h2>
            <p className="text-gray-400 text-sm">
              Enter your backup recovery code to regain access
            </p>
          </div>

          {/* Recovery Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 text-center">
                Enter Recovery Code
              </label>
              <input
                type="text"
                value={recoveryCode}
                onChange={(e) => {
                  const value = e.target.value.trim();
                  if (value.length <= 10) {
                    setRecoveryCode(value);
                  }
                }}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition duration-200 text-center text-2xl tracking-wider font-mono"
                placeholder="AABBCCDDEE"
                maxLength={10}
              />
              <p className="text-xs text-gray-500 mt-2 text-center">
                Enter your alphanumeric recovery code
              </p>
            </div>

            <button
              onClick={handleRecover}
              disabled={recoveryCode.length < 10 || isLoading}
              className="w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white py-3 rounded-lg transition duration-200 font-medium shadow-lg shadow-purple-500/30 flex justify-center items-center"
            >
              {!isLoading ? (
                "Recover Account"
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </button>

            <div className="text-center">
              <button
                onClick={handleBackTo2FA}
                className="text-sm text-purple-400 hover:text-purple-300 transition duration-200 flex items-center justify-center mx-auto space-x-1"
              >
                <ArrowLeft size={16} />
                <span>Back to Verify</span>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-purple-900 bg-opacity-30 border border-purple-700 rounded-lg p-5">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">!</span>
              </div>
              <p className="text-base text-purple-300 font-semibold">
                Recovery Code Help
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Where to Find Your Code
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Check your password manager, secure notes, or the safe
                    location where you stored your backup codes
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    One-Time Use Only
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Each recovery code can only be used once. After recovery,
                    set up new 2FA immediately
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Still Can't Access?
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    If you've lost all recovery codes, contact support for
                    additional verification options
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-white text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="text-sm text-gray-300 font-medium">
                    Secure Your Account
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    After recovery, review your security settings and generate
                    new backup codes
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

export default RecoverAccount;
