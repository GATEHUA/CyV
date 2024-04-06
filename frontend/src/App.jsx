import { Route, Routes } from "react-router-dom";

import { Toaster } from "sonner";
import MainPage from "./pages/MainPage";
import CurrentParticipants from "./pages/CurrentParticipants";
import EmployeesPage from "./pages/EmployeesPage";

export default function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/current_participants" element={<CurrentParticipants />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </>
  );
}
