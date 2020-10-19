import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import { Row, Col, List, Breadcrumb } from "antd";
import {
  CalendarOutlined,
  StarOutlined,
  FireOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../styles/pages/list.css";
import servicePath from "../config/apiUrl";

import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";

export default function MyList(list) {
  const [mylist, setMylist] = useState(list.data);
  useEffect(() => {
    setMylist(list.data);
  });

  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">Home</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{list.data && list.data[0].type.typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              // header={<div>Latest blog</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={(item) => (
                <List.Item>
                  <div className="list-title">
                    <Link
                      href={{ pathname: "/detailed", query: { id: item.id } }}
                    >
                      {item.title}
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span>
                      <CalendarOutlined /> {item.addTime}
                    </span>
                    <span>
                      <StarOutlined /> {item.type.typeName}
                    </span>
                    <span>
                      <FireOutlined /> {item.view_count} views
                    </span>
                  </div>
                  <div
                    className="list-context"
                    dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                  ></div>
                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
            <Author />
            <Advert />
          </Col>
        </Row>
        <Footer />
      </div>
    </div>
  );
}

MyList.getInitialProps = async (context) => {
  const { id } = context.query;
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getArticleListByTypeId}/${id}`).then((res) => {
      resolve(res.data);
    });
  });
  return await promise;
};
