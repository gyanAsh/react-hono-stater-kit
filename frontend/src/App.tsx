import { Route, Routes } from "react-router";
import "./App.css";
import Home from "@/pages/Home";
import Login from "./pages/Login";
import VerifyCode from "./pages/Login/verify_login";
import UserInfo from "./pages/User/user-info";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify_login" element={<VerifyCode />} />
      <Route path="/user-info" element={<UserInfo />} />
    </Routes>
  );
}

export default App;
