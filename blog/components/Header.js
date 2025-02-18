import React, { useState, useEffect } from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, StarOutlined, SmileOutlined } from '@ant-design/icons'
import Router from 'next/router'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
    const [ navArray, setNavArray ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    }, [])

    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/')
        } else {
            Router.push('/list?id=' + e.key)
        }
    }

    return (
        <div className="header">
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                    <span className="header-logo">Yang Fan</span>
                    <span className="header-txt">扬帆远航 - Sail the ocean</span>
                </Col>
                <Col xs={0} sm={0} md={14} lg={8} xl={6}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key={0}>
                            <HomeOutlined />
                            Home
                        </Menu.Item>

                        {
                            navArray.map((item) => (<Menu.Item key={item.id}>
                                { item.id === 1? <StarOutlined /> : <SmileOutlined /> }
                                {item.typeName}
                            </Menu.Item>))
                        }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header
