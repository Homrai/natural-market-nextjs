import './globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.min.css'

import Navbar from '../components/Navbar'
import Logo from '../components/HeadLogo'
import Footer from '../components/Footer';
import ShoppingCart from "./../components/ShoppingCart";

import { Inter } from 'next/font/google';
import { Playball } from 'next/font/google';
import { verificador } from '@/utils/verificadorUsuario';


const inter = Inter({ subsets: ['latin'] });
const titulo = Playball({ 
  subsets: ['latin-ext'],
  style: 'normal',
  weight:'400',
 });

export const metadata = {
  title: 'Natural Market',
  description: 'Restaurant delicious and natural food',
}

export default async function RootLayout({children,}: {
  children: React.ReactNode
}) {
  const {tipoUsuario,nombreUsuario} = await verificador();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ShoppingCart tipoUsuario={tipoUsuario} titulo={titulo}/>
        <Logo nombreUsuario={nombreUsuario} titulo={titulo}/>
        <Navbar tipoUsuario={tipoUsuario} titulo={titulo}/>
        <main className='container mx-auto z-0'>
          {children}
        </main>
        <Footer titulo={titulo}/>
        </body>
    </html>
  )
}
