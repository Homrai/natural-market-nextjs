'use client'
import { Button, Input } from '@material-tailwind/react'
import React, { useState,useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { enviarDatosRegistro } from '@/consulta api/Login';


const page = () => {
  const { register, handleSubmit,watch,reset, formState: { errors } } = useForm();
  const script = /[<">/']/;
  const router=useRouter();
  const [loading,setLoading]=useState(false);
  const [seePass,setSeePass]=useState(false);

useEffect(()=>{
    reset({
        email:"",
        nombre:"",
        password:"*",
        repassword:"",
        telefono:0,
        direccion:""
      })
},[])

  const addUser=async(data)=>{
     setLoading(true);
     const res = await enviarDatosRegistro(data);
     setLoading(false);
     if (res.error!==undefined) return toast.error(res.error[0].msg,{duration:2000});
     const {msj,ok}=res;
     if (!ok) return toast.error(msj,{duration:2000});
     toast.success(msj,{duration:2000});
     setTimeout(() => {
        
     }, 2000);
    router.push("/login");
}
  return (
    <main className="marco-profile my-10 p-10 bg-opacity-20 border-4 border-green-900 bg-white shadow-white shadow-lg capitalize rounded-xl">
    <section className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-orange-700">SignUp</h1>
    </section>
    <section>
        <form onSubmit={handleSubmit(addUser)}  className="flex flex-col gap-4 my-5">
        <Input label="Email" color="white"  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold`} size="lg" {...register("email",
            {
                required: "Email field required",
                minLength:{value:5, message:"Pls add valid email"},
                maxLength:{value:35, message:"The email is very length, pls add valid email"},
                validate: {
                isEmail:value=>value.includes("@") && value.includes(".") || "Pls add valid email",
                isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
            })} />
            {errors.email && <span className="text-red-900 text-lg">{errors?.email?.message}</span>}

        <Input type={seePass?"text":"password"} icon={<i onClick={()=>setSeePass(!seePass)} className={`bi ${seePass?"text-red-900 bi-eye-slash-fill":"bi-eye-fill text-blue-900 "} text-2xl rounded-xl`} />} label="Password" color="white"  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold`} size="lg" {...register("password",
            {
                required: "password field required",
                minLength:{value:7, message:"Min 7 characters in this field"},
                maxLength:{value:15, message:"Max 15 characters in this field"},
                validate: {
                isPassword:value=>/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(value) || "Password must contain letters, at least one number, and one symbol",
                isPasswordLetter:value=>/[a-zA-Z]/.test(value) || "Password must contain letters, at least one number, and one symbol",
                isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
            })} />
            {errors.password && <span className="text-red-900 text-lg">{errors?.password?.message}</span>}

        <Input type={seePass?"text":"password"} label="confirm_password" color="white"  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold`} size="lg" {...register("repassword",
            {
                required: "confirm password field required",
                validate: {
                    confPass: value => {
                        if(watch('password')!==value) return "Your passwords do no match"
                    },
                    isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
            })} />
            {errors.repassword && <span className="text-red-900 text-lg">{errors?.repassword?.message}</span>}

        <Input label="Name" color="white"  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold`} size="lg" {...register("nombre",
            {
                required: "Name field required",
                minLength:{value:10, message:"Min 10 characters in this field"},
                maxLength:{value:35, message:"Max 35 characters in this field"},
                validate: {
                isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
            })} />
            {errors.nombre && <span className="text-red-900 text-lg">{errors?.nombre?.message}</span>}

        <Input type="tel" label="Telephone" color="white"  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold`} size="lg" {...register("telefono",
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

            <Input label="Address" color="white"  className={`shadow-black shadow-sm bg-black border-2 text-xl font-bold`} size="lg" {...register("direccion",
            {
                required: "Address field required",
                maxLength:{value:20, message:"Max 20 Characters in this field"},
                validate: {
                isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
            })} />
            {errors.direccion && <span className="text-red-900">{errors?.direccion?.message}</span>}

            <Button disabled={loading} fullWidth className="bg-green-800 border-2 border-black mt-5 shadow-black shadow-md" type="submit">
                Create Account
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

export default page
