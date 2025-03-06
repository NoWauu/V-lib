import Link from "next/link";

const pagesLinks = [
  { name: "Accueil", path: "/" },
  { name: "Réservation", path: "/reservation" },
  { name: "Contact", path: "/contact" },
];

export default function Links() {
  return (
    <nav className="gap-6 absolute left-1/2 transform -translate-x-1/2 items-center justify-center hidden md:flex">
      {pagesLinks.map((link, index) => (
        <Link
          key={index}
          href={link.path}
          className="text-lg text-foreground hover:text-primary"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
