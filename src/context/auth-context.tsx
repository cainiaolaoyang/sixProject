import { ReactNode, useState } from "react";
import * as auth from 'auth-provider'
import { LoginForm } from "page/login";
import React from "react";
import { useMount } from "https/config";
// import { http } from "https/http";
// import { useMount } from "https/config";


//全局属性



const AuthContext = React.createContext<{
    user: auth.loginInfo | null,
    login: (form: LoginForm) => Promise<void>,
    logout: () => Promise<void>
} | undefined>(undefined);

AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<auth.loginInfo | null>(null);

    const login = (form: LoginForm) => auth.login(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(()=>{
        setUser(auth.getUserInfo())
    })

    return <AuthContext.Provider children={children} value={{ user, login, logout }} />
}



export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth 必须在 authProvider 中使用")
    }
    return context
}