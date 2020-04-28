const router = require('express').Router()
const userController = require('../controllers/usersController')
const authUser = require('../middlewares/authMiddleware').autenticarUsuario
const authRole = require('../middlewares/authMiddleware').autenticarRol
const getUserId = require('../middlewares/authMiddleware').getIdfromUser




router
    
    .post('/login',async(req,res)=>{
      try{
        const token = await userController.login(req.body)
        if(!token){
            res.json({Error: 'No autorizado',message: 'Usuario o contraseña erróneos' })
         return
        }
        res
        .status(200)
        .json({message : 'Se ha logueado exitosamente',token})
      }catch(error){
        res
        .status(500)
        .json(({Error : 'Algo salió mal'}))
      }
    })

    .use(authUser)

    .get('/myinfo',async(req,res)=>{
      try{
        const myId = getUserId(req)
        const myInfo = await userController.getInfo(myId)
        res
        .status(200)
        .json(myInfo)
      }catch(error){
        res
        .status(500)
        .json(({Error : 'Algo salió mal'}))
      }
    })

    .get('/',authRole,async (req,res)=>{
      try{
        const users = await userController.showAll()
        res.json(users)
      }catch(error){
        res
        .status(500)
        .json(({Error : 'Algo salió mal'}))
      }
    })

    .get('/:id',authRole,async (req, res) =>{
        const id = req.params.id
        if(isNaN(id)){
          return res
          .status(400)
          .json({error: 'Id debe ser un numero'})
        }
        try{
          const user = await userController.showOne(id)
          if(!user.length){
            return res
              .status(404)
              .json({message: 'No existe el usuario buscado'})
          }
          res.json(user)
      }catch(error){
        res
        .status(500)
        .json(({Error : 'Algo salió mal'}))
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
          await userController.update(id,req.body)
          res.json({message: 'Se actualizó el usuario con id '+ id})
        } catch(error){
          res
          .status(500)
          .json(({Error : 'Algo salió mal'}))
        }
      })

    .post('/',async(req,res)=>{
        try{
            userController.create(req.body)
            res
            .status(201)
            .json({message: 'Se ha creado un nuevo usuario'})
        } catch(error){
          res
          .status(500)
          .json(({Error : 'Algo salió mal'}))
        }
    })



module.exports = router