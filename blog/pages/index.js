import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { Row, Col, List } from 'antd'
import { CalendarOutlined, StarOutlined, FireOutlined } from '@ant-design/icons'
import axios from 'axios'
import '../styles/pages/index.css'
import servicePath from '../config/apiUrl'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

export default function Home(list) {
  const [ mylist, setMylist] = useState(list.data)

  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    // tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} >
            <List
              // header={<div>Latest blog</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname: '/detailed',query:{id:item.id}}}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><CalendarOutlined /> {item.addTime}</span>
                    <span><StarOutlined /> {item.type.typeName}</span>
                    <span><FireOutlined /> {item.view_count} views</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                  >
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
              <Author />
              <Advert />
          </Col>
        </Row>
        <Footer />
      </div>
    </div>
  )
}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}