import "./Sider.css"

import {  NavLink, Outlet  } from "react-router-dom";

import { Layout,Button, Menu,Input, Typography, Avatar  } from 'antd';


import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';

// import { TiUserOutline } from "react-icons/ti";

const {Sider, Header, Content}= Layout;
const {Title, } = Typography;
const { Search } = Input;



const onSearch = () => {

}
const SiderComponent = (collapsed) => {
  return (
    <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                        <Title level={3} className="text-center text-white pt-3"><span className="text-white"> Logo</span></Title>
                        <Menu
                            theme="dark"
                            mode="inline"
                            items={[
                                {
                                    key: '1',
                                    icon: <MenuFoldOutlined/>,
                                    label: <NavLink end className={"sidebar__link"} to="/dashboard">Products</NavLink>
                                },
                             
                                {
                                    key: '3',
                                    icon: <UserOutlined/>,
                                    label: <NavLink className={"sidebar__link"} to="/dashboard/users">Users</NavLink>
                                }
                            ]}
                            />
                </Sider>
                <Layout>
        <Header style={{display: "flex", justifyContent:"space-between", alignItems: "center", gap: "20px", paddingLeft: "0"}}>
        <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: "#fff"
            }}
          />
        <Search style={{width: "700px"}}
            placeholder="Search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Avatar size={64} icon={<UserOutlined />} />
          
        </Header>
        <Content style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: "lightgrey"
          }}>
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
    
     
  )
}

export default SiderComponent