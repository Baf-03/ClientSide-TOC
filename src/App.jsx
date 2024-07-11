import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import AuthRoute from "./routes/authRoutes";
import ProtectedRoute from "./routes/protectedRoutes";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LockBox from "./pages/Lockbox";

function App() {
  return (
    <>
    <ToastContainer/>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LockBox/>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
