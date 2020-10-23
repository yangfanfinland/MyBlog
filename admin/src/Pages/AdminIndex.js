import React, { useState, useEffect } from "react";
import { Layout, Menu, Tabs, Button, message } from "antd";
import {
  PieChartOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons";
import "../static/css/AdminIndex.css";
import { Route } from "react-router-dom";
import AddArticle from "./AddArticle";
import ArticleList from "./ArticleList";
import axios from "axios";
import servicePath from "../config/apiUrl";

const { Content, Footer, Sider, Header } = Layout;
const { SubMenu } = Menu;
const { TabPane } = Tabs;

function AdminIndex(props) {
  const { pathname } = props.history.location;

  const [collapsed, setCollapsed] = useState(false);
  const [panes, setPanes] = useState([]);
  const [activeKey, setActiveKey] = useState("");
  const [selectedKeys, setSelectedKeys] = useState([]);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    updatePanes(pathname);
    updateSelectedKeys([pathname]);
  }, []);

  const logout = () => {
    axios({
      method: "post",
      url: servicePath.logout,
      withCredentials: true,
    }).then((res) => {
      if (res.data.errno === 0) {
        props.history.push("/Login");
      } else {
        message.error("Logout failed");
      }
    });
  }

  const updateSelectedKeys = (keys) => {
    setSelectedKeys(keys);
  };

  const updatePanes = (path) => {
    if (path === "/index/list") {
      add("Article list", "/index/list", "/index/list", ArticleList);
      return;
    }
    if (path === "/index/add") {
      add("Add article", "/index/add", "/index/add", AddArticle);
      return;
    }
  };

  const add = (title, key, path, content) => {
    if (panes.find((pane) => pane.key === key)) {
      setActiveKey(key);
      props.history.push(path);
      return;
    }

    panes.push({
      key: key,
      title: title,
      path: path,
      content: content,
    });
    setPanes(panes);
    setActiveKey(path);
    props.history.push(path);
  };

  const handleClickArticle = (e) => {
    if (e.key === "/index/add") {
      add("Add article", "/index/add", "/index/add", AddArticle);
      setSelectedKeys([e.key]);
    }
    if (e.key === "/index/list") {
      add("Article list", "/index/list", "/index/list", ArticleList);
      setSelectedKeys([e.key]);
    }
  };

  const onChange = (activeKey) => {
    setActiveKey(activeKey);
    if (activeKey === "/index/add") {
      props.history.push("/index/add");
      updateSelectedKeys([activeKey]);
    }
    if (activeKey === "/index/list") {
      props.history.push("/index/list");
      updateSelectedKeys([activeKey]);
    }
  };

  const onEdit = (targetKey, action) => {
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane) => pane.key !== targetKey);
    let newActiveKey, path;
    if (newPanes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
        path = newPanes[lastIndex].path;
      } else {
        newActiveKey = newPanes[0].key;
        path = newPanes[0].path;
      }
    }
    setPanes(newPanes);
    setActiveKey(newActiveKey);
    updateSelectedKeys([newActiveKey]);
    props.history.push(path);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          onClick={handleClickArticle}
          selectedKeys={selectedKeys}
        >
          <Menu.Item key="/index/add" icon={<PieChartOutlined />}>
            Add article
          </Menu.Item>
          <Menu.Item key="/index/list" icon={<FileOutlined />}>
            Article list
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          <Button style={{float:"right",marginTop: "16px",marginRight:"20px"}} onClick={logout}>Logout</Button>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Tabs
            hideAdd
            onChange={onChange}
            activeKey={activeKey}
            type="editable-card"
            onEdit={onEdit}
          >
            {panes.map((pane) => (
              <TabPane tab={pane.title} key={pane.key}>
                <div className="site-layout-background">
                  <Route
                    key={pane.key}
                    path={pane.path}
                    exact
                    component={pane.content}
                  ></Route>
                </div>
              </TabPane>
            ))}
          </Tabs>

          <div
            className="site-layout-background"
            style={{ paddingLeft: 24, paddingRight: 24, minHeight: 360 }}
          >
            <Route path="/index/" exact component={AddArticle}></Route>
            <Route path="/index/add/:id" exact component={AddArticle}></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>yangfanyuanhang.com</Footer>
      </Layout>
    </Layout>
  );
}

export default AdminIndex;
