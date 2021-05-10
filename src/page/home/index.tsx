import { Image, Layout, Menu } from "antd"
import { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useState } from "react";
import Logo from 'assets/logo.png'
import styled from "@emotion/styled";

import { PageHeader } from "./page-header";
import { PageMenu } from "./page-menu";
//登陆状态
export const HomePageIndex = () => {

    const [collapsed, setCollapsed] = useState(false)


    return <LayoutContent>
        <SiderBox trigger={null} collapsible collapsed={collapsed}>
            <LogoStyle>
                <Image src={Logo} width={'6rem'} height={'6rem'} />
                {/* {collapsed?'':<h3>医耗云管理平台</h3>} */}
            </LogoStyle>
            <PageMenu collapsed={collapsed}  />
        </SiderBox>
        <Layout className="site-layout">
            <PageHeader collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    minHeight: 280,
                }}
            >
                Content
          </Content>
        </Layout>
    </LayoutContent>

}





const LayoutContent = styled(Layout)`
    display:flex;
    flex-direction:row;
    justify-content: flex-start;
    align-items:flex-start;
    height: 100vh;
`
const SiderBox = styled(Sider)`
    height: 100vh;
    display:flex;
    flex-direction:column;
`
const LogoStyle = styled.div`
    display:flex;
    flex-wrap:nowrap;
    h3{
        line-height: 5rem;
        color: white;
        padding-bottom:0;
    }
`