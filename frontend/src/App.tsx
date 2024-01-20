import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

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
