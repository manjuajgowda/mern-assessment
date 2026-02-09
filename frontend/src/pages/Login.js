import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import logo from "../../src/Assests/lemonpay-logo.svg";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
	const [form, setForm] = useState({ email: "", password: "" });
	const [showPassword, setShowPassword] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await API.post("/auth/login", form);

			localStorage.setItem("token", res.data.token);

			alert("Login successful! Redirecting...");

			setTimeout(() => {
				navigate("/task-page");
			}, 1000);

		} catch (err) {
			console.error("Login error:", err.response?.data || err.message);
			alert("Invalid credentials");
		}
	};


	return (
		<div className="min-h-screen bg-[#2f2f2f] flex items-center justify-center">
			<div className="relative w-full md:w-[95%] min-h-screen md:h-[90vh] rounded-none md:rounded-lg overflow-hidden shadow-2xl">
				<div className="absolute inset-0 bg-gradient-to-br from-white via-[#6b8bd6] to-[#2d2f9c]" />
				<div className="absolute top-[-80px] right-[-80px] w-64 h-64 bg-pink-200 opacity-40 rounded-full"></div>
				<div className="absolute bottom-[-120px] left-[30%] w-72 h-72 bg-pink-200 opacity-30 rounded-full"></div>
				<div className="absolute bottom-[-60px] left-[-60px] w-40 h-40 bg-blue-200 opacity-30 rounded-full"></div>
				<div className="relative z-10 pt-4 flex justify-center md:absolute md:top-8 md:left-12 md:justify-start">
					<img src={logo} alt="Lemonpay Logo" className="h-16" />
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
							Welcome Login System
						</h2>

						<p className="text-[16px] mb-6 text-white">
							Your gateway to seamless transactions and easy payments.
						</p>

						<form onSubmit={handleSubmit} className="space-y-5">

							<div>
								<label className="text-sm text-white/90">Email</label>
								<input
									type="email"
									className="w-full px-4 py-3 rounded-lg 
           bg-white/30 
           border border-transparent
           text-white placeholder-white/80
           focus:outline-none
           focus:shadow-[0_8px_20px_-5px_rgba(253,224,71,0.9)]
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

								<div className="relative mt-1">
									<input
										type={showPassword ? "text" : "password"}
										className="w-full px-4 py-3 rounded-lg 
bg-white/30                 border border-transparent
           text-white placeholder-white/80
           focus:outline-none
           focus:shadow-[0_8px_20px_-5px_rgba(253,224,71,0.9)]
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
										className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-lg"
									>
										{showPassword ? <FiEyeOff /> : <FiEye />}
									</button>
								</div>
							</div>


							<div className="flex justify-between items-center text-sm text-white/90">
								<label className="flex items-center gap-2">
									<input type="checkbox" className="accent-white" />
									Remember me
								</label>

								<Link to="/register" className="hover:underline">
									Sign Up
								</Link>
							</div>

							<button
								type="submit"
								className="w-full bg-white text-[#000] py-2.5 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
							>
								Sign In
							</button>

						</form>
					</div>
				</div>

			</div>
		</div>
	);
}
