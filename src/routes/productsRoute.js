const router = require('express').Router()
const productController = require('../controllers/productsController')
const authUser = require('../middlewares/authMiddleware').autenticarUsuario
const authRole = require('../middlewares/authMiddleware').autenticarRol

router

  .use(authUser)
   
  .get('/', async (req,res) =>{
    try{
      const products = await productController.showAll()
      res.json(products)
    } catch(error){
      res.status(500)
        .json(({Error : 'Algo salió mal'}))
    }
  })

  .get('/:id',async (req, res) =>{
    const id = req.params.id
    try{
      const product = await productController.showOne(id)
      res.json(product)
    } catch (error) {
      res.status(404)
        .json({Error: 'Plato no encontrado'})
    }
  })

  .post('/',authRole, async (req, res) =>{
    try{
      await productController.create(req.body)
      res.json('Ok')
    } catch (error){
      res.status(500)
        .json({Error: 'Algo salió mal'})
    }
  })

  .put('/:id',authRole, async (req, res) =>{
    id = req.params.id
    try{
      await productController.update(id,req.body)
      res.json({message: 'Se actualizó el plato con id '+ id})
    } catch(error){
      res.json({ERROR: 'Ha ocurrido un error'})
    }
  })

  .delete('/:id',authRole, async (req, res) =>{
    const id = req.params.id
    try{
      await productController.delete(id)
      res.json({ message: 'Se eliminó el plato con id ' + id})
    } catch (error){
      res.json({Error: 'No se pudo eliminar el plato'})
    }
  })

module.exports = router