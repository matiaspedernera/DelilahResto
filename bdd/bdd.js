const configuration = require('../src/config/config').configuration
const Sequelize = require('sequelize')
const dbQueryString = `mysql://${configuration.DDBB.USER}:${configuration.DDBB.PASS}@${configuration.DDBB.HOST}:${configuration.DDBB.PORT}/${configuration.DDBB.NAME}`
const sequelize = new Sequelize(dbQueryString)


module.exports = sequelize