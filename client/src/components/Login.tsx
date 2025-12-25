import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginValidator,
  type TLoginValidator,
} from "../validator/auth.validator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TLoginAPsuccess } from "@/types/api.types";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    resetField,
    reset,
    formState: { errors, isValid },
  } = useForm<TLoginValidator>({
    resolver: zodResolver(loginValidator),
    mode: "onChange", // ✅ live validation
  });

  // TLoginAPsuccess
  const loginUserAPI = async (data: TLoginValidator) => {
    const url = "http://localhost:3000/api/v1/user/login";

    try {
      const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
        credentials: "include",
      });

      const resData = (await res.json()) as TLoginAPsuccess;

      return resData;
    } catch {
      return Error(
        "Oops! We couldn't reach the server. Please try again later."
      );
    }
  };

  const onSubmit = async (data: TLoginValidator) => {
    setLoading(true);
    const res = (await loginUserAPI(data)) as TLoginAPsuccess;
    setLoading(false);

    // if success
    if (res.success && res.data.userId) {
      // reset fields
      reset();

      // toast.success(res.message);
      // send user to navigate
      navigate("/2fa");
    }

    if (!res.success) {
      toast.error(res.message);
      resetField("password");
      return;
    }
  };

  return (
    <div className="max-w-md w-full m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700  mt-10"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Sign in to continue to your account
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition duration-200"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                name="password"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none text-white placeholder-gray-500 transition duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition duration-200"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-purple-400 hover:text-purple-300 transition duration-200"
            >
              Forgot password?
            </button>
          </div>
          <button
            className={`w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg transition duration-200 font-medium shadow-lg shadow-purple-500/30 flex justify-center ${
              !isLoading && isValid && "cursor-pointer"
            }`}
            disabled={isLoading}
          >
            {!isLoading ? "Sign In" : <Loader2 className="animate-spin" />}
          </button>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <button
              className="text-purple-400 hover:text-purple-300 font-medium transition duration-200"
              onClick={() => navigate("/register")}
            >
              Register here
            </button>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
