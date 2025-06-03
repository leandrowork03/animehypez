import type { ReactNode } from "react";
import { Children, useContext } from "react";

import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";


interface PrivateProps{
    children: ReactNode
}

export function Private({children}: PrivateProps): any{
const {signed, loadingAuth} =useContext(AuthContext)

if(loadingAuth){
    return <div><h1>carregando</h1></div>
}

if(!signed){
    return <Navigate to='/login' />
}

    return children
}