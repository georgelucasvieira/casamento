import { Localizacao } from "@/components/Localizacao";
import Navbar from "@/components/navbar/Navbar";
import { getChurchSlots } from "@/lib/db";

export default async function LocalizacaoPage() {
    const slots = await getChurchSlots();
    const churchImageSlot = slots.church?.map((item) => item.image).filter(Boolean) as string[] | undefined;

    return (
        <main className="relative min-h-screen">
            <Navbar />
            <Localizacao churchImageSlot={churchImageSlot}/>
        </main>
    );
}
