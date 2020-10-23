const ipUrl = "http://127.0.0.1:7001/api/admin/";

const servicePath = {
  login: ipUrl + "user/login",
  logout: ipUrl + "user/logout",
  getTypeList: ipUrl + "type/getTypeList",
  addArticle: ipUrl + "article/addArticle",
  updateArticle: ipUrl + "article/updateArticle",
  getArticleList: ipUrl + "article/getArticleList",
  delArticle: ipUrl + "article/delArticle",
  getArticleById: ipUrl + "article/getArticleById",
};

export default servicePath;
