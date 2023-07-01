'use client'
import React from 'react'
import { logout } from '../consulta api/Login'
import { deleteCookie } from 'cookies-next'

const CerrarSesion = () => {
    const cerrarSesionBoton = async () => {
        deleteCookie("refreshToken");
        const res = await logout();
    }
    return (
        <a href='/' className="bg-red-400 hover:bg-opacity-50 text-white cursor-pointer p-2 rounded-xl shadow-lg shadow-black" onClick={cerrarSesionBoton}>
            Sign Out
        </a>
    )
}

export default CerrarSesion
