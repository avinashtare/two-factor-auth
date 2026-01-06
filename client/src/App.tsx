import Nav from "@/components/Nav";
import { Routes, Route } from "react-router-dom";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import HomePage from "@/pages/Home";
import { ToastContainer } from "react-toastify";
import About from "@/pages/About";
import TwoFA from "@/pages/TFA";
import Dashbaord from "@/pages/Dashboard";
import { UserProvider } from "@/contexts/user/UserProvider";
import Logout from "@/pages/Logout";
import RecoverAccount from "@/pages/RecoverAccount";

function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
        <Nav />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/register" Component={Register} />
          <Route path="/login" Component={Login} />
          <Route path="/about" Component={About} />
          <Route path="/2fa" Component={TwoFA} />
          <Route path="/recover-account" Component={RecoverAccount} />
          <Route path="/logout" Component={Logout} />
          <Route path="/dashboard" Component={Dashbaord} />
        </Routes>

        <ToastContainer />
      </div>
    </UserProvider>
  );
}

export default App;
