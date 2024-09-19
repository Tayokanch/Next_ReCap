import React, { Suspense } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { sort } from 'fast-sort';

interface UserI {
  name: string;
  id: number;
  email: string;
}

interface Props {
  searchParams: { sortOrder: string };
}
const UserPage = async ({ searchParams: { sortOrder } }: Props) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  });
  const users: UserI[] = await res.json();
  const sortedUsers = sort(users).asc(
    sortOrder === 'name' ? (user) => user.name : (user) => user.email
  );

  return (
    <div className="flex flex-grow justify-evenly">
      <div>
        <Link
          className="text-5xl font-bold text-center text-orange-600"
          href="/users?sortOrder=name"
        >
          Name
        </Link>

        <Suspense fallback={<p>Loading...</p>}>
          <ul className="mx-8 md:m-auto">
            {sortedUsers &&
              sortedUsers.map((user) => (
                <li
                  key={user.id}
                  className="bg-black text-white p-2 m-3 text-center rounded-md hover:bg-white hover:text-black cursor-pointer "
                >
                  {user.name}
                </li>
              ))}
          </ul>
        </Suspense>
      </div>

      <div>
        <Link
          className="text-5xl font-bold text-center text-orange-600"
          href="/users?sortOrder=email"
        >
          Email
        </Link>
        <Suspense fallback={<p>Loading...</p>}>
          <ul className="mx-8 md:m-auto">
            {users &&
              users.map((user) => (
                <li
                  key={user.id}
                  className="bg-black text-white p-2 m-3 text-center rounded-md hover:bg-white hover:text-black cursor-pointer "
                >
                  {user.email}
                </li>
              ))}
          </ul>
        </Suspense>
      </div>
    </div>
  );
};

export default UserPage;
