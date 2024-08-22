import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('UCL_AU_TK');

  if (!token) {
    return NextResponse.redirect('/auth');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
    
  } catch (error) {
    return NextResponse.redirect('/auth');
  }
}

export const config = {
  matcher: ['/account', '/ladders'], // Add all protected routes here
};

// Validate the token (same as before)
async function validateToken(token) {
  const response = await fetch('https://your-auth-api.com/validate', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return response.ok;
}