import styled from "@emotion/styled";
import { Button, Dropdown, Menu } from "antd";
import { Row } from "components/lib";
import { useAuth } from "context/auth-context";
import React from "react";
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';


export interface OpenValue {
    collapsed: boolean,
    setCollapsed: (value: boolean) => void;
}

export const PageHeader = ({ collapsed, setCollapsed }: OpenValue) => {
    return <Header between={true}>
        <HeaderLeft >
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed)
            })}
            <Button type={"link"} >面板</Button>
        </HeaderLeft>
        <HeaderRight>
            <UserTools />
        </HeaderRight>
    </Header>
}


const UserTools = () => {
    const { logout, user } = useAuth();
    return <Dropdown
        overlay={<Menu>
            <Menu.Item key={"1"}>
                <Button type={"link"} >个人信息</Button>
            </Menu.Item>
            <Menu.Item key={"2"}>
                <Button type={"link"} >传导记录</Button>
            </Menu.Item>
            <Menu.Item key={"3"}>
                <Button type={"link"} onClick={logout}>退出登陆</Button>
            </Menu.Item>
        </Menu>}>
        <Button type={"link"} onClick={e => e.preventDefault()}>
            Hi,{user?.obj.name}
        </Button>
    </Dropdown>
}


const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Header = styled(Row)`
  padding: 1.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
  
`