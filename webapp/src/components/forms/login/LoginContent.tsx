import {Card, CardHeader, CardTitle} from "@/components/ui/card";

import {TabsContent} from "@/components/ui/tabs";
import LoginForm from "@/components/forms/login/LoginForm";


export default function LoginContent() {
  return (
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Identifiants</CardTitle>
        </CardHeader>
        <LoginForm/>
      </Card>
    </TabsContent>
  );
}