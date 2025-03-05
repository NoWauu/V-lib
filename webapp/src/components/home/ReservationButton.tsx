import Link from "next/link";

export default function ReservationButton(){
  return(
    <div className="my-8">
      <Link
        href="/reservation"
        className="text-lg bg-primary rounded-lg text-background px-4 py-2 hover:bg-primary/85 transition duration-300 hidden md:inline"
      >
        Réservez dès maintenant !
      </Link>
    </div>
  );
}