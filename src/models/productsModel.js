class Product{
    constructor(product_name,price, id = null){
        this.id = id
        this.product_name = product_name
        this.price = price
    }
}

module.exports = Product