import Link from "next/link"
import InicioButton from "./InicioButton";
import CerrarSesion from "./CerrarSesion";

const Navbar = async ({tipoUsuario,titulo}) => {
    if (tipoUsuario==="Administrador") return (
        <nav className={`border border-double border-emerald-800 shadow-2xl xl:text-3xl text-2xl flex items-center justify-between flex-wrap bg-white text-black p-6 ${titulo.className}`}>
        <div className="flex items-center flex-shrink-0 text-emerald-800 mr-6">
            <Link href="/" className="font-semibold tracking-tight">Home</Link>
        </div>
        <div className="flex-grow flex items-center text-emerald-600 w-auto">
                    <Link href="/menu" className="inline-block lg:mt-0 hover:text-amber-600 mr-4">
                        Menu
                    </Link>
                    <Link href="/products" className="inline-block mt-0 hover:text-amber-600 mr-4">
                        Products
                    </Link>
                    <Link href="orders" className="inline-block mt-0 hover:text-amber-600">
                        Orders
                    </Link>
                <div className="flex-grow">
                </div>
                <div className="flex items-end">
                    <CerrarSesion/>
                </div>
            </div>
        </nav>
      )

      if (tipoUsuario==="user") return (
        <nav className={`border border-double border-emerald-800 shadow-2xl xl:text-3xl text-2xl flex items-center justify-between flex-wrap bg-white text-black p-6 ${titulo.className}`}>
        <div className="flex items-center flex-shrink-0 text-emerald-800 mr-6">
            <Link href="/" className="font-semibold tracking-tight">Home</Link>
        </div>
        <div className="flex-grow flex items-center text-emerald-600 w-auto">
                    <Link href="/menu" className="inline-block lg:mt-0 hover:text-amber-600 mr-4">
                        Menu
                    </Link>
                    <Link href="/profile" className="inline-block mt-0 hover:text-amber-600 mr-4">
                        Profile
                    </Link>
                    <Link href="myorders" className="inline-block mt-0 hover:text-amber-600">
                        My Orders
                    </Link>
                <div className="flex-grow">
                </div>
                <div>
                    <CerrarSesion/>
                </div>
            </div>
        </nav>
      )
    
  return (
    <nav className={`border border-double border-emerald-800 shadow-2xl xl:text-3xl text-2xl flex items-center justify-between flex-wrap bg-white text-black p-6 ${titulo.className}`}>
        <div className="flex items-center flex-shrink-0 text-emerald-800 mr-6">
            <Link href="/" className="font-semibold tracking-tight">Home</Link>
        </div>
        <div className="flex-grow flex items-center text-emerald-600 w-auto">
                <Link href="/menu" className="inline-block mt-0 hover:text-amber-600">
                    Menu
                </Link>
            <div className="flex-grow">
            </div>
            <div>
                <InicioButton/>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
