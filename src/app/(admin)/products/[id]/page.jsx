import { productoId } from "@/consulta api/Products";
import Form from "./components/Form";

export async function generateMetadata({ params }) {
    let meta = {
        title: "",
        description: ""
    }
    const {res,producto} = await productoId(params.id);
    if (res) {
        meta.title=producto.nombre;
        meta.description=producto.descripcion;
    }
    return {
      title: meta.title,
      description: meta.description
    }
  };

export default async function ProductId({params}) {
    const {res,producto} = await productoId(params.id);
    if(!res) return <h1  className="text-red-900 font-extrabold bg-black bg-opacity-30 text-center text-6xl py-10">The product does not exist</h1>
    
  return (
    <div  className="flex flex-col p-10 bg-black rounded-3xl">
        <h1 className="mx-auto font-extrabold text-3xl text-orange-700 text-center mt-3">Edit Product</h1>
        <Form producto={producto}/>
    </div>
  );
}