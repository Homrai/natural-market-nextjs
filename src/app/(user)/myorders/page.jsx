import { cookies } from "next/headers";
import { mostrarPedidosUsuario } from "../../../consulta api/Orders";
import { refreshPagina } from "@/consulta api/Login";
//import { Card, CardBody, CardHeader } from "@material-tailwind/react";
const getTokenServer=async()=>{
  const cookie = cookies();
   let message = "";
   const {value}=cookie.get("refreshToken");
   const {token,uid}= await refreshPagina(value);
   if (token===false) {
       message = "authentication problem, login again pls"
   }
   return {token,message,uid}
}
export default async function MyOrders() {
  const {token,message,uid}= await getTokenServer();
  if (!token) return <h1 className="text-red-900 text-6xl my-10 text-center bg-white rounded-lg py-4">{message}</h1>
  const orders = await mostrarPedidosUsuario(token,uid);
  if(orders.error!==undefined) return <h1 className="text-red-900 text-6xl my-10 text-center bg-white rounded-lg py-4">Auth problem, pls login again</h1>
  return (
    <main className="my-5 p-10 bg shadow-white shadow-md">
      <h1 className="text-shadow-lg shadow-black text-orange-700 text-5xl text-center font-extrabold">Orders</h1>
      {orders?.map(({_id,informacionComprador,fechaEntrega,precioCompra,estadoCompra,tipoPago,entregado},index)=>(
          <section className="rounded-xl my-5 mx-auto shadow-lg shadow-black  w-10/12 bg-white" key={"orderGeneral"+index}>
              <article className="px-2 shadow-md shadow-black  py-1 bg-green-900 text-orange-700">
                  <div className="flex flex-col sm:flex-row sm:gap-2 justify-center font-extrabold">Order Number:<p>{_id}</p></div>
              </article>
              <article className="flex flex-col sm:flex-row gap-5 justify-around">
                  <div>
                      <h1 className="capitalize underline font-extrabold text-green-900">
                          Client information:
                      </h1>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Name:<p className="text-black font-semibold">{informacionComprador.nombre}</p></div>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Address:<p className="text-black font-semibold">{informacionComprador.direccion}</p></div>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Tel:<p className="text-black font-semibold">{informacionComprador.telefono}</p></div>
                  </div>
                  <div>
                      <h1 className="capitalize underline font-extrabold text-green-900">
                          Order information:
                      </h1>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Order delivery date:<p className="text-black font-semibold">{fechaEntrega.fecha}</p></div>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Full payment:<p className="text-black font-semibold">$ {precioCompra}</p></div>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Payment status:<p className={`${estadoCompra==="approved"?"text-green-900":""} ${estadoCompra==="rejected"?"text-red-900":""} ${estadoCompra==="pending"?"text-amber-500":""} font-semibold`}>{estadoCompra}</p></div>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Payment type:<p className="text-black font-semibold">{tipoPago}</p></div>
                      <div className="flex capitalize gap-2 text-orange-700 font-bold">Delivered:<p className={`text-black font-semibold ${entregado?"text-green-900":"text-red-900"}`}>{entregado?"Delivered":"Undelivered"}</p></div>
                  </div>
              </article>
          </section>
      ))}
    </main>
  );
}