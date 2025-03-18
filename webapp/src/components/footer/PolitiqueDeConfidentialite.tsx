import Link from "next/link";

export default function PolitiqueDeConfidentialite(){
  return (
    <Link
      href="/politique-de-confidentialite"
      className="hover:text-gray-800 transition duration-300"
    >
      Politique de confidentialité
    </Link>
  );
}
