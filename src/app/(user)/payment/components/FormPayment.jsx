'use client'
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Collapse, Option, Select } from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import Datepicker from "react-tailwindcss-datepicker";
import { pedidos } from "@/consulta api/Orders";
import { ToastContainer, toast } from "react-toastify";

const FormPayment = ({usuario,msj,token}) => {
    if(msj!==undefined) return <h1 className="text-red-900 text-6xl my-10 text-center bg-white rounded-lg py-4">{msj}</h1>
    const [total,setTotal]=useState(0);
    const [pedido,setPedido]=useState([]);
    const [open,setOpen]=useState(false);
    
    const { handleSubmit,control, formState: { errors } } = useForm();

    const getOrderTotal=()=>{
        const order = JSON.parse(localStorage.getItem("listaCarrito"))||[];
        if(order?.length===0 || order===undefined) return 
        const sum=order.reduce((sum,{cantidad,precio})=>sum+(cantidad*precio),0);
        setTotal(sum);
        setPedido(order);
    }
    useEffect(()=>{
        getOrderTotal();
    },[])
    
    if(pedido.length===0) return <h1 className="text-red-900 text-6xl my-10 text-center bg-white rounded-lg py-4">You don't have products in your cart, please add some products and come back later</h1>
    
    const sendOrder = async(data)=>{
        let fechaEntrega={
            fecha: data.fecha.endDate,
            hora: data.hora,
        }
        usuario.token= token;
        usuario.uid= usuario.id;
        const res = await pedidos(token, "POST", "", { pedido, usuario, total, fechaEntrega });
        if (res.error !== undefined) return toast.error("problems in order generation", {duration: 4000});
        localStorage.setItem('listaCarrito', JSON.stringify([]));
        window.location.replace(res);
    }

  return (
    <main  className="marco-profile my-10 p-10 bg-opacity-20 border-4 border-green-900 bg-white shadow-white shadow-lg capitalize rounded-xl">
      <h1  className="bg-green-900 shadow-lg ps-5 bg-opacity-70 rounded-lg my-3 text-shadow-lg shadow-black text-5xl font-extrabold text-orange-700">confirm client data</h1>
      <section>
        <article  className="text-orange-700  my-5 bg-black bg-opacity-80 rounded-lg p-5 text2xl">
          <h1 className="text-orange-700  text-3xl">Buyer's data</h1>
          <h1>Buyer's name: <p className="text-xl text-white">{usuario.nombre}</p> </h1>
          <h1>Buyer's address: <p className="text-xl text-white">{usuario.direccion}</p> </h1>
          <h1>Buyer's Tel: <p className="text-xl text-white">{usuario.telefono}</p> </h1>
        </article>

        <article  className="text-orange-700 my-5 bg-black bg-opacity-80 rounded-lg p-5 text2xl">
            <Button onClick={()=>setOpen(!open)} className="shadow-lg shadow-black bg-green-900 text-orange-700  text-3xl">Show Order</Button>
            <Collapse open={open}>
                <Card className="my-4 mx-auto w-8/12 shadow-lg shadow-green-900 border-orange-500 border-2">
                <CardBody>
                {pedido?.map(({nombre,cantidad,precio,imagen},i)=>(
                    <div key={"cartList"+i} className="grid grid-cols-4 items-center  text-orange-900">
                        <img src={imagen} width={50} className="rounded-full" alt={nombre} />
                        <h1>{nombre}</h1>
                        <h1 className="place-self-end self-center">{cantidad}</h1>
                        <p className="self-center place-self-end">$ {precio*cantidad}</p>
                    </div>
                ))}
                <div className="flex flex-col items-end">
                    <h1 className="text-freen-900 font-extrabold">Total: {total}</h1>
                </div>
                </CardBody>
                </Card>
            </Collapse>
        </article>
        <article className="bg-black bg-opacity-80 rounded-lg my-5">
            <form onSubmit={handleSubmit(sendOrder)}>
                <h1 className="bg-green-900 shadow-black shadow-lg ps-5 bg-opacity-70 rounded-lg my-3 font-bolder text-orange-900 text-3xl">Pick delivery date</h1>
                <Controller
                    control={control}
                    name="fecha"
                    rules={{
                        required: true,
                      }}
                    render={({ field: { onChange, value} }) => (
                        <>
                        <Datepicker
                            value={value}
                            onChange={onChange}
                            primaryColor={"green"} 
                            asSingle={true} 
                            placeholder={"Pick delivery date"} 
                            inputClassName={"font-bolder text-green-900 text-3xl px-3 rounded-xl shadow-black shadow-lg my-3"}
                            minDate={new Date(Date.now())} 
                            maxDate={new Date(Date.now()+546200000)} 
                        />
                        {errors.fecha && <p className="text-2xl text-red-900 bg-black bg-opacity-50">This field is required.</p>}
                    </>
                    )}
                />
                <Controller
                    control={control}
                    name="hora"
                    rules={{
                        required: true,
                      }}
                    render={({ field: { onChange, value} }) => (
                        <>
                            <Select size="lg" label="delivery time" className="bg-white border-black shadow-black shadow-md text-2xl font-extrabold" 
                            onChange={onChange} name="hora" defaultValue={value}>
                                <Option className="text-2xl text-green-600" value="10:00">10:00am </Option>
                                <Option className="text-2xl text-green-600" value="11:00">11:00am</Option>
                                <Option className="text-2xl text-green-600" value="12:00">12:00pm</Option>
                                <Option className="text-2xl text-green-600" value="13:00">01:00pm</Option>
                                <Option className="text-2xl text-green-600" value="14:00">02:00pm</Option>
                                <Option className="text-2xl text-green-600" value="15:00">03:00pm</Option>
                                <Option className="text-2xl text-green-600" value="16:00">04:00pm</Option>
                                <Option className="text-2xl text-green-600" value="17:00">05:00pm</Option>
                            </Select>
                            {errors.hora && <p className="text-2xl text-red-900 bg-black bg-opacity-50">This field is required.</p>}

                        </>
                    )}
                />

                <Button type="submit" fullWidth className="bg-green-800 border-2 border-black mt-5 shadow-black shadow-md">
                Send Order
                </Button>
            </form>
        </article>
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

export default FormPayment
