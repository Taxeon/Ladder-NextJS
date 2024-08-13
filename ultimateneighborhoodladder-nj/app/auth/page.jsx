'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useAMGAuthorize } from '../api/auth/useAMGAuthorize';
import { redirect } from 'next/dist/server/api-utils';

export default function LoginPage() {
  const existsUserToken = localStorage.getItem('accessToken');
  const {loginUser, isLogin} = useAMGAuthorize();
  const router = useRouter();
  
  if (existsUserToken != null )
    {
      console.log (existsUserToken)
      router.push('/');
    }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async (event) => {
    event.preventDefault();  
    loginUser(email,password);
  }

  return (
  
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
      <button type="submit" disabled={isLogin} >{isLogin ? 'Logging In...' : 'Submit'}</button>
    </form>
  );
}
