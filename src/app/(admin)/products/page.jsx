import { getData } from "@/consulta api/Products";
import DeleteButton from "./components/DeleteButton";
import Image from "next/image";
import Link from "next/link";
export default async function Products() {
    const { res,message,productos } = await getData();
    if(!res) return <h1 className="text-red-900 font-extrabold bg-black bg-opacity-30 text-center text-6xl py-10">{message} try again later</h1>
    
  return (
    <div className="py-20">
      <Link href={"/products/addproduct"} className=" mx-auto p-4 bg-green-900 rounded-xl text-white font-extrabold text-2xl border-2 border-white">Add Product</Link>
        <div className=" px-2 grid grid-cols-5 text-center rounded-lg border-4 border-green-900 my-6 bg-yellow-800 bg-opacity-30 text-white text-lg font-bold capitalize mx-auto items-center shadow-md shadow-black">
          <p>Img</p>
          <p>Name</p>
          <p>Items Number</p>
          <p>Price</p>
          <p>edit/del</p>
        </div>
      {productos?productos.map(item=>(
        <div className="shadow-md shadow-black border px-2 grid grid-cols-5 text-center border-green-900 bg-yellow-800 bg-opacity-30 text-white text-sm capitalize mx-auto items-center place-content-center">
          <Image priority={true} src={item.imagenes[0]} alt={item.nombre} width={100} height={100} className="mx-auto rounded-full text-left border border-black shadow-md shadow-black"/>
          <p>{item.nombre}</p>
          <p>{item.cantidad}</p>
          <p>${item.precio}</p>
          <div className="flex gap-3 mx-auto">
            <Link href={`/products/${item._id}`} className="cursor-pointer bi bi-pencil bg-yellow-500 rounded-full p-2 border border-black shadow-md shadow-black"></Link>
            <DeleteButton producto={item}/>
          </div>
        </div>
      )):""}
    </div>
  );
}