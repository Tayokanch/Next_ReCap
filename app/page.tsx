import { Main } from 'next/document';
import Image from 'next/image';
import ProductCard from './components/ProductCard';
import { getServerSession } from 'next-auth';
import Navbar from './admin/Navbar';
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function Home() {
  //How to ge access to the session from the server
  const session = await getServerSession(authOptions);

  return (
    <main>
      <Navbar />
      <h1 className="font-bold">
 
        {session && <span>Hello, {session.user?.name?.toUpperCase()}</span>}
      </h1>
      <ProductCard />
    </main>
  );
}
