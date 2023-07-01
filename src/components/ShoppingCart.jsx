'use client'
import { getData } from "@/consulta api/Products";
import { Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
const ShoppingCart = ({tipoUsuario,titulo}) => {
    const router = useRouter();
    const [showCart,setShowCart]=useState(false);
    const [cartList,setCartList]=useState([]);
    const [productosApi,setProductosApi]=useState([]);
    const [saveButton,setSaveButton]=useState(true);
    const [total,setTotal]=useState(0);
    const getDataCart= async ()=>{
        const data = JSON.parse(localStorage.getItem("listaCarrito"))||[];
        setCartList(data);
        const {res, productos}= await getData();
        if(!res) return setProductosApi([]);
        setProductosApi(productos);
    }
    const getTotal=()=>{
        const sumTotal = cartList.reduce((sum,{cantidad,precio})=>Number(sum)+(Number(cantidad)*Number(precio)),0);
        setTotal(sumTotal);
    }
    useEffect(()=>{
        getDataCart();
        getTotal();
    },[showCart]);
    const resItem=(id)=>{
        setSaveButton(false);
        let res =cartList.map(item=>{
            if (item.id===id) {
                if(item.cantidad===0) return item
                item.cantidad=item.cantidad-1;
                return item
            }
            return item
        });
        let res2=res.filter(item=>item.cantidad!==0);
        setCartList(res2);
        getTotal();
    }
    const sumItem=(id)=>{
        setSaveButton(false);
        let {cantidad} = productosApi.filter(item=>item._id===id)[0];
        let res =cartList.map(item=>{
            if (item.id===id) {
                if(item.cantidad>=cantidad) return item
                item.cantidad=item.cantidad+1;
                return item
            }
            return item
        });
        let res2=res.filter(item=>item.cantidad!==0);
        setCartList(res2);
        getTotal();
    }
    const saveChanges=()=>{
        setSaveButton(true);
        localStorage.setItem('listaCarrito', JSON.stringify(cartList));
    }

    const buyNow=()=>{
        if (tipoUsuario!=="user"){
            toast.error("Need login first",{duration:1000});
            return setTimeout(() => {
                setShowCart(false);
                router.push("/login");
            }, 2000);
            
        }
        setShowCart(false);
        router.push("/payment");
    }
    if (tipoUsuario==="Administrador")return
  return (
    <div className="absolute right-0">
      <div hidden={showCart} className="cursor-pointer text-lg sm:text-3xl lg:text-5xl xl:text-7xl text-green-900 z-40 bi bi-cart4 bg-orange-900 rounded-full p-2 md:p-5 xl:p-10 m-5 border-2 md:border-4 hover:opacity-80 " onClick={()=>setShowCart(!showCart)}>
        <p className={`text-white ${cartList.length!==0?"animate-ping":""} absolute text-xs md:text-sm right-6 md:right-10 xl:right-12 top-6 md:top-9 xl:top-12 rounded-full bg-red-900 px-1 border-2`}>{cartList.length}</p>
      </div>
      <Dialog className="rounded-xl bg-light-green-900 border-4 border-orange-900 shadow-lg shadow-white" size="sm" open={showCart} handler={() => setShowCart(!showCart)}>
            <DialogHeader className=" text-orange-700">
                        <h1 className={`${titulo.className} text-shadow-sm shadow-white  text-center text-5xl md:text-6 xl mx-auto  capitalize`}>
                            Cart List
                        </h1>
            </DialogHeader>
            <DialogBody divider={true} className="p-5 flex flex-col bg-black">
                {cartList?.map(({nombre,cantidad,precio,id,imagen},i)=>(
                    <div key={"cartList"+i} className="grid grid-cols-4 items-center text-white">
                        <img src={imagen} width={50} height={50} className="rounded-full" alt={nombre} />
                        <h1 key={"listCart"+i}>{nombre}</h1>
                        <div className="flex gap-1 justify-end items-center">
                            <p className="cursor-pointer bg-red-900 rounded-full text-white px-2 my-auto" onClick={()=>resItem(id)}>-</p>
                            <p>{cantidad}</p>
                            <p className="cursor-pointer bg-green-900 rounded-full text-white px-2 my-auto" onClick={()=>sumItem(id)}>+</p>
                        </div>
                        <p className="self-center place-self-end">$ {precio*cantidad}</p>
                    </div>
                ))}
                <div className="flex justify-between text-red-900 font-extrabold text-xl">
                    <h1>Total</h1>
                    <h1>$ {total}</h1>
                </div>
                <button hidden={saveButton} onClick={saveChanges} className=" text-white bg-blue-600 py-1 px-6 rounded-full">Save changes</button>
            </DialogBody>
            <DialogFooter className="">
                    <button onClick={buyNow} className="mx-auto shadow-md shadow-black rounded-xl px-4 bg-orange-900 text-white">buy now</button>
            </DialogFooter>
            <ToastContainer
                    className="z-50"
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
      </Dialog>

    </div>
  )
}

export default ShoppingCart
