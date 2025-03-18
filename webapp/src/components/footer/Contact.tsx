import Link from "next/link";

export default function Contact() {
  return (
    <Link
      href="/contact"
      className="hover:text-gray-800 transition duration-300"
    >
      Contact
    </Link>
  );
}