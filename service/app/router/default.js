module.exports = app => {
    const { router, controller } = app
    router.get('/default/getArticleList', controller.default.home.getArticleList)
    router.get('/default/getArticleById/:id', controller.default.home.getArticleById)
    router.get('/default/getTypeInfo', controller.default.home.getTypeInfo)
    router.get('/default/getArticleListByTypeId/:id', controller.default.home.getArticleListByTypeId)
}