import { redirect } from "next/navigation";
import { verificador } from "../../utils/verificadorUsuario";
export default async function UserLayout({children}) {
    const {tipoUsuario} = await verificador();
    if (tipoUsuario !== "user") return redirect("/login");
  return (
    <div>
      {children}
    </div>
  );
}