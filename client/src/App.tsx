import Nav from "@/components/Nav";
import { Routes, Route } from "react-router-dom";
import Register from "@/components/Register";
import Login from "@/components/Login";
import HomePage from "@/components/Home";
import { ToastContainer } from "react-toastify";
import About from "@/components/About";
import TwoFA from "./components/TFA";
import Dashbaord from "./components/Dashboard";
import { UserProvider } from "./contexts/user/UserProvider";
import Logout from "./components/Logout";

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
          <Route path="/logout" Component={Logout} />
          <Route path="/dashboard" Component={Dashbaord} />
        </Routes>

        <ToastContainer />
      </div>
    </UserProvider>
  );
}

export default App;
