const User = require('../models/usersModel')
const sequelize = require('../../bdd/bdd')
const jwt = require('jsonwebtoken')
const config = require('../config/config').configuration

class userController{
    static showAll(){
        const users = 
        sequelize.query(
            `SELECT u.id,u.username,u.fullname,u.mail,u.phone,u.user_type_id,ut.user_type 
            FROM user u 
            JOIN user_type ut 
            ON u.user_type_id = ut.id`,
        {type : sequelize.QueryTypes.SELECT})
        return users
    }

    static create({username,fullname,address,password,mail,phone,token,user_type_id}){
        const product = new User(username, fullname,address,password,mail,phone,token,user_type_id)
        sequelize.query(`INSERT INTO user(id,username,fullname,address,password,mail,phone,token,user_type_id)
                        VALUES(null,?,?,?,?,?,?,?,?)`,
        {replacements : [`${product.username}`,`${product.fullname}`,`${product.address}`,
        `${product.password}`,`${product.mail}`,`${product.phone}`,`${product.token}`,product.user_type_id]})
    }

    static async login({username,password}){
        async function findUser(){
            const users = await sequelize.query(`SELECT id, username, fullname, mail
                                FROM user
                                WHERE username = ?
                                AND password = ?`,
            {replacements : [username,password],type : sequelize.QueryTypes.SELECT})
            return users
        }
        async function giveToken(){
            const usersFound = await findUser()
            if(usersFound.length){
                const token = jwt.sign({username,password},config.JWT.PRIVATE_KEY)
                console.log('Hay resultados')
                return token
            }else{
                console.log('No hay resultados')
                return null
            }
        }
        return giveToken()
            /* sequelize.query(`SELECT id, username, fullname, mail
                                        FROM user
                                        WHERE username = ?
                                        AND password = ?`,
            {replacements : [username,password],type : sequelize.QueryTypes.SELECT})
                .then(resultados=>{
                    if(resultados.length){
                        console.log('Hay resultados')
                        const token = jwt.sign({username,password},config.JWT.PRIVATE_KEY)
                        exports.token = token
                        return token
                    }
                    else{
                        console.log('No hay resultados')
                        return null
                    }
                })
         */
        
        /* const token = jwt.sign({username,password},config.JWT.PRIVATE_KEY)
        console.log(token)
        const decodificado = jwt.verify(token,config.JWT.PRIVATE_KEY)
        console.log(decodificado) */
    }
}

module.exports = userController