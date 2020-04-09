const configuration = require('./config/config').configuration
const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const app = express()

/* let port = process.env.PORT || 3000  */ // establecemos nuestro puerto

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

// iniciamos nuestro servidor
app.listen(configuration.PORT, () => {
    console.log(`Server is running at port ${configuration.PORT}`)
})

