const router = require('express').Router()
const orderController = require('../controllers/ordersController')
const getUser = require('../middlewares/authMiddleware').getIdfromUser
const authUser = require('../middlewares/authMiddleware').autenticarUsuario
const authRole = require('../middlewares/authMiddleware').autenticarRol

router
    .use(authUser)

    .post('/',async(req,res)=>{
        try{
            const userId = await getUser(req)
            await orderController.createOrder(userId,req.body)
            res
            .status(201)
            .json({message: 'El pedido ha sido creado'})
        }catch(error){
            res
            .status(500)
            .json(({Error : 'Algo salió mal'}))
          }
    })

    .get('/',authRole, async (req,res) =>{
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
  
    
    .get('/details',authRole,async(req,res)=>{
        try{
            const details = await orderController.showAllDetails()
            res
            .status(200)
            .json(details)

        }catch(error){
            res
            .status(500)
            .json(({Error : 'Algo salió mal'}))
          }
    })


    .get('/:id',authRole,async(req,res)=>{
        const id = req.params.id
        if(isNaN(id)){
            return res
            .status(400)
            .json({error: 'Id debe ser un numero'})
          }
        try{
          const order = await orderController.showOne(id)
          if(!order.length){
            return res
              .status(404)
              .json({message: 'No existe el pedido buscado'})
          }
          const detail = await orderController.showDetailsOneOrder(id)
          res.json({
              order:order[0],
              detail:detail
          })
        }catch(error){
            res
            .status(500)
            .json(({Error : 'Algo salió mal'}))
          }        
    })

    .put('/:id/estado',authRole,async(req,res)=>{
        try{
            const orderId = req.params.id
            await orderController.updateState(orderId,req.body)
            res.json({message: 'Se ha actualizado el estado del pedido con id '+ orderId})

        }catch(error){
            res
            .status(500)
            .json(({Error : 'Algo salió mal'}))
          }
    })
    
    .delete('/:id',authRole,async(req,res)=>{
        const id = req.params.id
        if(isNaN(id)){
            return res
            .status(400)
            .json({error: 'Id debe ser un numero'})
          }
        try{
          await orderController.delete(id)
          res.json({ message: 'Se eliminó la orden con id ' + id})
        }catch(error){
            res
            .status(500)
            .json(({Error : 'Algo salió mal'}))
          }      
    })
    
module.exports = router