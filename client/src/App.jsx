import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/enroll" element={<Home />} />
        <Route path="/admin-xyz123" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}