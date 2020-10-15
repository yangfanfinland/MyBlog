import React, { useState, useEffect, createContext } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Spin, message } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import axios from 'axios'
import "../static/css/Login.css";
import  servicePath  from '../config/apiUrl'

const openIdContext = createContext()

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {}, []);

  const checkLogin = () => {
    setIsLoading(true);

    if (!userName) {
      message.error("Username cannot be empty");
      return false;
    } else if (!password) {
      message.error("Password cannot be empty");
      return false;
    }
    let dataProps = {
      userName: userName,
      password: password,
    };
    axios({
      method: "post",
      url: servicePath.checkLogin,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      setIsLoading(false);
      if (res.data.data == "Login succeed") {
        localStorage.setItem("openId", res.data.openId);
        props.history.push("/index");
      } else {
        message.error("Wrong username or password");
      }
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="login-div">
      <Spin tip="Loading..." spinning={isLoading}>
        <Card
          title="Yang Fan Blog System"
          bordered={true}
          style={{ width: 400 }}
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
  );
}
export default Login;
