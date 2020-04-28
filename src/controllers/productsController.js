const Product = require('../models/productsModel')
const sequelize = require('../../bdd/bdd')

class productController {
    static showAll(){
        const product = sequelize.query(
            `SELECT id 'ID', product_name 'Nombre del producto', price 'Precio' 
            FROM product`,
        {type : sequelize.QueryTypes.SELECT})
        return product
    }

    static showOne(id){
        const product = sequelize.query(
            `SELECT id 'ID', product_name 'Nombre del producto', price 'Precio' 
            FROM product WHERE id = ?`,
        {replacements : [id],type : sequelize.QueryTypes.SELECT})
        return product
    }

    static update(id,{product_name,price}){
        const product = new Product(product_name,price)
        sequelize.query(`UPDATE product
                        SET product_name = ?,
                            price = ?
                        WHERE id = ?`,
        {replacements : [`${product.product_name}`,product.price,id]})
    }

    static create({product_name,price}){
        const product = new Product(product_name,price)
        sequelize.query(`INSERT INTO product(id,product_name,price) 
                        VALUES(null,?,?)`,
        {replacements : [`${product.product_name}`,product.price]})
    }

    static delete(id){
        sequelize.query('DELETE FROM product WHERE id = ?',
        {replacements : [id]})
    }
}


module.exports = productController