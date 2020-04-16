const sequelize = require('../../bdd/bdd')
const configuration = require('../config/config').configuration
const express = require('express')
const bodyParser = require('body-parser')

const router = require('../routes')

const app = express()

app.use(bodyParser.json())

app.use('/api',router)



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


