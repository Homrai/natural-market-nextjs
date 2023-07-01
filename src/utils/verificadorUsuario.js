import { cookies } from 'next/dist/client/components/headers';
import { cargarDatosRefresh, refreshPagina } from '../consulta api/Login';
export const verificador = async ()=>{
    let tipoUsuario = "";
    let nombreUsuario = "";
    if (cookies().has("refreshToken")) {
        const refresh=cookies().get("refreshToken");
        const {token, uid} = await refreshPagina(refresh.value);
        if(token===false) {
            tipoUsuario=false;
            return {tipoUsuario,nombreUsuario}
    }
        const {usuario,nombre}= await cargarDatosRefresh(token,uid);
        tipoUsuario=usuario;
        nombreUsuario=nombre;
    }
        return {tipoUsuario,nombreUsuario};
};