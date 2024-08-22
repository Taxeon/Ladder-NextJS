// app/api/cookie/route.js
//import { serialize } from 'cookie';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; 

export async function POST(request) {
    
    try {
        // Extract the Bearer token from the Authorization header
        const authHeader = request.headers.get('Authorization');
        console.log(authHeader)
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return NextResponse.json({ message: 'Missing or invalid Authorization header' }, { status: 401 });
        }
    
        const token = authHeader.split(' ')[1];

        // Set the cookie
        const cookieName = 'UCL_AU_Token';
        const response = NextResponse.json({ message: 'Cookie created successfully' });
    
        // Set the cookie in the response
        response.cookies.set(cookieName, token, {
          httpOnly: true, // Only accessible via HTTP(S)
          secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
          sameSite: 'Strict', // Strict same-site policy
          path: '/', // Root path (available on all pages)
        });
    
        return response;
      } catch (error) {
        console.error('Error setting cookie:', error);
        return NextResponse.json({ message: 'Failed to set cookie' }, { status: 500 });
      }
}

export async function GET(req) {
  const cookieStore = cookies(); // Get the cookie store
  const token = cookieStore.get('UCL_AU_Token'); // Get the specific cookie

  if (!token) {
    return NextResponse.json({ error: 'Token not found' }, { status: 403 });
  }

  try {
    console.log(token)
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET); // Replace with your secret key
    console.log('JWT decode:', decoded);
    return NextResponse.json({ email: decoded.sub || "Someone@SomeDomain.com" }, { status: 200 });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}