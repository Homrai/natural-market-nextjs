'use client'
import {
    DialogHeader,
    DialogBody,
    DialogFooter,
    Carousel,
  } from "@material-tailwind/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
   
  const ModalMenu=({item})=> {
    const {nombre, precio, cantidad, imagenes,_id,descripcion}=useMemo(()=>item,[item]);
    const [cantidadItem,setCantidadItem]=useState(0);
    const [precioItem,setPrecioItem]=useState(0);
    const producto=useMemo(()=>({id:_id,nombre, descripcion, imagen:imagenes[0], cantidad:cantidadItem,precio:precioItem,precioUnidad:precioItem}),[cantidadItem]);
    const buscarEnCarrito=()=>{
      let arr = JSON.parse(localStorage.getItem('listaCarrito'))||[];
      const encontrarItem = arr.filter(item=>item.nombre===nombre);
      if(encontrarItem.length!==0){
        if (encontrarItem[0].cantidad<=cantidad) {
          setCantidadItem(encontrarItem[0].cantidad);
          setPrecioItem((encontrarItem[0].cantidad)*precio);
        }
      }
    }
    useEffect(()=>{
      buscarEnCarrito();
    },[])

    const restarItem=useCallback(()=>{
      setCantidadItem(cantidadItem-1);
      setPrecioItem((cantidadItem-1)*precio);
    },[cantidadItem]);

    const sumarItem=useCallback(()=>{
      setCantidadItem(cantidadItem+1);
      setPrecioItem((cantidadItem+1)*precio);
    },[cantidadItem]);

    const agregarItem=()=>{
      let arr = JSON.parse(localStorage.getItem('listaCarrito'))||[];
      let encontrarItem = arr.filter(item=>item.nombre!==nombre);
      encontrarItem.push(producto);
      localStorage.setItem('listaCarrito', JSON.stringify(encontrarItem));
      toast.success(`Added ${nombre} into cart`,{
        duration: 3000,});
    }

    const deleteItem=()=>{
      let arr = JSON.parse(localStorage.getItem('listaCarrito'))||[];
      let encontrarItem = arr.filter(item=>item.nombre!==nombre);
      localStorage.setItem('listaCarrito', JSON.stringify(encontrarItem));
      toast.success(`Deleted ${nombre} of cart`,{
        duration: 3000,});
    }
    return (
        <>
          <DialogHeader className="bg-amber-400">
                  <h1 className="text-center text-2xl md:text-6 xl mx-auto text-light-green-900 capitalize">
                    {nombre}
                  </h1>
          </DialogHeader>
          <DialogBody divider={true} className="p-0  bg-black">
            <Carousel transition={{type: "tween", duration: 0.5 }} className="rounded-xl w-1/2 mx-auto">
                {imagenes.map((item,index)=>(
                    <img
                        key={"imgSlide"+index}
                        src={item}
                        alt={`slide ${index+1}`}
                        className="h-auto"
                    />
                ))}
            </Carousel>
          </DialogBody>
          <DialogFooter className="bg-light-green-100">
            {cantidad===0?
            <>
            <h1 className="text-red-900">sold out</h1>
            </>:
            <div className="flex flex-col items-center mx-auto">
              <h1 className="shadow-black shadow-sm mb-4 px-12 py-1 text-white rounded-lg bg-black bg-opacity-40">{`Total: ${precioItem}`}</h1>
              <div className="flex justify-center items-center gap-3">
                <button onClick={restarItem} disabled={cantidadItem<=0} className={`shadow-black shadow-md px-2 text-white rounded-full ${cantidadItem<=0?"bg-opacity-50":""} bg-red-900`}>-</button>
                <h1  className="shadow-black shadow-sm px-8 py-1 text-white rounded-lg bg-black bg-opacity-40">{`Cantidad: ${cantidadItem}`}</h1>
                <button onClick={sumarItem} disabled={cantidadItem>=cantidad} className={`shadow-black shadow-md px-2 text-white rounded-full ${cantidadItem>=cantidad?"bg-opacity-50":""} bg-teal-800`}>+</button>
              </div>
              {cantidadItem===0?
                  <button onClick={deleteItem} className="mt-5 bg-red-700 text-white px-10 py-2 rounded-xl font-bold text-lg shadow-black shadow-md">Delete</button>
                  : 
                  <button onClick={agregarItem} className="mt-5  bg-orange-700 text-green-900 px-10 py-2 rounded-xl font-bold text-lg shadow-black shadow-md">ADD</button>
              }
            </div>  
          }
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
        </>
    );
  }
  export default ModalMenu