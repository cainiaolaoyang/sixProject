//token  登陆，登出

import { http } from "https/http"
import { LoginForm } from "page/login"

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

export const getToken = ():loginInfo => {
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
    return await http(`/Login/getdelLogin`)
    .then(res=>{
        localStorage.removeItem(localStorageKey)
    })
}