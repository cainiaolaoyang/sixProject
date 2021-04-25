//在这里定义请求拦截等方法

import { useEffect, useState } from "react";

export const isfalsy:(value:unknown) => boolean = (value) => value === 0 ? false : !value;

//清理对象中的空值
export const cleanObject = (object: { [key: string]: unknown }) => {
    const obj = { ...object };

    Object.keys(obj).forEach(k => {
        const val = obj[k]
        if (isfalsy(val)) {
            delete obj[k]
        }

    })
    return obj
}



//封装只在挂载组件时只加载一次的函数
export const useMount = (callBack:()=>void) =>{

    useEffect(()=>{
        callBack()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
}


//防止快速输入造成的多次提交 在1s内多次请求只会执行一次
export const useDebounce = <T>(value: T) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        //每次在value变化完的时候，修改value   ,
        const timeout = setTimeout(() => setDebounceValue(value), 200);
        //每次在上一个useEffect处理完之后运行，清除上一个timeout
        return () => clearTimeout(timeout);

    }, [value])

    return debounceValue
}