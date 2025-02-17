import React from 'react';
import Link from 'next/link';


const NavLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => {
  return (
    <Link className="border px-3 py-1 border-primary_color rounded-full" href={href}>
      {children}
    </Link>
  );
}

export default NavLink;
