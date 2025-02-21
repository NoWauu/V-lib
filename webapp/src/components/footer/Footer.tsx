import Link from "next/link";

export default function Footer() {
  return (
    <div className="p-6 mt-8 md:px-10 gap-4 lg:mt-8 flex flex-wrap md:justify-center justify-center w-full bg-gray-100 rounded-lg shadow-lg text-center">
      <p className="font-bold text-md text-center w-full">
        Équipe V-lib © 2025 - Tous droits réservés
      </p>
      <div
        className="flex items-center gap-4 text-gray-600 justify-center w-full"
        style={{ textDecoration: "none", fontFamily: "Arial, sans-serif" }}
      >
        <Link
          href="/politique-de-confidentialité"
          className="hover:text-gray-800 transition duration-300"
        >
          Politique de confidentialité
        </Link>
        |
        <Link
          href="/mentions-legales"
          className="hover:text-gray-800 transition duration-300"
        >
          Mentions légales
        </Link>
        |
        <Link
          href="/a-propos"
          className="hover:text-gray-800 transition duration-300"
        >
          À propos de nous
        </Link>
        |
        <Link
          href="/contact"
          className="hover:text-gray-800 transition duration-300"
        >
          Contact
        </Link>
      </div>
    </div>
  );
}
