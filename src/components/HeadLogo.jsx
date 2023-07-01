import logo from "../img/logo.jpg";
import Image from "next/image";

const HeadLogo = ({nombreUsuario, titulo}) => {
  return (
    <main className={`marco-head ${titulo.className}`}>  
      <section className={titulo.className}>
        <h1 className="text-shadow-lg shadow-black text-orange-700 pt-6 xl:pt-20 text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-center">Natural Market</h1>
      </section>
      <section className=" grid xl:grid-cols-3 grid-cols-2 gap-4 justify-items-auto text-white">
          <div className="flex justify-center p-5">
              <Image src={logo}  alt="Logo" className="shadow-black shadow-lg rounded-full" />
          </div>
          <div className={`xl:flex hidden flex-col ${titulo.className}`}>
            <h4 className="text-shadow-lg shadow-blue-gray-500 mx-auto mt-5 text-center capitalize font-bold text-green-900 rounded-lg px-8 bg-white bg-opacity-80 text-3xl md:text-7xl">Welcome {nombreUsuario}</h4>
          </div>
          <div className="flex flex-col place-content-center px-3"> 
            <div className="text-shadow-lg shadow-blue-gray-500 xl:hidden capitalize font-bold text-center text-green-900 rounded-lg my-auto bg-white bg-opacity-80 text-3xl md:text-6xl">Welcome {nombreUsuario}</div>
            <div className="shadow-black shadow-lg flex flex-col place-content-center xl:text-3xl md:text-2xl text-xs mx-auto text-black bg-white md:border-4 rounded-lg md:h-48 sm:px-7 my-auto sm:h-20 px-3">
                <h1>Adress: 123 Av #500-23</h1>
                <div className="flex justify-between md:pt-8 pt-2 md:text-6xl text-2xl">
                    <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 text-green-400 bi bi-whatsapp"></a>  
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"  className="hover:opacity-50 text-blue-800 bi bi-facebook"></a>                
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"  className="hover:opacity-50 text-purple-600 bi bi-instagram"></a>                
                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"  className="hover:opacity-50 text-blue-300 bi bi-twitter"></a>                
                </div>
            </div>
          </div>
      </section>
    </main>
  )
}

export default HeadLogo
