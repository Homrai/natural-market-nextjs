const url = "https://natural-market-homrai.vercel.app/product";
export const getData=async()=>{
    try {
          const datos = await fetch(url,{
            next:{revalidate:120},
          });
          if (datos.ok) {
            const {productos} = await datos.json();
            return {res:true, productos}
          };
          return {res:false, message:"Server Error: the products could not be loaded"}
        } catch (error) {
          console.log(error);
          return {res:false, message:"Error 500: Server error"} 
      }  
  };

export const productoId=async(id)=>{
  let producto =""
    let { res,productos } = await getData();
    if(res){
        producto=productos.filter(item=>item._id===id)[0];
        if(producto===undefined){
          res=false;
        }
      }
    return {res,producto}
}

export const editarProductos= async (token,registroDatos)=>{
  try {
      const datos = await fetch(url+"edit", {
          method: `PUT`,
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': "true",
          },
          credentials: "include",
          mode: 'cors', // no-cors, *cors, same-origin
          body: JSON.stringify(registroDatos),
      });
      const res = await datos.json();
      return res
      
  } catch (error) {
      return toast.error("Problema al crear el objeto",{
          duration: 4000,
      })
  }
};


export const borrarProductos= async (token, id)=>{
  try {
      const datos = await fetch(url+`/borrar/${id}`, {
          method: `DELETE`,
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': "true",
          },
          credentials: "include",
          mode: 'cors', // no-cors, *cors, same-origin
      });
      const res = await datos.json();
      return res
      
  } catch (error) {
      return toast.error("Problema al eliminar el objeto",{
          duration: 4000,
      })
  }
};

export const agregarProductos= async (token, registroDatos)=>{
  try {
      const datos = await fetch(url+"/add", {
          method: `POST`,
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': "true",
          },
          credentials: "include",
          mode: 'cors', // no-cors, *cors, same-origin
          body: JSON.stringify(registroDatos),
      });
      const res = await datos.json();
      return res
      
  } catch (error) {
      return toast.error("Problema al crear el objeto",{
          duration: 4000,
      })
  }
};
