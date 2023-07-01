import { verificador } from "@/utils/verificadorUsuario";
import { redirect } from "next/navigation";

export default async function AdminLayout({children}) {
    const {tipoUsuario} = await verificador();
    if (tipoUsuario !== "Administrador") return redirect("/login");
    return (
        <div>
        {children}
        </div>
    );
}