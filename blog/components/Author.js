import React, { useState, useEffect } from "react";
import { Avatar, Divider } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../styles/components/author.css";

const Author = () => {
  const [socialAccountList, setSocialAccountList] = useState([]);
  const [avatar, setAvatar] = useState();

  useEffect(() => {
    const fetchData = async () => {
      await axios(`${servicePath.getUserInfo}/fan`).then((res) => {
        if (res.data.errno === 0) {
          setSocialAccountList(res.data.data.socialAccounts);
          setAvatar(res.data.data.avatar);
        } else {
          console.error("Fetch user info failed");
        }
      });
    };
    fetchData();
  }, []);

  const handleSocialAccountClick = (url) => {
    window.open(url, "_blank");
    return false;
  };

  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={100} src={avatar} />
      </div>
      <div className="author-introduction">
        Full Stack Developer
        <Divider>Social accounts</Divider>
        {socialAccountList.map((account) => (
          <Avatar
            key={account.name}
            style={{ cursor: "pointer" }}
            onClick={() => handleSocialAccountClick(account.url)}
            size={28}
            icon={
              account.icon === "GithubOutlined" ? (
                <GithubOutlined />
              ) : (
                <LinkedinOutlined />
              )
            }
            className="account"
          />
        ))}
        {/* <Avatar style={{cursor:'pointer'}} onClick={() => window.open('https://www.linkedin.com/in/yangfanfinland/', '_blank')} size={28} icon={<LinkedinOutlined />} className="account" />
                <Avatar style={{cursor:'pointer'}} onClick={() => window.open('https://github.com/yangfanfinland', '_blank')} size={28} icon={<GithubOutlined />} className="account" /> */}
      </div>
    </div>
  );
};

export default Author;
