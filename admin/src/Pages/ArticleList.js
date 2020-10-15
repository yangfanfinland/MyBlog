import React, { useState, useEffect } from "react";
import { List, Row, Modal, message, Button, Col } from "antd";
import axios from "axios";
import servicePath from "../config/apiUrl";
import '../static/css/ArticleList.css'

const { confirm } = Modal

function ArticleList(props) {
    const [list, setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = () => {
        axios({
            method: "GET",
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }

    const delArticle = (id) => {
        confirm({
            title: 'Confirm to delete?',
            content: 'Article deleted forever',
            onOk() {
                axios(`${servicePath.delArticle}/${id}`, {withCredentials:true}).then(
                    res => {
                        message.success('Article delete succeed')
                        getList()
                    }
                )
            },
            onCancel() {
                message.success('Article no changes')
            }
        })
    }

    const redirectToUpdateArticle = (id) => {
        props.history.push('/index/add/'+id)
    }

    return (
        <div>
            <List 
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>Title</b>
                        </Col>
                        <Col span={4}>
                            <b>Type</b>
                        </Col>
                        <Col span={4}>
                            <b>Add time</b>
                        </Col>
                        <Col span={4}>
                            <b>View count</b>
                        </Col>
                        <Col span={4}>
                            <b>Operate</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={() => redirectToUpdateArticle(item.id)}>Modify</Button>
                                <Button onClick={() => delArticle(item.id)}>Delete</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default ArticleList