import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import LandingPage from "./pages/Home";
import WhatsAppWebHome from "./pages/ChatsPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

import InitState from "./components/InitState";

export default function App() {
  return (
    <>
      <InitState />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<WhatsAppWebHome />} />
      </Routes>
    </>
  )
}
