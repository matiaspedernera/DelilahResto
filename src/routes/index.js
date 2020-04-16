const router = require('express').Router()
const products = require('./productsRoute')
const users = require('./usersRoute')

router.use('/platos',products)
router.use('/usuarios',users)

router.get('/',(req,res)=>{
    res
        .status(200)
        .json({Mensaje: "Estás conectado a nuestra API"})
})

module.exports = router