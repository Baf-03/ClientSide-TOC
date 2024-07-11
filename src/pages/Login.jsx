import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_URL;
import OrbitingText from "../components/OrbitingText";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email,
    }));

    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email address",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password,
    }));

    if (password.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.email) {
      alert("Please enter your email.");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (!formData.password) {
      alert("Please enter your password.");
      setLoading(false);
      return;
    }

    try {
      const loginRsp = await axios.post(`${apiUrl}/api/auth/login`, formData);
      console.log("loginRsp",loginRsp);
      localStorage.setItem("token",loginRsp?.data?.token)
      toast.success(`Login Successful`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/"); // Assuming you have a dashboard page
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unknown error" + err, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      console.log(err?.response?.data?.message || "Unknown error" + err);
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex xl:gap-x-[7rem] items-center h-screen">
      <div className="relative lg:w-[35%] xl:w-[30%] lg:flex lg:flex-col lg:gap-10 hidden bluebg text-white m-10 h-[95vh] rounded-3xl">
        <div className="mt-5">
          {/* <Slider /> */}
        </div>

        <div className="ps-7 text-gray-200">
          <h2
            className="lg:text-[1.5rem] xl:text-[2rem] font-bold"
            style={{ lineHeight: "1.4" }}
          >
            Welcome Back
          </h2>
          <p
            className="lg:w-[80%] xl:w-[45%] lg:mt-5 lg:text-[1rem] xl:text-[1rem] font-bold"
            style={{ lineHeight: "1.2" }}
          >
            Please login to continue.
          </p>
        </div>

        <div className="w-[150px] p-0 absolute bottom-0">
          <OrbitingText color="white" />
        </div>
      </div>
      <div className="w-[150px] p-0 absolute bottom-0 lg:hidden left-0">
        <OrbitingText color="black" />
      </div>

      <div className="w-[90%] m-auto sm:w-fit lg:m-0">
        <h1 className="text-4xl font-semibold mb-1">Login</h1>
        <p className="mb-[4rem] font-bold text-sm lg:w-[80%] xl:w-[100%]">
          Please enter your registered email address and password to access your
          account
        </p>
        <form onSubmit={submitHandler} className="lg:w-[50vw] w-[100%]">
          <div className="w-full flex flex-col gap-y-11 sm:flex-row gap-2 min-h-[6rem]">
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="email"
                className="block text-gray-600 font-bold text-sm"
              >
                Email
              </label>
              <input
                type="text"
                disabled={loading}
                id="email"
                name="email"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="test@gmail.com"
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="password"
                className="block text-gray-600 font-bold text-sm"
              >
                Password
              </label>
              <input
                type="password"
                disabled={loading}
                id="password"
                name="password"
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-center m-auto">
            <button
              type="submit"
              disabled={loading}
              className="background-color w-full text-white font-semibold rounded-md py-2 px-4"
            >
              {loading ? "Loading" : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-blue-500 text-center" disabled={loading}>
          <Link to="/auth/register" className="hover:underline">
            Dont have an account? Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
