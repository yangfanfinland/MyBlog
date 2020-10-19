const ipUrl = 'http://127.0.0.1:7001/api/default/'

const servicePath = {
    getArticleList: ipUrl + 'article/getArticleList',
    getArticleById: ipUrl + 'article/getArticleById',
    getTypeInfo: ipUrl + 'type/getTypeInfo',
    getArticleListByTypeId: ipUrl + 'article/getArticleListByTypeId'
}

export default servicePath