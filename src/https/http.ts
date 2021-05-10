import qs from 'qs'
import * as auth from 'auth-provider'
import { useAuth } from 'context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL


interface ParamConfig extends RequestInit {
    data?: object,
    token?: string
}

//endpoint-> /接口名
export const http = async (endpoint: string, { data, token, headers, ...customConfig }: ParamConfig ={}) => {
    const sixProjectToken:string = auth.getToken().token ;
    const config = {
        method: 'GET',
        headers: {
            'SCM_HOSPITAL_LIUYUAN_TOKEN': sixProjectToken?sixProjectToken:'',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }

    
    //判断 请求类型， 数据区别处理
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return fetch(`${apiUrl}/${endpoint}`, config)
        .then(async res => {
            if (res.status === 401) {
                await auth.logout()
                window.localStorage.reload()
                return Promise.reject({ msg: "请重新登陆" })
            }

            const data = await res.json()
            if (res.ok) {
                return data
            } else {
                return Promise.reject(data)
            }

        })


}





export const useHttp = ()=>{
    const {user} = useAuth()

    return (...[endpoint,config]:Parameters<typeof http>)=> http(endpoint,{...config,token:user?.token})
}