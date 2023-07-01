'use client'

import { editarProductos } from "@/consulta api/Products";
import { Button, Input } from "@material-tailwind/react";
import { getToken } from "../../../../../utils/getToken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

const Form = (item) => {
    const router = useRouter();
    const script = /[<">/']/;
    const {producto}=item;
    const [loading,setLoading]=useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    
    
    const enviarEdicionProducto = async (data)=>{
      if(data===producto) return router.push("/products");
      setLoading(true);
      try {
        data._id=producto._id;
        data.imagenes=producto.imagenes;
        data.cantidad=Number(data.cantidad);
        data.precio=Number(data.precio);
        const {token,message}= await getToken();
        if(token===false) return toast.error(message,{duration:3000});
            const {msj,ok} = await editarProductos(token,data);
            setLoading(false);
            if(ok){
                toast.success(msj,{duration:2000});
                setTimeout(() => {
                    return router.push("/products");
                }, 2000);
                return
            }
            return toast.error(msj,{duration:3000});
        } catch (error) {
            setLoading(false);
            return toast.error(error,{duration:3000});
        }
    }
  return (
    <div className="my-5">
        <img src={producto?.imagenes[0]} className="mx-auto my-3 w-1/6 rounded-full" alt={producto?.nombre} />
        <form onSubmit={handleSubmit(enviarEdicionProducto)}>
            <Input label="Product Name" className="text-white" defaultValue={producto?.nombre} size="lg" {...register("nombre",
              {
                required: "Product name field required",
                minLength:{value:10, message:"Min 10 characters in this field"},
                maxLength:{value:35, message:"Max 35 characters in this field"},
                validate: {
                  isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
              })} />
            {errors.nombre && <span className="text-red-900">{errors?.nombre?.message}</span>}

            <Input type="number" label="Item Price" className="text-white" defaultValue={producto?.precio} size="lg" {...register("precio",
              {
                required: "Product price field required",

                min:{value:1000, message:"value min > 1000 in this field"},
                max:{value:35000000, message:"value max < 35000000 in this field"},
                validate: {
                  isNumber: value => !/[+-.]/.test(value) || "Should be a Number",
                  isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
              })} />
            {errors.precio && <span className="text-red-900">{errors?.precio?.message}</span>}

            <Input type="number" label="Number of Items" className="text-white" defaultValue={producto?.cantidad} size="lg" {...register("cantidad",
              {
                required: "Number of items field required",
                min:{value:1, message:"value min > 1 in this field"},
                max:{value:2000, message:"value max < 2000 in this field"},
                validate: {
                  isNumber: value => !/[+-.]/.test(value) || "Should be a Number",
                  isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
              })} />
            {errors.cantidad && <span className="text-red-900">{errors?.cantidad?.message}</span>}

            <Input label="Description" className="text-white" defaultValue={producto?.descripcion} size="lg" {...register("descripcion",
              {
                required: "Description of item field required",
                minLength:{value:10, message:"Min 10 characters in this field"},
                maxLength:{value:250, message:"Max 250 characters in this field"},
                validate: {
                  isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
              })} />
            {errors.descripcion && <span className="text-red-900">{errors?.descripcion?.message}</span>}


            <Button disabled={loading} fullWidth className="bg-green-300 my-5 shadow-black shadow-lg" type="submit">
              Edit
            </Button>

        </form>
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
    </div>
  )
}

export default Form
