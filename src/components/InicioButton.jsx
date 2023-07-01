import Link from "next/link"

const InicioButton = () => {

  return (
    <div className="flex gap-1 md:gap-3 items-end">
        <Link href={"/login"} className="bg-orange-800 hover:bg-opacity-50 text-white text-md md:text-lg p-1 md:p-2 rounded-xl shadow-lg shadow-black">
            Sign In
        </Link>
        <Link href={"/signup"} className="bg-light-blue-800 hover:bg-opacity-50 text-sm text-white px-2 h-1/2 rounded-xl shadow-lg shadow-black">
            Sign Up
        </Link>
    </div>
  )
}

export default InicioButton
