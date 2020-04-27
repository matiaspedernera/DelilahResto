const router = require('express').Router()
const orderController = require('../controllers/ordersController')
const getUser = require('../middlewares/authMiddleware').getIdfromUser

router

    .get('/', async (req,res) =>{
        try{
        const orders = await orderController.showAll()
        const details = await orderController.showAllDetails()
        res.json({orders: orders,
                details:details})
        } catch(error){
        res.status(500)
            .json(({Error : 'Algo salió mal'}))
        }
    })

    .post('/',async(req,res)=>{
        const userId = await getUser(req)
        const order = await orderController.createOrder(userId,req.body)
        res.json(order)
    })

//PRUEBA, DEVUELVE PRODUCTOS PASADOS POR BODY EN UN ARRAY    
/*     .post('/',async(req,res)=>{
        const products = await orderController.showProducts(req.body)
        res.json(products)
    }) */
    
    .get('/details',async(req,res)=>{
        const details = await orderController.showAllDetails()
        res.json(details)
    })


    .get('/:id',async(req,res)=>{
        const id = req.params.id
        try{
          const order = await orderController.showOne(id)
          const detail = await orderController.showDetailsOneOrder(id)
          res.json({
              order:order[0],
              detail:detail
          })
        } catch (error) {
          res.status(404)
            .json({Error: 'Pedido no encontrado'})
        }        
    })

    
    
module.exports = router