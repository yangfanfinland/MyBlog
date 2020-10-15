'use strict';

const Controller = require('egg').Controller;

class MainController extends Controller {
    /**
     * User login
     */
    async checkLogin() {
        const userName = this.ctx.request.body.userName
        const password = this.ctx.request.body.password
        const sql = `SELECT userName FROM admin_user WHERE userName='${userName}' AND password='${password}'`
        const res = await this.app.mysql.query(sql)

        if (res.length > 0) {
            const openId = new Date().getTime()
            this.ctx.session.openId= openId
            this.ctx.body = { 'data': 'Login succeed', 'openId': openId }
        } else {
            this.ctx.body = { 'data': 'Login failed' }
        }
    }

    /**
     * Get article type list
     */
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    /**
     * Add article
     */
    async addArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId

        this.ctx.body = {
            isSuccess: insertSuccess,
            insertId: insertId
        }
    }

    /**
     * Update article
     */
    async updateArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle)
        const updateSuccess = result.affectedRows === 1

        this.ctx.body = {
            isSuccess: updateSuccess
        }
    }

    /**
     * Get article list
     */
    async getArticleList() {
        const sql = `SELECT 
                article.id as id, 
                article.title as title, 
                article.addTime as addTime, 
                article.view_count as viewCount,
                article.introduce as introduce, 
                type.typeName as typeName 
                FROM article LEFT JOIN type ON article.type_id = type.id ORDER BY article.id DESC`
        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list: resList }
    }

    /**
     * Delete article
     */
    async delArticle() {
        const { id } = this.ctx.params
        const res = await this.app.mysql.delete('article', {'id': id})
        this.ctx.body = {data: res}
    }

    async getArticleById() {
        const { id } = this.ctx.params;
        const sql = `SELECT 
                    article.id as id, 
                    article.title as title, 
                    article.addTime as addTime, 
                    article.view_count as viewCount,
                    article.introduce as introduce, 
                    article.article_content as articleContent, 
                    type.typeName as typeName,
                    type.id as typeId 
                    FROM article LEFT JOIN type ON article.type_id = type.id 
                    WHERE article.id=${id}`;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result }
    }
}

module.exports = MainController