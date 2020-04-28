const config = require('../config/config').configuration
const jwt = require('jsonwebtoken')

function getIdfromUser(req){
    const token = req.headers.authorization.split(' ')[1]
    const decodified = jwt.verify(token,config.JWT.PRIVATE_KEY)
    const userId = decodified.id
    return userId
}

const autenticarUsuario = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        const verificarToken = jwt.verify(token,config.JWT.PRIVATE_KEY)
        if(verificarToken){
            req.usuario = verificarToken
            return next()
        }
    }catch(err){
        res
        .status(401)
        .json({error:'Error al validar usuario, debe loguearse antes'})
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
            .send({ error: 'No posee autorización.', message: 'Acceso Denegado.' })
        }
    }catch(error){
        res
        .status(401)
        .send({ error: 'No posee autorización.', message: 'Verificación de Token fallida.' })        
    }
}

module.exports = {autenticarUsuario,autenticarRol,getIdfromUser}