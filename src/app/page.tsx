import Image from "next/image";
import Rest from "../img/rest.png";
import Table from "../img/table.png";
import Link from "next/link";
import CarouselInicio from "../components/CarouselInicio";

export default function Home() {  
  return (
    <main className="bg-black pt-10 text-white">
      <section className="flex flex-col  md:grid md:grid-cols-2 mb-4">
          <article className="mx-auto my-auto">
            <div className="flex flex-col items-center md:ms-5">
              <h1 className="text-3xl md:text-6xl md:my-10 my-5 font-bold">Welcome to Natural Market</h1>
              <p className="text-lg md:text-2xl my-1 md:my-5 mx-8 md:mx-auto">The people, food and the prime locations make the perfect place good friends & family to come together and have great time.</p>
              <Link href={"/menu"} className="py-2 px-5 my-2 mx-auto text-2xl rounded-lg bg-amber-600">Menu</Link>
            </div>
          </article>
          <article className="mx-auto">
            <Image src={Rest} alt="rest image" className="rounded-t-full"/>
          </article>
      </section>

      <section  className="flex flex-wrap justify-around bg-red-50 text-black py-10">
          <article className="flex content-center">
            <p className="mx-4 bi bi-geo-alt text-white bg-black rounded-full text-5xl p-5 mx-"></p>
            <div className="my-auto">
              <h1 className="text-2xl">Locate Us</h1>
              <p className="text-lg">Riverside 25, San Diego, California</p>
            </div>
          </article>
          <article className="flex content-center">
            <p className="mx-4 bi bi-clock-history text-white bg-black rounded-full text-5xl p-5 mx-"></p>
            <div className="my-auto">
              <h1 className="text-2xl">Open Hours</h1>
              <p className="text-lg">Mon To Fri 9:00 AM - 9:00 PM</p>
            </div>
          </article>
          <article className="flex content-center">
            <p className="mx-4 bi bi-pencil-square text-white bg-black rounded-full text-5xl p-5 mx-"></p>
            <div className="my-auto">
              <h1 className="text-2xl">Reservation</h1>
              <p className="text-lg">restaurantate@gmail.com</p>
            </div>
          </article>
      </section>

      <section className="flex flex-col bg-red-50 text-black md:grid md:grid-cols-2 py-20">
          <article className="mx-auto">
            <Image src={Table} alt="rest image" className="rounded-2"/>
          </article>
          <article className="mx-auto my-auto">
            <div className="flex flex-col">
              <h1 className="text-3xl md:my-2 my-1 font-bold">The Delicious Story</h1>
              <p className="text-lg my-5 mx-auto">The people, food and the prime locations make the perfect place  for the friends & family to come together and have great time.</p>
            </div>
            <div className="flex flex-col sm:flex-row">
              <div>
                <h1 className="text-3xl md:my-2 my-1 font-bold">2018</h1>
                <p className="text-lg my-5 mx-auto">Plan for this restaurant to deliver healthy food.</p>
              </div>
              <div>
                <h1 className="text-3xl md:my-2 my-1 font-bold">2023</h1>
                <p className="text-lg my-5 mx-auto">Happily in the fifth year for fulfilling the motto.</p>
              </div>
            </div>            
          </article>
      </section>
      
      <section className="flex flex-col px-8 bg-blue-gray-900">
          <article className="">
            <div className="flex flex-col">
              <h4 className="text-2xl mt-20 font-bold underline decoration-orange-600">TESTIMONIAL</h4>
              <h1 className="text-3xl my-2 font-bold">Our Clients Say</h1>
              <p className="text-2xl mb-10">We love to hear from customers, so please leave a comment or say hello in an email.</p>
            </div>
          </article>
          <article className="mx-auto pb-20">
            <CarouselInicio/>
          </article>
      </section>
    </main>
  )
}
