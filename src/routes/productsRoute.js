const router = require('express').Router()
const productController = require('../controllers/productsController')
const authUser = require('../middlewares/authMiddleware').autenticarUsuario
const authRole = require('../middlewares/authMiddleware').autenticarRol

router

  .use(authUser)
   

  .get('/', async (req,res) =>{
    try{
      const products = await productController.showAll()
      if(!products.length){
        return res
                .status(204)
                .json({message: 'No existen productos para ser mostrados'})
      }
      res
      .status(200)
      .json(products)

    } catch(error){
      res
      .status(500)
      .json(({Error : 'Algo salió mal'}))
    }
  })


  .get('/:id',async (req, res) =>{
    const id = req.params.id
    if(isNaN(id)){
      return res
      .status(400)
      .json({error: 'Id debe ser un numero'})
    }
    try{
      const product = await productController.showOne(id)
      if(!product.length){
        return res
          .status(404)
          .json({message: 'No existe el producto buscado'})
      }
      res
        .status(200)
        .json(product)
    } catch (error) {
      res
      .status(500)
      .json({Error: 'Algo salió mal'})
    }
  })


  .post('/',authRole, async (req, res) =>{
    try{
      await productController.create(req.body)
      res
      .status(201)
      .json({message: 'Se ha creado el producto'})
    } catch (error){
      res
      .status(500)
      .json({Error: 'Algo salió mal'})
    }
  })


  .put('/:id',authRole, async (req, res) =>{
    const id = req.params.id
    if(isNaN(id)){
      return res
      .status(400)
      .json({error: 'Id debe ser un numero'})
    }
    try{
      await productController.update(id,req.body)
      res
      .status(200)
      .json({message: 'Se actualizó el plato con id '+ id})
    } catch(error){
      res.json({Error: 'Algo salió mal'})
    }
  })

  
  .delete('/:id',authRole, async (req, res) =>{
    const id = req.params.id
    if(isNaN(id)){
      return res
      .status(400)
      .json({error: 'Id debe ser un numero'})
    }
    try{
      await productController.delete(id)
      res
      .status(200)
      .json({ message: 'Se eliminó el plato con id ' + id})
    } catch (error){
      res
      .status(500)
      .json({Error: 'Algo salió mal'})
    }
  })

module.exports = router