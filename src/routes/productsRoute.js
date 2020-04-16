const router = require('express').Router()
const productController = require('../controllers/productsController')

router
   
  .get('/',(req,res) =>{
    try{
      const products = productController.showAll()
      products.then(resultados =>{
        res.json(resultados)
      })
    } catch(error){
      res.status(500)
        .json(({Error : 'Algo salió mal'}))
    }
  })

  .get('/:id', (req, res) =>{
    const id = req.params.id
    try{
      const product = productController.showOne(id)
      product.then(resultados =>{
        res.json(resultados)
      })
    } catch (error) {
      res.status(404)
        .json({Error: 'Plato no encontrado'})
    }
  })

  .post('/', (req, res) =>{
    try{
      productController.create(req.body)
      res.json('Ok')
    } catch (error){
      res.status(500)
        .json({Error: 'Algo salió mal'})
    }
  })

  .put('/:id', (req, res) =>{
    id = req.params.id
    try{
      productController.update(id,req.body)
      res.json({message: 'Se actualizó el plato con id '+ id})
    } catch(error){
      res.json({ERROR: 'Ha ocurrido un error'})
    }

      
  })

  .delete('/:id', (req, res) =>{
    const id = req.params.id
    try{
      productController.delete(id)
      res.json({ message: 'Se eliminó el plato con id ' + id})
    } catch (error){
      res.json({Error: 'No se pudo eliminar el plato'})
    }
  })

module.exports = router