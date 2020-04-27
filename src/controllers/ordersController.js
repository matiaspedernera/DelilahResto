const Order = require('../models/ordersModel')
const sequelize = require('../../bdd/bdd')

class orderController{
    static showAll(){
        const orders = sequelize.query(
        `Select s.state 'Estado',
        o.time 'Hora',
        o.id 'Numero', 
        p.payment_method 'Metodo de pago', 
        o.total 'Total', 
        u.fullname 'Usuario', 
        u.address 'Direccion'
        From \`order\` o
        Join payment p On p.id = o.payment_id
        Join state s ON s.id = o.state_id
        Join user u On u.id = o.user_id`,
        {type : sequelize.QueryTypes.SELECT})
        return orders

    }

    static showAllDetails(){
        const details = sequelize.query(
            `select concat(d.quantity,'x ',p.product_name) 'Descripcion',o.id 'Numero de orden'
            from detail d
            join product p on d.product_id = p.id
            join \`order\` o on o.id = d.order_id`,
            {type: sequelize.QueryTypes.SELECT}
        )
        return details
    }

    static showDetailsOneOrder(id){
        const detail = sequelize.query(
            `select concat(d.quantity,'x ',p.product_name) 'Descripcion'
            from detail d
            join product p on d.product_id = p.id
            join \`order\` o on o.id = d.order_id
            where o.id = ?`,
            {replacements : [id],type : sequelize.QueryTypes.SELECT})
        return detail
    }

    static showOne(id){
        const order = sequelize.query(
        `Select s.state 'Estado',
        o.time 'Hora',
        o.id 'Numero', 
        p.payment_method 'Metodo de pago', 
        o.total 'Total', 
        u.fullname 'Usuario', 
        u.address 'Direccion'
        From \`order\` o
        Join detail d ON o.id = d.order_id
        Join payment p On p.id = o.payment_id
        Join state s ON s.id = o.state_id
        Join user u On u.id = o.user_id
        WHERE o.id = ?`,
        {replacements : [id],type : sequelize.QueryTypes.SELECT})
        return order
    }

    static async createOrder(user_id,{payment_id,products_id,quantity}){
        const order = await sequelize.query(
            `INSERT INTO \`order\`(id,time,total,state_id,payment_id,user_id) 
            VALUES(null,current_time(),0,1,?,?)`,
        {replacements : [payment_id,user_id]})
        const orderId = order[0]        
        for(let i = 0; i < products_id.length; i++){
            sequelize.query(`
            INSERT INTO detail(order_id,product_id,subtotal,quantity)
            VALUES(?,?,(select price 
                        from product
                        where product.id = ?),?)`,
            {replacements:[orderId,products_id[i],products_id[i],quantity[i]]})
        }        
    }

    static async showProducts({id}){
        const pArray = id.map(async id => {
            const product = await sequelize.query('Select * from product where id = ?',
            {replacements:[id],type: sequelize.QueryTypes.SELECT})
            return product
        })
        const products = await Promise.all(pArray)
        return products
    }

    static createDetail(){
        const id = [1,2]      
        const quantity = [2,2]  
        for(let i = 0; i < id.length; i++){
            sequelize.query(`
            INSERT INTO detail(order_id,product_id,subtotal,quantity)
            VALUES(7,?,(select price 
                        from product
                        where product.id = ?),?)`,
            {replacements:[id[i],id[i],quantity[i]]})
        }
    }
}

module.exports = orderController