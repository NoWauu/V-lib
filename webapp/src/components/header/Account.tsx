"use client";

import Link from "next/link";

export default function Account() {
  return (
    <Link
      href="/connexion"
      className="text-lg bg-primary rounded-lg text-background px-3 py-1 hover:bg-primary/85 transition duration-300 hidden md:block"
    >
      Connexion
    </Link>
  );
}
