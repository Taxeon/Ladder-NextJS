import { useState } from "react";

export function useAMGAuthorize() {
	const [isLogin, setIsLogin] = useState(false);
	//const [token, setToken] = useState(null);
	const twoFactorCode = "";
	const twoFactorRecoveryCode = "";
	const amgAuthorizeDomain = process.env.NEXT_PUBLIC_AMGAUTHORIZE_DOMAIN_URL;

	console.log(`Domain URL used is:${amgAuthorizeDomain}`);

	const loginUser = async (email, password) => {
		setIsLogin(true);
		try {
			const response = await fetch(`${amgAuthorizeDomain}/api/Auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await response.json();

			if (!response.ok && data.token) {
				throw new Error("Login failed");
			}

			const token = data.token; // Assuming the token is in the `token` field of the response

			console.log("Post to set cookie method");

			try {
				const ResponseSetCookie = await fetch("/utils/cookie", {
					method: "POST",
					headers: {
						Authorization: token,
					},
				});

				const data = await ResponseSetCookie.json();

				if (ResponseSetCookie.ok) {
					console.log(data.message); // "Cookie created successfully"
				} else {
					console.error("Error:", data.message);
				}

			} catch (error) {				
				console.error("Set cookie Error:", error);
			}

		} catch (error) {
			console.error("Login error:", error);

		} finally {
			setIsLogin(false);
		}
	};

	return { loginUser, isLogin };
}
