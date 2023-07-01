import { verificador } from "@/utils/verificadorUsuario";
import { redirect } from "next/navigation";
export default async function LoginLayout({ children }) {
  const {tipoUsuario} = await verificador();
  if (tipoUsuario===false) return <h1 className="text-red-900 font-extrabold bg-black bg-opacity-30 text-center text-6xl py-10">server problems, try login again later</h1>
  if (tipoUsuario !== "") return redirect("/");
  return (
    <div>
      {children}
    </div>
  );
}