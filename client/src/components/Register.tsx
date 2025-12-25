import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registerValidator,
  type TRegisterValidator,
} from "../validator/auth.validator";
import type { TRegisterAPsuccess } from "@/types/api.types";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm<TRegisterValidator>({
    resolver: zodResolver(registerValidator),
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const registerUserAPI = async (data: TRegisterValidator) => {
    const url = "http://localhost:3000/api/v1/user/register";

    try {
      const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const resData = (await res.json()) as TRegisterAPsuccess;

      return resData;
    } catch {
      return Error(
        "Oops! We couldn't reach the server. Please try again later."
      );
    }
  };

  const onSubmit = async (data: TRegisterValidator) => {
    setLoading(true);
    const res = (await registerUserAPI(data)) as TRegisterAPsuccess;
    setLoading(false);

    if (!res.success) {
      if (res.message === "User already exist") {
        setError(
          "email",
          { message: "email already exists" },
          { shouldFocus: true }
        );
        toast.error(res.message);
        return;
      } else {
        toast.error(res.message);
        return;
      }
    }
    // we got data

    if (res.data.userId) {
      // reset fields
      reset();

      toast.success(res.message);
      // send user to navigate
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md w-full m-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-700 mt-10"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-2">
          Create Account
        </h2>

        <div className="space-y-4">
          {/* name */}
          <div>
            <input
              type="name"
              placeholder="Enter your name"
              {...register("name")}
              className="w-full px-4 py-3 bg-gray-900 border rounded-lg text-white"
            />
            {errors.name && (
              <p className="text-red-400 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-3 bg-gray-900 border rounded-lg text-white"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-3 bg-gray-900 border rounded-lg text-white"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirmPassword")}
              className="w-full px-4 py-3 bg-gray-900 border rounded-lg text-white"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full bg-purple-600 text-white py-3 rounded-lg flex justify-center ${
              !isLoading && isValid && "cursor-pointer"
            }`}
            disabled={isLoading}
          >
            {!isLoading ? "Register" : <Loader2 className="animate-spin" />}
          </button>
        </div>

        <p className="text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-purple-400"
          >
            Login here
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
