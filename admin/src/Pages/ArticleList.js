import React from "react";
import { Table, Input, Button, Space, Modal, message } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import servicePath from "../config/apiUrl";
import "../static/css/ArticleList.css";

const { confirm } = Modal;

class ArticleList extends React.Component {
  state = {
    searchText: "",
    searchedColumn: "",
    data: [],
  };

  getList = () => {
    axios({
      method: "GET",
      url: servicePath.getArticleList,
      withCredentials: true,
    }).then((res) => {
      if (res.data.errno === 10005 && res.data.message === "Not login") {
        this.props.history.push("/Login");
      } else {
        const responseData = res.data.data;
        const data = responseData.map(d => { return {...d, typeName: d.type.typeName }})
        this.setState({ data: data });
      }
    });
  };

  componentDidMount() {
    this.getList();
  }

  delArticle = (id) => {
    confirm({
      title: "Confirm to delete?",
      content: "Article deleted forever",
      onOk() {
        axios(`${servicePath.delArticle}/${id}`, {
          withCredentials: true,
        }).then((res) => {
          message.success("Article delete succeed");
          this.getList();
        });
      },
      onCancel() {
        message.success("Article no changes");
      },
    });
  };

  redirectToUpdateArticle = (id) => {
    this.props.history.push("/index/add/" + id);
  };

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    const columns = [
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
        width: "30%",
        ...this.getColumnSearchProps("title"),
      },
      {
        title: "Type name",
        dataIndex: "typeName",
        key: "typeName",
        width: "20%",
        ...this.getColumnSearchProps("typeName"),
      },
      {
        title: "Created at",
        dataIndex: "createdAt",
        key: "createdAt",
        ...this.getColumnSearchProps("createdAt"),
      },
      {
        title: "view count",
        dataIndex: "view_count",
        key: "view_count",
        ...this.getColumnSearchProps("view_count"),
      },
      {
        title: "Action",
        key: "action",
        render: (item) => (
          <div>
            <Button
              type="primary"
              onClick={() => this.redirectToUpdateArticle(item.id)}
            >
              Modify
            </Button>
            <Button onClick={() => this.delArticle(item.id)}>Delete</Button>
          </div>
        ),
      },
    ];
    return <Table columns={columns} dataSource={this.state.data} />;
  }
}

export default ArticleList;
