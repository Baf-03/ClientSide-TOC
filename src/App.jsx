import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Signup";
import AuthRoute from "./routes/authRoutes";
import ProtectedRoute from "./routes/protectedRoutes";
import Todo from "./pages/Todo";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path="/" element={<Todo/>} />
        </Route>

      </Routes>
    </>
  );
}

export default App;
