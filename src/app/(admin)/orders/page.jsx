import { mostrarPedidos } from "../../../consulta api/Orders";
import {cookies} from "next/headers";
import ShowOrders from "./components/ShowOrders";
import { refreshPagina } from "@/consulta api/Login";

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

export default async function Orders() {
  const {token,message}= await getTokenServer();
  if (!token) return <ShowOrders msj={message} />
  const orders = await mostrarPedidos(token);
  return (
    <ShowOrders orders={orders} />
  );
}