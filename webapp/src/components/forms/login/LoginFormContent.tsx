import LoginInput from "@/components/forms/Input";
import {CardContent} from "@/components/ui/card";
import ForgotPassword from "@/components/forms/login/ForgotPassword";

export default function LoginFormContent() {
    return (
        <CardContent className="space-y-2">
            <LoginInput
                id="login_email"
                content="Adresse mail"
                placeholder="exemple@vlib.com"
                textCase="lowercase"
            />

            <LoginInput
                id="login_password"
                content="Mot de passe"
                placeholder="******"
                type="password"
            />

            <ForgotPassword />
        </CardContent>
    );
}