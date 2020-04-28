const sequelize = require('../../bdd/bdd')

class orderController{

    static showAll(){
        const orders = sequelize.query(
        `SELECT s.state 'Estado',
        o.time 'Hora',
        o.id 'Numero', 
        p.payment_method 'Metodo de pago', 
        o.total 'Total', 
        u.fullname 'Usuario', 
        u.address 'Direccion'
        FROM \`order\` o
        JOIN payment p On p.id = o.payment_id
        JOIN state s ON s.id = o.state_id
        JOIN user u On u.id = o.user_id
        ORDER BY o.id`,
        {type : sequelize.QueryTypes.SELECT})
        return orders

    }

  
    static showAllDetails(){
        const details = sequelize.query(
            `SELECT concat(d.quantity,'x ',p.product_name) 'Descripcion',o.id 'Numero de orden'
            FROM detail d
            JOIN product p on d.product_id = p.id
            JOIN \`order\` o on o.id = d.order_id`,
            {type: sequelize.QueryTypes.SELECT}
        )
        return details
    }
  
    static showDetailsOneOrder(id){
        const detail = sequelize.query(
            `SELECT concat(d.quantity,'x ',p.product_name) 'Descripcion'
            FROM detail d
            JOIN product p on d.product_id = p.id
            JOIN \`order\` o on o.id = d.order_id
            WHERE o.id = ?`,
            {replacements : [id],type : sequelize.QueryTypes.SELECT})
        return detail
    }

  
    static showOne(id){
        const order = sequelize.query(
        `SELECT s.state 'Estado',
        o.time 'Hora',
        o.id 'Numero', 
        p.payment_method 'Metodo de pago', 
        o.total 'Total', 
        u.fullname 'Usuario', 
        u.address 'Direccion'
        FROM \`order\` o
        JOIN detail d ON o.id = d.order_id
        JOIN payment p On p.id = o.payment_id
        JOIN state s ON s.id = o.state_id
        JOIN user u On u.id = o.user_id
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
        const total = await sequelize.query(`
            UPDATE \`order\`
            SET total = (SELECT sum(subtotal*quantity) 
                        FROM detail d
                        JOIN \`order\` o on o.id = d.order_id
                        WHERE d.order_id = ?) 
            WHERE id = ?`,
            {replacements: [orderId,orderId]})
        return total
    }

    static updateState(order_id,{state}){
        sequelize.query(`
        UPDATE \`order\`
        SET state_id = ?
        WHERE id = ?`,
        {replacements: [state,order_id]})
    }

    static delete(id){
        sequelize.query('DELETE FROM detail WHERE order_id = ?',
        {replacements : [id]})
        sequelize.query('DELETE FROM `order` WHERE id = ?',
        {replacements : [id]})
    }    
}

module.exports = orderController