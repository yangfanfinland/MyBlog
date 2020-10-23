import React, { useState } from "react";
import "antd/dist/antd.css";
import { Card, Input, Button, Spin, message, Avatar } from "antd";
import { UserOutlined, KeyOutlined } from "@ant-design/icons";
import axios from "axios";
import "../static/css/Login.css";
import servicePath from "../config/apiUrl";
const { Meta } = Card;

function Login(props) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = () => {
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
      url: servicePath.login,
      data: dataProps,
      withCredentials: true,
    }).then((res) => {
      setIsLoading(false);
      if (res.data.errno === 0) {
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
          title="Blog Manager"
          bordered={true}
          style={{ width: 400 }}
        >
          <Meta
            avatar={
              <Avatar src="https://media-exp1.licdn.com/dms/image/C4D03AQEh3bBI4WTEhQ/profile-displayphoto-shrink_400_400/0?e=1607558400&v=beta&t=Q885925EJc6fv1BciFUTHfpRjvmcI8FmPC_aNT23KHc" />
            }
            title="Fan Yang"
            style={{marginBottom: "10px"}}
          />
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <Input.Password
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            style={{ marginBottom: "10px" }}
          />
          <Button type="primary" size="large" block onClick={login}>
            {" "}
            Login in{" "}
          </Button>
        </Card>
      </Spin>
    </div>
  );
}
export default Login;
