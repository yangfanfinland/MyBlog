/**
 * @description DB configuration
 * @author Fan Yang
 */

const { isProd } = require("../utils/env");

let MYSQL_CONF = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "2rjaFvus",
  database: "blog",
};

if (isProd) {
  MYSQL_CONF = {
    host: "127.0.0.1",
    port: "3306",
    user: "root",
    password: "2rjaFvus",
    database: "blog",
  };
}

module.exports = {
  MYSQL_CONF,
};
