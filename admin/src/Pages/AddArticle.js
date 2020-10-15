import React, { useState, useEffect } from "react";
import marked from "marked";
import "../static/css/AddArticle.css";
import { Row, Col, Input, Select, Button, DatePicker, message } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import moment from 'moment'

const { Option } = Select;
const { TextArea } = Input;

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0); // Article ID, 0 is add, else is modify
  const [articleTitle, setArticleTitle] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("Content preview");
  const [introducemd, setIntroducemd] = useState();
  const [introducehtml, setIntroducehtml] = useState("Brif introduction preview");
  const [showDate, setShowDate] = useState();
  const [typeInfo, setTypeInfo] = useState([]);
  const [selectedType, setSelectType] = useState(1);

  useEffect(() => {
    getTypeInfo();

    const tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, []);

  marked.setOptions({
    renderer: marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value);
    const html = marked(e.target.value);
    setMarkdownContent(html);
  };

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value);
    const html = marked(e.target.value);
    setIntroducehtml(html);
  };

  const getTypeInfo = () => {
    axios({
      method: "GET",
      url: servicePath.getTypeInfo,
      withCredentials: true,
    }).then((res) => {
      if (res.data.data == "Login first") {
        localStorage.removeItem("openId");
        props.history.push("/Login");
      } else {
        setTypeInfo(res.data.data);
      }
    });
  };

  const selectTypeHandler = (value) => {
    setSelectType(value);
  };

  const saveArticle = () => {
    if (!selectedType) {
      message.error("Please select article type");
      return false;
    }
    if (!articleTitle) {
      message.error("Please fill in article title");
      return false;
    }
    if (!articleContent) {
      message.error("Please fill in article content");
      return false;
    }
    if (!introducemd) {
      message.error("Please fill in article introduction");
      return false;
    }
    if (!showDate) {
      message.error("Please select publish date");
      return false;
    }
    const dataProps = {};
    dataProps.type_id = selectedType;
    dataProps.title = articleTitle;
    dataProps.article_content = articleContent;
    dataProps.introduce = introducemd;
    dataProps.addTime = moment(showDate).local().format('YYYY-MM-DD');

    if (articleId === 0) {
      dataProps.view_count = 0;
      axios({
        method: "POST",
        url: servicePath.addArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        setArticleId(res.data.insertId);
        if (res.data.isSuccess) {
          message.success("Save article succeed");
        } else {
          message.error("Save article failed");
        }
      });
    } else {
      dataProps.id = articleId;
      axios({
        method: "POST",
        url: servicePath.updateArticle,
        data: dataProps,
        withCredentials: true,
      }).then((res) => {
        if (res.data.isSuccess) {
          message.success("Update article succeed");
        } else {
          message.error("Update article failed");
        }
      });
    }
  };

  const getArticleById = (id) => {
    axios(`${servicePath.getArticleById}/${id}`, {withCredentials: true}).then(
      res => {
        const articleInfo = res.data.data[0]
        setArticleTitle(articleInfo.title)
        setArticleContent(articleInfo.articleContent)
        const html = marked(articleInfo.articleContent)
        setMarkdownContent(html)
        setIntroducemd(articleInfo.introduce)
        const tmpIntroduce = marked(articleInfo.introduce)
        setIntroducehtml(tmpIntroduce)
        setShowDate(articleInfo.addTime)
        setSelectType(articleInfo.typeId)
      }
    )
  }

  return (
    <div>
      <Row gutter={5}>
        <Col span={18}>
          <Row gutter={10}>
            <Col span={20}>
              <Input
                className="article-title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
                placeholder="Blog title"
                size="large"
              />
            </Col>
            <Col span={4}>
              <Select
                defaultValue={selectedType}
                size="large"
                onChange={selectTypeHandler}
                value={selectedType}
              >
                {typeInfo.map((item, index) => {
                  return (
                    <Option key={index} value={item.id}>
                      {item.typeName}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="Article content"
                value= {articleContent}
                onChange={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              ></div>
            </Col>
          </Row>
        </Col>
        <Col span={6}>
          <Row>
            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  onChange={(date, dateString) => {
                    setShowDate(dateString);
                  }}
                  placeholder="Publish date"
                  size="large"
                  value={moment(showDate)}
                />
              </div>
              <Button type="primary" size="large" onClick={saveArticle}>
                Publish
              </Button>
            </Col>
            <Col span={24}>
              <TextArea
                rows={4}
                placeholder="Article brief introduction"
                value= {introducemd}
                onChange={changeIntroduce}
              ></TextArea>
            </Col>
            <Col span={24}>
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default AddArticle;
