"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAMGAuthorize } from "../api/useAMGAuthorize";

export default function LoginPage() {
	const router = useRouter();
	const [errorMessage, setErrorMessage] = useState('');

	const { loginUser, isLogin } = useAMGAuthorize();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		setErrorMessage(""); // Clear any previous errors

		try {
			await loginUser(email, password);
			// Redirect to the home page on success
			router.push("/"); // Navigate to the home page
		} catch (error) {
			setErrorMessage("Login failed. Please try again.");
		}
	};

	return (
		<div>
			<form onSubmit={handleLogin}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Username"
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Password"
				/>
				<button type="submit" disabled={isLogin}>
					{isLogin ? "Logging In..." : "Submit"}
				</button>
			</form>
			{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
		</div>
	);
}
