import { getCookie } from "cookies-next";
import { refreshPagina } from "../consulta api/Login";

export const getToken=async()=>{
    let message = "";
    const refresh=getCookie("refreshToken");
    const {token}= await refreshPagina(refresh);
    if (token===false) {
        message = "authentication problem, login again pls"
    }
    return {token,message}
}
