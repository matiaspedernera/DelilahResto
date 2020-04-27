const router = require('express').Router()
const products = require('./productsRoute')
const users = require('./usersRoute')
const orders = require('./ordersRoute')

router.use('/platos',products)
router.use('/usuarios',users)
router.use('/pedidos',orders)

router.get('/',(req,res)=>{
    res
        .status(200)
        .json({Mensaje: "Estás conectado a nuestra API"})
})

module.exports = router