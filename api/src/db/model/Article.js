/**
 * @description Article data model
 * @author Fan Yang
 */

const seq = require("../seq");
const { STRING, INTEGER, TEXT, DATE } = require("../types");

// articles
const Article = seq.define("article", {
  title: {
    type: STRING,
    allowNull: false
  },
  article_content: {
    type: TEXT,
    allowNull: false
  },
  introduce: {
    type: TEXT,
    allowNull: false
  },
  view_count: {
    type: INTEGER,
    allowNull: true
  },
  addTime: {
    type: DATE,
    allowNull: false
  }
});

module.exports = Article;