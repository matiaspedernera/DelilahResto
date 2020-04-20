const router = require('express').Router()
const userController = require('../controllers/usersController')


router

    .get('/',async (req,res)=>{
        const users = await userController.showAll()
        res.json(users)
    })

    .post('/',async(req,res)=>{
        try{
            userController.create(req.body)
            res.json('Todo ok capo')
        } catch(error){
            res.json({Error: 'Todo mal'})
        }
    })

    .post('/login',async(req,res)=>{
        const token = await userController.login(req.body)
        if(token){
            res.json({message : 'Se ha logueado exitosamente',token})
        }else{
            res.json({Error: 'No autorizado',message: 'Usuario o contraseña erróneos' })
        }
    })

module.exports = router