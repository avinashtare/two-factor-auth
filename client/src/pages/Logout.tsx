import { API_ROUTES } from "@/const/api.const";
import useUserContext from "@/contexts/user/UserContext";
import { sendRequest } from "@/utils/api.utils";
import { CheckCircle, Home } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
  const { fetchUser } = useUserContext();

  const handleGoHome = () => {
    navigate("/");
  };

  const logoutUser = useCallback(async () => {
    await sendRequest(
      API_ROUTES.LOGOUT.url,
      {},
      {
        method: API_ROUTES.LOGOUT.method,
        credentials: "include",
      }
    );
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    (() => logoutUser())();
  }, [logoutUser]);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="relative inline-flex items-center justify-center mb-6">
          <div className="w-20 h-20 relative">
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-green-500 to-emerald-500 opacity-20 animate-pulse"></div>
            <div className="relative bg-linear-to-br from-green-500 to-emerald-500 rounded-full p-4 flex items-center justify-center">
              <CheckCircle className="text-white" size={32} />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-3">
          Logged Out Successfully
        </h2>
        <p className="text-gray-400 mb-8">
          You have been securely logged out. See you again soon!
        </p>

        <button
          onClick={handleGoHome}
          className="px-8 py-3 bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mx-auto cursor-pointer"
        >
          <Home size={20} />
          Go to Home
        </button>
      </div>
    </div>
  );
}
