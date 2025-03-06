import {TabsList, TabsTrigger} from "@/components/ui/tabs";

export default function TopBar() {
    return (
        <TabsList className="grid w-full grid-cols-2 bg-card border-border border-[1px]">
            <TabsTrigger value="login">Connexion</TabsTrigger>
            <TabsTrigger value="register">S&#39;enregistrer</TabsTrigger>
        </TabsList>
    );
}