import styled from "@emotion/styled"
import { Button, Card, Form, Input } from "antd"
import { useAuth } from "context/auth-context"
import { useMount } from "https/config"
import { useHttp } from "https/http"
import { useState } from "react"
import logo from 'assets/logo.png'
import left from 'assets/left.svg'
import right from 'assets/right.svg'



export interface LoginForm {
    usercode: string,
    password: string,
    randCode: string,
    encryption: string,
    sign: number
}
export const LoginPage = () => {

    const { login, user } = useAuth()
    //获取验证码
    const [randCodes, setRandcode] = useState({
        randCodeimg: '',
        encryption: ''
    });

    const http = useHttp()
    //获取验证码
    useMount(() => {
        http('Login/pictureCheckCode').then(res => {
            setRandcode({ ...randCodes, ...{ randCodeimg: `data:image/jpg;base64,${res.data.randCode}` }, encryption: res.data.encryption })
        })
    })




    const handleSubmit = (param: LoginForm) => {
        var paramValue = {
            ...param,
            ...{
                usercode: '000632',
                password: 'MTExMTEx'
            }
        }

        //登陆
        login({ ...paramValue, encryption: randCodes.encryption, sign: 0 })
    }



    return <Container>
        <Header />
        <Background />
        <ShadowCard>
            <Title>请登录</Title>
            <Form onFinish={handleSubmit} >
                {user}
                <Form.Item name={"usercode"} rules={[{ required: true, message: '用户名不能为空' }]}>
                    <Input id={"usercode"} placeholder={"请输入用户名"} />
                </Form.Item>
                <Form.Item name={"password"} rules={[{ required: true, message: '密码不能为空' }]}>
                    <Input.Password id={"password"} placeholder={"请输入密码"} />
                </Form.Item>
                <Form.Item>
                    <Input.Group compact style={{ display: 'flex' }}>
                        <Form.Item name={"randCode"} rules={[{ required: true, message: '验证码不能为空' }]}>
                            <Input id={"randCode"} placeholder={"请输入验证码"} />
                        </Form.Item>
                        <img src={randCodes.randCodeimg} alt={"验证码"} style={{ height: "3rem", width: "9rem" }} />
                    </Input.Group>
                </Form.Item>
                <Form.Item>
                    <LoneBtn htmlType={"submit"} type={"primary"}>登录</LoneBtn>
                </Form.Item>
            </Form>
        </ShadowCard>
    </Container>


}

const Container = styled.div`
    display:flex;
    flex-direction:column; //项目排列方向-->从上往下
    justify-content:center;//项目在主轴上居中
    align-items:center;
    min-height: 100vh;
`


const ShadowCard = styled(Card)`
    width:40rem;
    min-height:46rem;
    padding:3.2rem 4rem;
    border-radius:0.3rem;
    box-shadow:rgba(0,0,0,0.1) 0 0 10px;
    text-align:center;
`

const Header = styled.header`
    background: url(${logo}) no-repeat center;
    padding: 5rem  0;
    background-size: 12rem;
    width: 100%;
`

const Background = styled.div`
    position:absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: left bottom, right bottom;
    background-size: 40rem,40rem,cover;
    background-image: url(${left}),url(${right});

    `
const Title = styled.h2`
    margin-bottom: 2.4rem;
    color: rgb(94, 108, 132)
`

const LoneBtn = styled(Button)`
    width:100%
`