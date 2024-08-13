import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';


export function useAMGAuthorize() {
  const [isLogin, setIsLogin] = useState(false);
  //const [token, setToken] = useState(null);
  const twoFactorCode = '';
  const twoFactorRecoveryCode ='';
  const amgAuthorizeDomain = process.env.amgAuthorizeDomain;

  const loginUser = async (email, password) => 
    {
      setIsLogin(true);
      try 
      {
        const response = await fetch(`${amgAuthorizeDomain}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            twoFactorCode,
            twoFactorRecoveryCode
          }),
        });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      // localStorage.setItem('accessToken', data.token);
          // setToken(data.token);
      const token = data.token; // Assuming the token is in the `token` field of the response
      
      res.setHeader('Set-Cookie', serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      }));
    
      res.status(200).json({ success: true });

    } catch (error) {
      console.error('Login error:', error);
    }
    finally {
      setIsLogin(false);
    }  

  };

  return{loginUser, isLogin};
}
