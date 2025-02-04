import Link from "next/link";

export default function ForgotPassword() {
  return (
    <div>
      <Link
        href="/reinitialisation-identifiants"
        className="ms-1 text-sm"
      >
        Mot de passe oublié ?
      </Link>
    </div>
  );
}