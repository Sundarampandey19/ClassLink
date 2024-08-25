import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import Signup from "./pages/Signup";
import LandingPage from "./pages/Home";

export default function App() {
  return (
    <>
       <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
      <Signup></Signup>
    </>
  )
}