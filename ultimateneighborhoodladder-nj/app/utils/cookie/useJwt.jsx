// utils/decodeToken.js
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useJwt = () => {
  const [values, setValues] = useState(null);
  const NoCookieResult = "Cookie not found";

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const response = await fetch('/utils/cookie'); // Adjust the path as needed
        const data = await response.json();

        if (response.ok) {
          setValues({ email: data.email || 'someone@someemail.com' });
        } else {
          console.log(data.error || "No cookie found");
          setValues({ email: NoCookieResult });
        }
      } catch (error) {
        console.error("Error fetching token data:", error);
        setValues({ email: NoCookieResult });
      }
    };

    fetchTokenData();

    // Optional: Polling or re-checking every X seconds if necessary
    const intervalId = setInterval(fetchTokenData, 5000); // Check every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return values;
};

export const decodeToken = (token) => {
	try {
		console.log('Decoding Token')
		return jwtDecode(token);
	} catch (error) {
		console.error("Invalid token:", error);
		return null;
	}
};
