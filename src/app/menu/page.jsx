'use client'
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Dialog } from "@material-tailwind/react";
import dynamic from "next/dynamic";
import { getData } from "@/consulta api/Products";
const MenuCard = dynamic(() => import("../../components/MenuCard"));
const ModalMenu = dynamic(() => import("../../components/ModalMenu"));

const Productos = () => {
  const [menu, setMenu] = useState({});
  const [productosMostrar, setProductosMostrar] = useState([]);
  const [open, setOpen] = useState(false);

  const getDatos=async()=>{
    const { res, message, productos } = await getData();
    if (res) {
      setProductosMostrar(productos);
      return
    }
    toast.error(message, {
      duration: 4000,
    });
  }

  useEffect(() => {
    getDatos();
  }, [])

  const openMenu = (item) => {
    setOpen(!open);
    setMenu(item);
  }
  return (
    <div className="bg-brown-200 grid lg:grid-cols-2 grid-cols-1 gap-2 p-2 bg-">
      {productosMostrar ? productosMostrar.map((item, index) => (
        <div key={"product" + index} onClick={() => openMenu(item)}>
          <MenuCard item={item} />
        </div>
      )) : <h1  className="text-red-900 font-extrabold bg-black bg-opacity-30 text-center text-6xl py-10">No content</h1>}
      <Dialog className="rounded-xl shadow-white shadow-xl" size="sm" open={open} handler={() => setOpen(!open)}>
        <ModalMenu item={menu} />
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
    </div>
  )
}
export default Productos
