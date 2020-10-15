import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  PieChartOutlined,
  FileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import { Route } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  const handleClickArticle = (e) => {
    if (e.key === "addArticle") {
      props.history.push("/index/add");
    }
    if (e.key === "articleList") {
      props.history.push("/index/list");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          // selectedKeys={[props.location.pathname]}
        >
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Workbench
          </Menu.Item>
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            icon={<UserOutlined />}
            title="Article manager"
          >
            <Menu.Item key="addArticle">Add article</Menu.Item>
            <Menu.Item key="articleList">Article list</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Advertisement
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Blog Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Workbench</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <div>
              <Route path="/index/" exact component={AddArticle}></Route>
              <Route path="/index/add" exact component={AddArticle}></Route>
              <Route path="/index/add/:id" exact component={AddArticle}></Route>
              <Route path="/index/list" exact component={ArticleList}></Route>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>yangfanyuanhang.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
