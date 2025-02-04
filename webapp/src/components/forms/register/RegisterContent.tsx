import {Card} from "@/components/ui/card";

import {TabsContent} from "@/components/ui/tabs";
import RegisterHeader from "@/components/forms/register/RegisterHeader";
import RegisterForm from "@/components/forms/register/RegisterForm";

export default function RegisterContent() {
    return (
        <TabsContent value="register">
            <Card>
                <RegisterHeader />
                <RegisterForm />
            </Card>
        </TabsContent>
    );
}