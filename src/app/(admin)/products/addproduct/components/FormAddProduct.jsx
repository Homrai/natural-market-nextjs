'use client'

import { agregarProductos } from "@/consulta api/Products";
import { Button, Input } from "@material-tailwind/react";
import { getToken } from "../../../../../utils/getToken";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import ImageUploading from 'react-images-uploading';

const FormAddProduct = () => {
    const router = useRouter();
    const script = /[<">/']/;
    const [loading,setLoading]=useState(false);
    const [imgError,setImgError]=useState("");
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [images, setImages] = useState([]);
    const maxNumber = 5;
  
    const onChange = (imageList) => {
      setImages(imageList);
    };

    const mensajeError = (e) => {
      if (e.maxNumber) return setImgError("The limit of upload files for product is 5")
      if (e.acceptType) return setImgError("Only can upload images")
      if (e.maxFileSize) return setImgError("10mb is the maximum size for each image")
      if (e.resolution) return setImgError("The resolution of image should be lower")
  };
  
    
    
    const enviarEdicionProducto = async (data)=>{
      setImgError("");
      if (images.length===0) return setImgError("Pls add min 1 image")
      setLoading(true);
      try {
        const path = images.map((imagen) => {
          return imagen.data_url
        });
        data.path=path;
        data.cantidad=Number(data.cantidad);
        data.precio=Number(data.precio);
        const {token,message}= await getToken();
        if(token===false) return toast.error(message,{duration:3000});
        const {msj,ok} = await agregarProductos(token,data);
        setLoading(false);
        if(ok){
            reset();
            toast.success(msj,{duration:2000});
            setImages([]);
            return
        }
        return toast.error(msj,{duration:3000});
        } catch (error) {
            setLoading(false);
            return toast.error(error,{duration:3000});
        }
    }
  return (
    <div className="py-5 bg-black rounded-lg">
      <h1 className="text-3xl text-center font-bold text-orange-700 my-4">Add Product</h1>
      <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                accept="image/*"
                maxNumber={maxNumber}
                dataURLKey="data_url"
                maxFileSize={10000000}
                onError={mensajeError}
                >
                {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
                }) => (
                <div className="text-white flex flex-col items-center ">
                  <div className="flex flex-col items-center mb-4">
                      <div className="hover:opacity-80 shadow-white shadow-md text-xl font-semibold flex flex-col h-44 pb-2 cursor-pointer border-4 border-green-900 items-center w-96 text-green-700 bg-gray-50 text-center rounded-xl"
                      style={isDragging ? { color: 'red' } : undefined}
                      onClick={onImageUpload}
                      {...dragProps}
                      >
                        <i className="bi bi-upload h-40 w-40 text-9xl"></i>
                      Click or Drop here
                      </div>
                      <button className=" shadow-white shadow-md hover:opacity-80 bg-red-900 rounded-lg m-2 p-2" onClick={onImageRemoveAll}>Remove all images</button>
                  </div>
                  <div className="flex gap-4 items-baseline justify-center flex-wrap mb-4">
                      {imageList.map((image, index) => (
                      <div key={"img upload"+index} className="flex flex-col items-center">
                          <img src={image['data_url']} alt="" width="100" />
                          <div className="flex gap-3 mt-2">
                            <button className=" shadow-white shadow-md bg-green-600 px-2 rounded-md" onClick={() => onImageUpdate(index)}>Update</button>
                            <button className=" shadow-white shadow-md bg-red-600 px-2 rounded-md"  onClick={() => onImageRemove(index)}>Remove</button>
                          </div>
                      </div>
                        ))}
                  </div>
                  </div>
                  )}
            </ImageUploading>
            <div className="flex justify-center my-2">
                {imgError!=="" && <span className="text-red-900 text-lg">{imgError}</span>}
            </div>
        <form onSubmit={handleSubmit(enviarEdicionProducto)}>
            <Input label="Product Name" className="text-white" size="lg" {...register("nombre",
              {
                required: "Product name field required",
                minLength:{value:10, message:"Min 10 characters in this field"},
                maxLength:{value:35, message:"Max 35 characters in this field"},
                validate: {
                  isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
              })} />
              {errors.nombre && <span className="text-red-900 text-lg">{errors?.nombre?.message}</span>}

            <Input type="number" label="Item Price" className="text-white"  size="lg" {...register("precio",
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

            <Input type="number" label="Number of Items" className="text-white"  size="lg" {...register("cantidad",
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

            <Input label="Description" className="text-white" size="lg" {...register("descripcion",
              {
                required: "Description of item field required",
                minLength:{value:10, message:"Min 10 characters in this field"},
                maxLength:{value:250, message:"Max 250 characters in this field"},
                validate: {
                  isScript:value=>!script.test(value) || "Pls don't add scripts 🤡"
                }
              })} />
            {errors.descripcion && <span className="text-red-900">{errors?.descripcion?.message}</span>}

            <Button disabled={loading} fullWidth className="bg-green-300 mt-5 shadow-white shadow-md" type="submit">
              ADD
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

export default FormAddProduct
