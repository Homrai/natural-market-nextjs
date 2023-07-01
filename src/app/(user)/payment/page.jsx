import { cookies } from "next/dist/client/components/headers";
import FormPayment from "./components/FormPayment";
import { refreshPagina } from "@/consulta api/Login";
import { perfil } from "@/consulta api/User";

export const getTokenServer=async()=>{
  const cookie = cookies();
   let message = "";
   const {value}=cookie.get("refreshToken");
   const {token}= await refreshPagina(value);
   if (token===false) {
       message = "authentication problem, login again pls"
   }
   return {token,message}
}

export default async function Payment() {
  const {token,message}= await getTokenServer();
  if (!token) return <FormPayment msj={message} />
  const res = await perfil(token,"GET","perfil");
  if (!res) return <FormPayment msj={"authentication problem, login again pls"} />
  const {dataUser}=res;
  return (
    <div>
      <FormPayment usuario={dataUser} token={token}/>
    </div>
  );
}