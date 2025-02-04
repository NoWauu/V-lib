import {Button} from "@/components/ui/button";
import {UserRoundPlus} from "lucide-react";
import {CardFooter} from "@/components/ui/card";

export default function RegisterFormFooter() {
    return (
        <CardFooter className="flex justify-center items-center mx-10">
            <Button
                className="w-full tracking-wider flex items-center justify-center gap-2"
                effect={"ringHover"}
                type="submit"
            >
                <UserRoundPlus />
                <span>S&#39;enregistrer</span>
            </Button>
        </CardFooter>
    );
}