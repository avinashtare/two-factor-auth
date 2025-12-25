import useUserContext from "@/contexts/user/UserContext";
import { User2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const { isLogin } = useUserContext();

  return (
    <div>
      <nav className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div
                  onClick={() => navigate("/")}
                  className="w-10 h-10 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <span className="cursor-pointer text-2xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  2FA
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="cursor-pointer text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
              >
                Home
              </button>
              <button className="cursor-pointer text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                Features
              </button>
              <button className="cursor-pointer text-gray-300 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                About
              </button>
              <div className="flex items-center space-x-6" hidden={isLogin}>
                <button
                  onClick={() => navigate("/register")}
                  className="text-gray-300 cursor-pointer hover:text-white px-5 py-2 rounded-lg text-sm font-medium border border-gray-600 hover:border-gray-500 transition duration-200"
                >
                  Register
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-linear-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-lg shadow-purple-500/30"
                >
                  Login
                </button>
              </div>
              <div className="flex items-center space-x-6" hidden={!isLogin}>
                <button
                  onClick={() => navigate("/logout")}
                  className="bg-linear-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition duration-200 shadow-lg shadow-purple-500/30"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="bg-linear-to-r cursor-pointer from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-2 py-2 rounded-full text-sm font-medium transition duration-200 shadow-lg shadow-purple-500/30"
                >
                  <User2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
