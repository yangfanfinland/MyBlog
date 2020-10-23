import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import '../styles/pages/detailed.css'

import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

export default function Detailed(props) {
  const tocify = new Tocify()
  const renderer = new marked.Renderer()

  renderer.heading = function(text, level,raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
  }

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value
    }
  })

  const html = marked(props.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <div>
        <Header />
        <Row className="comm-main" type="flex" justify="center">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14} >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">Home</a></Breadcrumb.Item>
                  <Breadcrumb.Item><a href={"/list?id="+props.type_id}>{props.type.typeName}</a></Breadcrumb.Item>
                  <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <div className="detailed-title">
                  {props.title}
                </div>
                <div className="list-icon center">
                  <span><CalendarOutlined /> {props.addTime}</span>
                  <span><FolderOutlined /> {props.type.typeName}</span>
                  <span><FireOutlined /> {props.view_count} views</span>
                </div>
                <div className="detailed-content"
                  dangerouslySetInnerHTML={{__html: html}}
                >
                </div>
              </div>
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4} >
              <Author />
              <Advert />
              <div className="detailed-nav comm-box">
                <Affix offsetTop={5}>
                  <div>
                    <div className="nav-title">Blog directory</div>
                    {tocify&&tocify.render()}
                  </div>
                </Affix>
              </div>
          </Col>
        </Row>
        <Footer />
      </div>
    </div>
  )
}

Detailed.getInitialProps = async (context) => {
  const { id } = context.query
  const promise = new Promise((resolve) => {
    axios(`${servicePath.getArticleById}/${id}`).then(
      (res) => {
        if (res.data.errno === 0) {
          resolve(res.data.data)
        }
      }
    )
  })
  return await promise
}
