import { Button, Form, Input } from "antd"
import { useAuth } from "context/auth-context"
import { useMount } from "https/config"
import { useHttp } from "https/http"
import { useState } from "react"



const apiUrl = process.env.REACT_APP_API_URL

export interface LoginForm {
    usercode: string,
    password: string,
    randCode: string,
    encryption: string,
    sign:number
}
export const LoginPage = () => {

    const {login,user}  = useAuth()
    //获取验证码
    const [randCodes,setRandcode] = useState({
        randCodeimg:'',
        encryption:''
    });

    const http = useHttp()
    //获取验证码
    useMount(()=>{
        http('/Login/pictureCheckCode').then(res=>{
            setRandcode( {...randCodes,...{randCodeimg:`data:image/jpg;base64,${res.data.randCode}`},encryption:res.data.encryption})
        })
     })
     



    const handleSubmit = (param: LoginForm) => {
        //登陆
        login({...param,encryption:randCodes.encryption,sign:0})
    }


    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 6 },
    }
    return <Form onFinish={handleSubmit} {...layout} >
        {user}
        <Form.Item name={"usercode"} label={"用户名"} rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input id={"usercode"} placeholder={"请输入用户名"} />
        </Form.Item>
        <Form.Item name={"password"} label={"密码"} rules={[{ required: true, message: '密码不能为空' }]}>
            <Input.Password id={"password"} placeholder={"请输入密码"} />
        </Form.Item>

        <Form.Item label="验证码">
            <Input.Group compact>
                <Form.Item name={"randCode"} rules={[{ required: true, message: '验证码不能为空' }]}>
                    <Input id={"randCode"} placeholder={"请输入验证码"} />
                </Form.Item>
                <img src={randCodes.randCodeimg} alt={"验证码"} style={{ width: "80px", height: "40px" }} />
            </Input.Group>
        </Form.Item>
        <Form.Item>
            <Button htmlType={"submit"} type={"primary"}>登录</Button>
        </Form.Item>
    </Form>


}