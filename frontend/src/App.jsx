import { Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./pages/Signup";
import LandingPage from "./pages/Home";
import WhatsAppWebHome from "./pages/chatpage/ChatsPage";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login";
import InitState from "./helper/InitState";
import UsersList from "./pages/friends/AddFriend";
import Requests from "./pages/request/request";

export default function App() {
  return (
    <>
      <InitState />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/request" element={<Requests />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chats" element={<WhatsAppWebHome />} />
      </Routes>
    </>
  )
}
