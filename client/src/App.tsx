import Nav from "@/components/Nav";
import { Routes, Route } from "react-router-dom";
import Register from "@/components/Register";
import Login from "@/components/Login";
import HomePage from "@/components/Home";
import { ToastContainer } from "react-toastify";
import About from "@/components/About";
import TwoFA from "./components/TFA";
import Dashbaord from "./components/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-black">
      <Nav />
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/about" Component={About} />
        <Route path="/2fa" Component={TwoFA} />
        <Route path="/dashboard" Component={Dashbaord} />
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
