'use client'

import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getToken } from "../../../../utils/getToken";
import { ToastContainer, toast } from "react-toastify";
import { perfil } from "@/consulta api/User";
import { useRouter } from "next/navigation";

const FormUser = ({user,msj}) => {
    if(msj!==undefined) return <h1 className="text-red-900 text-6xl my-10 text-center bg-white rounded-lg py-4">{msj}</h1>
    const router=useRouter();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [loading,setLoading]=useState(false);
    const script = /[<">/']/;
    const [editFields,setEditFields]=useState(true);

    const editUser=async(data)=>{
        if (user.nombre===data.nombre && user.telefono===data.telefono && user.direccion===data.direccion) return
        setLoading(true);
        const {token,message}= await getToken();
        if(token===false) {
            setLoading(false);
            return toast.error(message,{duration:3000});
        }
        const res = await perfil(token,"PUT","editarperfil",data);
        setLoading(false);
        if(!res)return toast.error("Error 404: Could not edit",{duration:2000});
        router.refresh();
        setEditFields(false);
        toast.success("Edited profile",{duration:2000});
    }
  return (
    <main className="marco-profile my-10 p-10 bg-opacity-20 border-4 border-green-900 bg-white shadow-white shadow-lg capitalize rounded-xl">
        <section className="flex justify-between items-center">
            <h1 className="text-shadow-lg shadow-black text-3xl font-extrabold text-orange-700">information of {user.nombre}</h1>
            <Button className="bg-blue-900 border-2 border-black mt-5 shadow-black shadow-md" 
            onClick={()=>{
                reset({
                    nombre:`${user.nombre}`,
                    telefono:`${user.telefono}`,
                    direccion:`${user.direccion}`
                })
                return(setEditFields(!editFields))
                }}>
                    Edit profile
            </Button>
        </section>
        <section>
            <form onSubmit={handleSubmit(editUser)}  className="flex flex-col gap-4 my-5">
                <Input color="black" disabled label="Email" defaultValue={user.email} className={`bg-black border-2 shadow-black shadow-sm text-xl font-bold text-blue-900`}  size="lg"/>
                <Input color={editFields?"black":"white"} disabled={editFields} label="Name" defaultValue={user.nombre} className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold `} size="lg" {...register("nombre",
                {
                    required: "Name field required",
                    minLength:{value:10, message:"Min 10 characters in this field"},
                    maxLength:{value:35, message:"Max 35 characters in this field"},
                    validate: {
                    isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                    }
                })} />
                {errors.nombre && <span className="text-red-900 text-lg">{errors?.nombre?.message}</span>}

                <Input type="tel" disabled={editFields} label="Telephone" defaultValue={user.telefono} color={editFields?"black":"white"}  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold `} size="lg" {...register("telefono",
                {
                    required: "Telephone field required",
                    minLength:{value:10, message:"Min 10 digits in this field"},
                    maxLength:{value:14, message:"Max 14 digits in this field"},
                    validate: {
                    isNumber: value => !/[-.]/.test(value) || "Should be a Telephone",
                    isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                    }
                })} />
                {errors.telefono && <span className="text-red-900">{errors?.telefono?.message}</span>}

                <Input disabled={editFields} label="Address" defaultValue={user.direccion} color={editFields?"black":"white"}  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold `} size="lg" {...register("direccion",
                {
                    required: "Address field required",
                    maxLength:{value:20, message:"Max 20 Characters in this field"},
                    validate: {
                    isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                    }
                })} />
                {errors.direccion && <span className="text-red-900">{errors?.direccion?.message}</span>}

                <Button disabled={loading || editFields} fullWidth className="bg-green-800 border-2 border-black mt-5 shadow-black shadow-md" type="submit">
                Save Changes
                </Button>

            </form>
   

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

export default FormUser
