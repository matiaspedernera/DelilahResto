const config = require('../config/config').configuration
const jwt = require('jsonwebtoken')

const autenticarUsuario = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const verificarToken = jwt.verify(token,config.JWT.PRIVATE_KEY)
        if(verificarToken){
            req.usuario = verificarToken
            return next()
        }
    }catch(err){
        res.json({error:'Error al validar usuario'})
    }
}

const autenticarRol = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const data = jwt.verify(token,config.JWT.PRIVATE_KEY)
        if(data.user_type_id === 2){
            next()
        }else{
            res
            .status(403)
            .send({ error: 'Unauthorized.', message: 'Access denied.' })
        }
    }catch(error){
        res
        .status(401)
        .send({ error: 'Unauthorized.', message: 'Token verification failed.' })        
    }
}

module.exports = {autenticarUsuario,autenticarRol}