import Link from "next/link";

export default function APropos(){
  return (
    <Link
      href="/a-propos"
      className="hover:text-gray-800 transition duration-300"
    >
      À propos de nous
    </Link>
  );
}