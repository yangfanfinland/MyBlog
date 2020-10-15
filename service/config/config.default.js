/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1602402784988_8472';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '2rjaFvus',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };

  config.cors = {
    credentials: true, //允许Cook可以跨域
    origin: (e) => {
      const origin = e.request.header.origin
      const whiteList = ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
      if (whiteList.indexOf(origin) > -1) {
        return origin;
      }
    },
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  }
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['http://127.0.0.1:3000', 'http://127.0.0.1:3001']
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
