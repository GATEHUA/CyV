import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { Toaster } from "sonner";
import MainPage from "./pages/MainPage";
import CurrentParticipants from "./pages/CurrentParticipants";
import EmployeesPage from "./pages/EmployeesPage";
import { RootLayout } from "./layouts/RootLayout";
import { useThemeStore } from "./store/ThemeStore";

export default function App() {
  const theme = useThemeStore((state) => state.theme);
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  function onWindowMatch() {
    if (theme == "dark" || (theme == "system" && darkQuery.matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
  useEffect(() => {
    onWindowMatch();

    darkQuery.addEventListener("change", onWindowMatch);
    return () => {
      darkQuery.removeEventListener("change", onWindowMatch);
    };
  }, [theme]);
  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<MainPage />} />
          <Route
            path="/current_participants"
            element={<CurrentParticipants />}
          />
          <Route path="/employees" element={<EmployeesPage />} />
        </Route>
      </Routes>
    </>
  );
}
