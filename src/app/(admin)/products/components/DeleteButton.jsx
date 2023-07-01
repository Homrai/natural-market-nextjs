'use client'

import { borrarProductos } from "@/consulta api/Products";
import { Dialog } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "../../../../utils/getToken";

const DeleteButton = ({producto}) => {
  const router=useRouter();
  const [open,setOpen]=useState(false);
  const deleteItem = async()=>{
    const {token,message}= await getToken();
    if(token===false) return toast.error(message,{duration:2000});
    const res = await borrarProductos(token,producto._id);
    if (res){
      setOpen(!open);
      setTimeout(() => {
        router.refresh();
      }, 2000);
      return toast.success(`${producto.nombre} has been success deleted`);
    }
    return toast.error(`There was a problem deleting ${producto.nombre}, pls try later`);
  }
  return (
    <>
      <button className="cursor-pointer bi bi-trash bg-red-900 rounded-full p-2 border border-black shadow-md shadow-black" onClick={()=>setOpen(!open)}></button> 
      <Dialog size="sm" open={open} handler={() => setOpen(!open)}>
        <div className="mx-auto flex flex-col py-14 items-center bg-brown-900 rounded-3xl border-4 border-white text-white">
          <h1 className="text-3xl">Are you sure to delete <p className="text-deep-orange-500 underline capitalize">{producto.nombre}</p> product?</h1>
          <div className="flex gap-5 mt-4">
            <button className="bg-red-900 rounded-full p-5 text-white text-2xl" onClick={deleteItem}>Yes</button>
            <button className="bg-blue-900 rounded-full p-5 text-white text-2xl" onClick={()=>setOpen(!open)}>No</button>
          </div>
        </div>
      </Dialog>
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
    </>
  )
}

export default DeleteButton
