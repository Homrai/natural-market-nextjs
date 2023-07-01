'use client'

import { marcarPedidoEntregado } from "@/consulta api/Orders";
import { Button, Card, CardBody, CardFooter, CardHeader, Input, Option, Select } from "@material-tailwind/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { getToken } from "../../../../utils/getToken";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";


const ShowOrders = ({orders,msj}) => {
    if(msj!==undefined) return <h1 className="text-red-900 text-6xl my-10 text-center bg-white rounded-lg py-4">{msj}</h1>
    const { register, handleSubmit, control} = useForm();
    const router= useRouter();
    const [ordersFilter,setOrdersFilter]=useState(orders);
    const [loading,setLoading]=useState(false);

    const filter=(data)=>{
        const {username,state,deliver}=data;
        if(username==="" && state==="" && deliver==="" || username==="" && state===undefined && deliver===undefined) return setOrdersFilter(orders);
        let filteredOrder = orders;
        if (username!==""){
            filteredOrder=filteredOrder.filter(item=>item.informacionComprador.nombre===username);           
        }
        if (state!=="" && state!==undefined){
            filteredOrder=filteredOrder.filter(item=>item.estadoCompra===state);           
        }
        if (deliver!=="" && deliver!==undefined){
            let flag = true;
            if (deliver==="false") {
                flag=false;
            }
            filteredOrder=filteredOrder.filter(item=>item.entregado===flag);           
        }
        setOrdersFilter(filteredOrder);
    }

    const deliverState=async(id)=>{
        const {token,message}=await getToken();
        setLoading(true);
        if(token===false) {
            setLoading(false);
            return toast.error(message,{duration:3000});
        }
        const {mensaje} = await marcarPedidoEntregado(id,token);
        let filter = ordersFilter.filter(item=>item._id!==id);
        setOrdersFilter(filter);
        setLoading(false);
        toast.success(mensaje,{duration:3000});
        router.refresh();
    }

    return (
        <main>
            <section className="bg-gray-400 shadow-lg shadow-black  border-4 border-white m-5 p-10 rounded-lg">
                <form onSubmit={handleSubmit(filter)}>
                    <article className="flex sm:flex-row flex-col gap-3 mb-4">
                    <Controller control={control} name="state"
                    render={({field: {onChange}})=>(
                        <Select size="lg" label="Purchase status" className="bg-white border-black shadow-black shadow-md text-2xl font-extrabold" 
                        defaultValue="" onChange={onChange}>
                            <Option className="text-2xl text-white" value="">Empty</Option>
                            <Option className="text-2xl text-green-600" value="approved">Approved</Option>
                            <Option className="text-2xl text-red-600" value="rejected">Rejected</Option>
                            <Option className="text-2xl text-amber-500" value="pending">Pending</Option>
                        </Select>
                    )}
                    />
                    <Controller control={control} name="deliver"
                    render={({field: {onChange}})=>(
                        <Select size="lg" label="Delivery" className="bg-white border-black shadow-black shadow-md text-2xl font-extrabold"
                        defaultValue="" onChange={onChange}>
                            <Option className="text-2xl text-white" value="">Empty</Option>
                            <Option className="text-2xl text-green-600" value="true">Delivered</Option>
                            <Option className="text-2xl text-red-600" value="false">Undelivered</Option>
                        </Select>
                    )}
                    />
                    
                    </article>
                    <article>
                        <Input label="Username" className="bg-white border-black shadow-black text-xl shadow-md font-extrabold"
                        {...register("username")}/>
                        <Button type="submit" className=" bg-light-green-900 border-black shadow-black shadow-md text-lg font-extrabold mt-5">Search</Button>
                    </article>
                </form>    

            </section>
            <section className="my-5 p-10 bg shadow-white shadow-md">
                {ordersFilter?.map(({_id,informacionComprador,fechaEntrega,precioCompra,estadoCompra,tipoPago,entregado},index)=>(
                    <Card className="my-10 mx-auto shadow-lg shadow-black  w-10/12 bg-white" key={"orderGeneral"+index}>
                        <CardHeader className="px-2 shadow-md shadow-black  py-1 bg-green-900 text-orange-700">
                            <div className="flex flex-col sm:flex-row sm:gap-2 justify-center font-extrabold">Order Number:<p>{_id}</p></div>
                        </CardHeader>
                        <CardBody className="flex flex-col sm:flex-row gap-5 justify-around">
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
                        </CardBody>
                        {!entregado?
                            <CardFooter className="flex justify-center">
                                <Button disabled={loading} className="shadow-lg shadow-black  bg-green-900" onClick={()=>deliverState(_id)}>Mark as delivered</Button>
                            </CardFooter>
                        :""    
                        }
                    </Card>
                ))}
            </section>
            <ToastContainer
                position="top-center"
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </main>
    )
}

export default ShowOrders
