import Navbar from "./Components/Navbar"
import { Navigate, Route, Routes } from "react-router-dom"
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Signuppage from "./Pages/Signuppage";
import Settingpage from "./Pages/Settingpage";
import Profilepage from "./Pages/Profilepage";
import { useAuthStore } from "./Store/useAuthstore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {

  const { Authuser, checkauth } = useAuthStore();

  useEffect(() => {
    checkauth();
  }, [checkauth]);

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={Authuser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!Authuser ? <Signuppage /> : <Navigate to="/" />} />
        <Route path="/login" element={!Authuser ? <Loginpage /> : <Navigate to="/" />} />
        <Route path="/setting" element={<Settingpage />} />
        <Route path="/profile" element={Authuser ? <Profilepage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />

    </div>
  )
}

export default App

