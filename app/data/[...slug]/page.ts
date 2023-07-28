'use client';

import { notFound, redirect, usePathname } from "next/navigation";

const Redirector = () => {
  const pathname = usePathname();
  if (pathname.startsWith('/data/(public)')) redirect(pathname.replace('(public)', ''));
  else notFound();
};


export default Redirector;