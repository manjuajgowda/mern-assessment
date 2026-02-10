import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import API from "../api";
import logo from "../../src/Assests/lemonpay-logo.svg";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (form.password !== form.confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		try {
			const res = await API.post("/auth/register", {
				email: form.email,
				password: form.password,
			});

			alert("Registration successful! Redirecting to login...");

			setTimeout(() => {
				navigate("/");
			}, 1500);

		} catch (err) {
			console.error("Registration error:", err.response?.data || err.message);
			alert("User already exists");
		}
	};


  return (
		<div className="min-h-screen bg-[#2f2f2f] flex items-center justify-center">
      <div className="relative w-full md:w-[95%] min-h-screen md:h-[90vh] rounded-none md:rounded-lg overflow-hidden shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-br from-white via-[#6b8bd6] to-[#2d2f9c]" />

        <div className="absolute top-[-80px] right-[-80px] w-64 h-64 bg-pink-200 opacity-40 rounded-full"></div>
        <div className="absolute bottom-[-120px] left-[30%] w-72 h-72 bg-pink-200 opacity-30 rounded-full"></div>
        <div className="absolute bottom-[-60px] left-[-60px] w-40 h-40 bg-blue-200 opacity-30 rounded-full"></div>

        <div className="relative z-10 pt-6 flex justify-center md:absolute md:top-8 md:left-12 md:justify-start">
          <img src={logo} alt="Lemonpay Logo" className="h-14" />
        </div>

        <div className="hidden md:flex absolute left-0 top-0 h-full w-1/2 flex-col justify-center px-16 text-white">
          <h1 className="text-4xl font-semibold mb-3">
            Join 1000<sup>+</sup> Businesses
          </h1>

          <h2 className="text-4xl font-semibold">
            <span className="text-yellow-400">Powering Growth</span> with
          </h2>

          <h2 className="text-4xl font-semibold mt-1">
            Lemonpay!
          </h2>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[80vh] px-6 md:absolute md:right-0 md:top-0 md:h-full md:w-1/2">
          <div className="w-full max-w-md text-white">

            <h2 className="text-3xl font-semibold mb-2">
              Welcome Sign Up System
            </h2>

            <p className="text-[16px] mb-6 text-white">
              Your gateway to seamless transactions and easy payments.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="text-sm text-white/90">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/30  
                             text-white placeholder-white/80
                             focus:outline-none
                             focus:shadow-[0_10px_20px_-8px_rgba(253,224,71,0.9)]
                             transition duration-300"
                  placeholder="mahadev@lemonpay.tech"
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label className="text-sm text-white/90">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg bg-white/30 
                               text-white placeholder-white/80
                               focus:outline-none
                               focus:shadow-[0_10px_20px_-8px_rgba(253,224,71,0.9)]
                               transition duration-300"
                    placeholder="Min 8 characters"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm text-white/90">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    className="w-full px-4 py-3 rounded-lg bg-white/30 
                               text-white placeholder-white/80
                               focus:outline-none
                               focus:shadow-[0_10px_20px_-8px_rgba(253,224,71,0.9)]
                               transition duration-300"
                    placeholder="Confirm password"
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-xl"
                  >
                    {showConfirm ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-white">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-white" />
                  Remember me
                </label>

                <Link to="/" className="hover:underline">
                  Sign In
                </Link>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-[#000] py-3 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
              >
                Sign Up
              </button>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
