import {Button} from "@/components/ui/button";
import {LogIn} from "lucide-react";
import {CardFooter} from "@/components/ui/card";

export default function LoginFormFooter() {
    return (
        <CardFooter className="flex justify-center items-center mx-16">
            <Button
                type="submit"
                className="w-full tracking-wider flex items-center justify-center gap-2"
                effect={"ringHover"}
            >
                <LogIn />
                <span>Se connecter</span>
            </Button>
        </CardFooter>
    );
}