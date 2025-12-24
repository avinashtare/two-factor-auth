import { Shield, Zap, Lock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-white mb-6">
              Secure Your Digital
              <span className="block bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
                Identity Today
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Experience next-level security with two-factor authentication and
              advanced encryption. Protect what matters most.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate("/register")}
                className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition duration-200 shadow-lg shadow-purple-500/30"
              >
                Get Started Free
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition duration-200 border border-gray-600">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose MyApp?
            </h2>
            <p className="text-gray-400 text-lg">
              Built with security and simplicity in mind
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Two-Factor Auth
              </h3>
              <p className="text-gray-400 text-sm">
                Enhanced security with 2FA protection. Keep your account safe
                from unauthorized access.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-400 text-sm">
                Instant verification and seamless user experience. No delays,
                just pure speed.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                End-to-End Encryption
              </h3>
              <p className="text-gray-400 text-sm">
                Your data is encrypted and secure. We never store sensitive
                information in plain text.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-6 border border-gray-700 hover:border-purple-500 transition duration-300">
              <div className="w-12 h-12 bg-linear-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Trusted by Millions
              </h3>
              <p className="text-gray-400 text-sm">
                Join millions of users who trust us with their security. Be part
                of our community.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-linear-to-r from-purple-900 to-pink-900 bg-opacity-30 backdrop-blur-xl rounded-3xl p-12 border border-purple-700">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  10M+
                </h3>
                <p className="text-gray-300 text-lg">Active Users</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  99.9%
                </h3>
                <p className="text-gray-300 text-lg">Uptime</p>
              </div>
              <div>
                <h3 className="text-5xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  24/7
                </h3>
                <p className="text-gray-300 text-lg">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Create your account today and experience the future of secure
            authentication
          </p>
          <button
            onClick={() => navigate("/register")}
            className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-10 py-4 rounded-lg text-lg font-medium transition duration-200 shadow-lg shadow-purple-500/30"
          >
            Sign Up Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12 px-4 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">M</span>
                </div>
                <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MyApp
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Secure authentication made simple and beautiful.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white text-sm transition duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 MyApp. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
