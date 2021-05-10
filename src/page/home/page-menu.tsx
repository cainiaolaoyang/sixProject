import { Menu } from "antd"
import { useHttp } from "https/http";
import React, { useState } from "react";
import { useMount } from "https/config";
import SubMenu from "antd/lib/menu/SubMenu";
import { OpenValue } from "./page-header";

interface MenuObj {
    menuCode: string,
    menuName: string
    sysMenuVoList?: MenuObj[]
}



export const PageMenu = ({ collapsed }: Omit<OpenValue, 'setCollapsed'>) => {
    const [menuData, setMenuData] = useState<MenuObj[]>([])
    const http = useHttp();
    useMount(() => {
        http('Login/getTree', { method: 'post' }).then(res => {
            setMenuData(res.data)
        })
    })

    const handleClick = () => {

    }

    return <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        inlineCollapsed={collapsed}>
        {menuData.map(item =>
            <SubMenu key={item.menuCode} title={item.menuName}>
                {item.sysMenuVoList?.map(v =>
                    <SubMenu key={v.menuCode} title={v.menuName}>
                        {v.sysMenuVoList?.map(n => <Menu.Item key={n.menuCode}>
                            {n.menuName}
                        </Menu.Item>)}
                    </SubMenu>)}

            </SubMenu>)}
    </Menu>
}