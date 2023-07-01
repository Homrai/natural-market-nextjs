import logo from "../img/logo.jpg";
import Image from "next/image";

const Footer = ({titulo}) => {
  return (
    <main className={`flex flex-col justify-center bg-blue-gray-900 ${titulo.className}`}>
        <section  className="w-40  mx-auto">
            <div className="pt-3">
                <Image src={logo} alt="Logo" className="shadow-white shadow-lg rounded-full" />
            </div>

        </section>
        <section  className="md:grid md:grid-cols-3 pt-3 pb-8 flex flex-col gap-4 text-white">
            <div className="flex flex-col mx-auto pt-0">
              <h4 className="text-2xl mt-20 font-bold underline decoration-orange-600 md:mx-1 mx-auto">CONTACT</h4>
              <h1 className="text-lg my-2 font-bold text-orange-600  md:mx-1 mx-auto">+152 153 15457</h1>
              <p className="text-lg mb-10 text-orange-600  md:mx-1 mx-auto">pasoidngrjngr@mail.com</p>
            </div>
            <div className="mx-auto text-3xl">
                <h1>
                    write us for receive updates,
                </h1>
                <h1>
                    Get news & offers events.
                </h1>
            </div>
            <div className="flex flex-col mx-auto pt-0">
              <h4 className="text-2xl mt-20 font-bold underline decoration-orange-600 md:mx-1 mx-auto">WORKING HOURS</h4>
              <h1 className="text-lg my-2 font-bold text-orange-600  md:mx-1 mx-auto">Mon – Fri: <i className="text-white">7.00am – 6.00pm</i></h1>
              <h1 className="text-lg my-2 font-bold text-orange-600  md:mx-1 mx-auto">Sat: <i className="text-white">7.00am – 6.00pm</i></h1>
              <h1 className="text-lg my-2 font-bold text-orange-600  md:mx-1 mx-auto">Sun: <i className="text-white">8.00am – 6.00pm</i></h1>
            </div>
        </section>
    </main>
  )
}

export default Footer
