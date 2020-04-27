const router = require('express').Router()
const userController = require('../controllers/usersController')
const authUser = require('../middlewares/authMiddleware').autenticarUsuario
const authRole = require('../middlewares/authMiddleware').autenticarRol




router
    
    .post('/login',async(req,res)=>{
        const token = await userController.login(req.body)
        if(!token){
            res.json({Error: 'No autorizado',message: 'Usuario o contraseña erróneos' })
         return
        }
        res.json({message : 'Se ha logueado exitosamente',token})
    })

    .use(authUser)

    .get('/',authRole,async (req,res)=>{
        const users = await userController.showAll()
        res.json(users)
    })

    .get('/:id',authRole,async (req, res) =>{
        const id = req.params.id
        try{
          const user = await userController.showOne(id)
          res.json(user)
        } catch (error) {
          res.status(404)
            .json({Error: 'Usuario no encontrado'})
        }
      })

      .put('/:id',authRole, async (req, res) =>{
        id = req.params.id
        try{
          await userController.update(id,req.body)
          res.json({message: 'Se actualizó el usuario con id '+ id})
        } catch(error){
          res.json({ERROR: 'Ha ocurrido un error'})
        }
      })

    .post('/',async(req,res)=>{
        try{
            userController.create(req.body)
            res.json('Todo ok capo')
        } catch(error){
            res.json({Error: 'Todo mal'})
        }
    })



module.exports = router