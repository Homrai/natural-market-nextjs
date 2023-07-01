import { refreshPagina } from "@/consulta api/Login";
import { cookies } from "next/headers";
import FormUser from "./components/FormUser";
import { perfil } from "../../../consulta api/User";
const getTokenServer=async()=>{
  const cookie = cookies();
   let message = "";
   const {value}=cookie.get("refreshToken");
   const {token}= await refreshPagina(value);
   if (token===false) {
       message = "authentication problem, login again pls"
   }
   return {token,message}
}

export default async function Profile() {
  const {token,message}= await getTokenServer();
  if (!token) return <FormUser msj={message} />
  const res = await perfil(token,"GET","perfil");
  if (!res) return <FormUser msj={"authentication problem, login again pls"} />
  const {dataUser}=res;
  return (
    <div>
      <FormUser user={dataUser} />
    </div>
  );
}