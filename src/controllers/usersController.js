const User = require('../models/usersModel')
const sequelize = require('../../bdd/bdd')
const jwt = require('jsonwebtoken')
const config = require('../config/config').configuration

class userController{
    static showAll(){
        const users = 
        sequelize.query(
            `SELECT u.id 'ID',u.username 'Nombre de usuario',u.fullname 'Nombre Completo',
            u.mail 'e-mail',u.phone 'Telefono',u.address 'Direccion',u.user_type_id 'Tipo de usuario',ut.user_type 'Rol'
            FROM user u 
            JOIN user_type ut 
            ON u.user_type_id = ut.id`,
        {type : sequelize.QueryTypes.SELECT})
        return users
    }

    static showOne(id){
        const user = sequelize.query(
            `SELECT u.id 'ID',u.username 'Nombre de usuario',u.fullname 'Nombre Completo',
            u.mail 'e-mail',u.phone 'Telefono',u.address 'Direccion',u.user_type_id 'Tipo de usuario',ut.user_type 'Rol'
            FROM user u 
            JOIN user_type ut 
            ON u.user_type_id = ut.id
            WHERE u.id = ?`,
        {replacements : [id],type : sequelize.QueryTypes.SELECT})
        return user
    }    

    static update(id,{username,fullname,address,password,mail,phone,token,user_type_id}){
        const user = new User(username, fullname,address,password,mail,phone,token,user_type_id)
        sequelize.query(`UPDATE user
                        SET username = ?,
                            fullname = ?,
                            address = ?,
                            password = ?,
                            mail = ?,
                            phone = ?,
                            token = ?,
                            user_type_id = ?
                        WHERE id = ?`,
        {replacements : [`${user.username}`,`${user.fullname}`,`${user.address}`,
        `${user.password}`,`${user.mail}`,`${user.phone}`,`${user.token}`,user.user_type_id,id]})
    }    

    static create({username,fullname,address,password,mail,phone,token,user_type_id}){
        const user = new User(username, fullname,address,password,mail,phone,token,user_type_id)
        sequelize.query(`INSERT INTO user(id,username,fullname,address,password,mail,phone,token,user_type_id)
                        VALUES(null,?,?,?,?,?,?,?,?)`,
        {replacements : [`${user.username}`,`${user.fullname}`,`${user.address}`,
        `${user.password}`,`${user.mail}`,`${user.phone}`,`${user.token}`,user.user_type_id]})
    }

    static async login({username,password}){
        async function findUser(){
            const users = await sequelize.query(
                `SELECT id, username, fullname, mail,user_type_id
                FROM user
                WHERE username = ?
                AND password = ?`,
            {replacements : [username,password],type : sequelize.QueryTypes.SELECT})
            return users
        }
        async function giveToken(){
            const usersFound = await findUser()
            if(usersFound.length){
                const token = jwt.sign(usersFound[0],config.JWT.PRIVATE_KEY)
                return token
            }else{
                return null
            }
        }
        return giveToken()
    }

    static async getInfo(user_id){
        const myInfo = await sequelize.query(
            `SELECT u.id 'ID',u.username 'Nombre de usuario',u.fullname 'Nombre Completo',
            u.mail 'e-mail',u.phone 'Telefono',u.address 'Direccion',u.user_type_id 'Tipo de usuario',ut.user_type 'Rol'
            FROM user u 
            JOIN user_type ut 
            ON u.user_type_id = ut.id
            WHERE u.id = ?`,
            {replacements: [user_id],type : sequelize.QueryTypes.SELECT})
        return myInfo
    }
}

module.exports = userController