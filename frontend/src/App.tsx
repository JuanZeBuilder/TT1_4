import "./App.css";

import { Outlet } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CssBaseline />
        <Outlet />
      </AuthProvider>
    </>
  );
}

export default App;
