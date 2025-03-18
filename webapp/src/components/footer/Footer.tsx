import MentionLegal from "@/components/footer/MentionLegal";
import PolitiqueDeConfidentialite from "@/components/footer/PolitiqueDeConfidentialite";
import APropos from "@/components/footer/APropos";
import Contact from "@/components/footer/Contact"

export default function Footer() {
  return (
    <div className="p-6 md:px-10 gap-4 flex flex-wrap justify-center w-full bg-gray-100 shadow-lg text-center">
      <p className="font-bold text-md text-center w-full text-foreground">
        Équipe V-lib © 2025 - Tous droits réservés
      </p>
      <div
        className="flex items-center gap-4 text-gray-600 justify-center w-full"
        style={{ textDecoration: "none", fontFamily: "Arial, sans-serif" }}
      >
        <PolitiqueDeConfidentialite/>
        |
        <MentionLegal/>
        |
        <APropos/>
        |
        <Contact/>
      </div>
    </div>
  );
}
