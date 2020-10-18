/**
 * @description Data model entrance
 * @author Fan Yang
 */

const User = require('./User')
const Type = require('./Type')
const Article = require('./Article')

Article.belongsTo(Type, {
  // create foreigh key: Article.type_id -> Type.id
  foreignKey: 'type_id'
})
Type.hasMany(Article, {
  // create foreigh key: Article.type_id -> Type.id
  foreignKey: 'type_id'
})

module.exports = {
  User,
  Type,
  Article
}
