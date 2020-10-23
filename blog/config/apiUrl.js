const ipUrl = 'http://127.0.0.1:7001/api/default/'

const servicePath = {
    getArticleList: ipUrl + 'article/getArticleList',
    getArticleById: ipUrl + 'article/getArticleById',
    getArticleListByTypeId: ipUrl + 'article/getArticleListByTypeId',
    getTypeInfo: ipUrl + 'type/getTypeInfo',
    getUserInfo: ipUrl + 'user'
}

export default servicePath