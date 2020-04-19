const sequelize = require('../../bdd/bdd')
const configuration = require('../config/config').configuration
const express = require('express')
const bodyParser = require('body-parser')

const router = require('../routes')

const app = express()

app.use(bodyParser.json())

app.use('/api',router)


// iniciamos nuestro servidor
async function start(){
  try{
    await sequelize.authenticate()
    console.log('La conexión a la base de datos se estableció exitosamente')
    app.listen(configuration.PORT,()=>{
      console.log(`El servidor está escuchando en el puerto ${configuration.PORT}`)
    })
  }catch(err){
    console.error('No se pudo conectar a la base de datos: ',err)
  }
}
start()


/* sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.')
        app.listen(configuration.PORT, () => {
          console.log(`Server is running at port ${configuration.PORT}`)
        })
        
    })
    .catch(err => console.error('Unable to connect to the database:', err)) */


