import { Localizacao } from "@/components/Localizacao";
import Navbar from "@/components/navbar/Navbar";

export default function LocalizacaoPage() {
    return (
        <main className="relative min-h-screen">
            <Navbar />
            <Localizacao/>
        </main> 
    );
}
