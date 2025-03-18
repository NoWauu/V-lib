import Link from "next/link";

export default function MentionLegal(){
  return (
    <Link
      href="/mentions-legales"
      className="hover:text-gray-800 transition duration-300"
    >
      Mentions légales
    </Link>
  );
}

