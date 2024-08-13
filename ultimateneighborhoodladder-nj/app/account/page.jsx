import React from 'react'
import { parseCookies } from 'nookies';


export default function page() {
  const { token } = parseCookies(context);

  if (!token) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      },
    };
  };

  const res=await
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/verifyToken`, {
    headers: {
      Cookie: `token=${token}`,
    },
  });

  if (res.status !== 200) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const data = await res.json();

  return {
    props: { user: data.user },
  };
};

  return (
    <div>page</div>
  )
}
