const configuration = require('../config/config').configuration
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const router = express.Router()

const app = express()

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
})

app.get('/cervezas', function(req, res) {
  res.json({ mensaje: '¡A beber cerveza!' })  
})

app.post('/', function(req, res) {
  res.json({ mensaje: 'Método post' })   
})

app.delete('/', function(req, res) {
  res.json({ mensaje: 'Método delete' })  
})

const dbQueryString = `mysql://${configuration.DDBB.USER}:${configuration.DDBB.PASS}@${configuration.DDBB.HOST}:${configuration.DDBB.PORT}/${configuration.DDBB.NAME}`
const sequelize = new Sequelize(dbQueryString)

// iniciamos nuestro servidor

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.')
        
        app.listen(configuration.PORT, () => {
            console.log(`Server is running at port ${configuration.PORT}`)
        })
    })
    .catch(err => console.error('Unable to connect to the database:', err))


