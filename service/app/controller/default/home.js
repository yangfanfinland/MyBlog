'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
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
                FROM article LEFT JOIN type ON article.type_id = type.id`
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }

  /**
   * Get article by Id
   */
  async getArticleById() {
    const { id } = this.ctx.params;
    const sql = `SELECT 
                article.id as id, 
                article.title as title, 
                article.addTime as addTime, 
                article.view_count as viewCount,
                article.introduce as introduce, 
                article.article_content as articleContent, 
                type.typeName as typeName 
                FROM article LEFT JOIN type ON article.type_id = type.id 
                WHERE article.id=${id}`;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result }
  }

  /**
   * Get article type list
   */
  async getTypeInfo() {
    const result = await this.app.mysql.select('type')
    this.ctx.body = { data: result }
  }

  /**
   * Get article list by type
   */
  async getArticleListByTypeId() {
    const { id } = this.ctx.params;
    const sql = `SELECT 
                article.id as id, 
                article.title as title, 
                article.addTime as addTime, 
                article.view_count as viewCount,
                article.introduce as introduce, 
                type.typeName as typeName 
                FROM article LEFT JOIN type ON article.type_id = type.id 
                WHere article.type_id=${id}`;
    const results = await this.app.mysql.query(sql)
    this.ctx.body = { data: results }
  }
}

module.exports = HomeController;
