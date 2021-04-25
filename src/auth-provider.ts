//token  登陆，登出

import { http } from "https/http"
import { LoginForm } from "page/login"
const apiUrl = process.env.REACT_APP_API_URL

const localStorageKey = 'SCM_HOSPITAL_LIUYUAN_TOKEN'



export interface loginInfo{
    token: string,
    obj:{
        code:string,
        name:string,
        userType:string
    }
}


export const getUserInfo = ()=> {
    var info = localStorage.getItem(localStorageKey);
    return info? JSON.parse(info): null
}

export const getToken = ():string => {
    var info = getUserInfo()
    return info
}




export const handleUserResponse = (info:loginInfo) => {
    localStorage.setItem(localStorageKey, JSON.stringify(info))
    return info
}

export const login = async (data: LoginForm) => {
    return await http('/Login/login',{method:'post',data:data})
    .then( (res) =>{
        return handleUserResponse(res.data)
    })
}


export const logout = async ()=>{
    const res = await fetch(`${apiUrl}/Login/logout`, {
        method: "POST",
        mode: 'cors',
        headers: { "Content-Type": "application/json" }
    })
    if (res.ok) {
        localStorage.removeItem(localStorageKey)
    }
}