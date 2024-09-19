'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  ///accessing session from the client
  const{status, data:session}=useSession()
  if(status === 'loading') return 'sign in ....'

  return (
    <ul className="flex gap-10 bg-slate-400 p-10 w-full justify-center">
      <Link href="/" className='hover:font-semibold' >Home</Link>
      <Link href="/users" className='hover:font-semibold' >User</Link>
      {status === 'unauthenticated' && <Link href="/api/auth/signin" className='hover:font-semibold' >SIGN IN</Link>}
      {status === 'authenticated' && <div>{session.user?.name} <Link href={'/api/auth/signout'}>Sign Out</Link></div>}
    </ul>
  );
};

export default Navbar;


