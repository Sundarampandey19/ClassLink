import { Route, Routes } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import { Button } from "./components/ui/button";
import Signup from "./pages/Signup";
import LandingPage from "./pages/Home";
import WhatsAppWebHome from "./pages/ChatsPage";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/chats" element={<WhatsAppWebHome />} />
      </Routes>
    </>
  )
}