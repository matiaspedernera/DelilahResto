class Order{
    constructor(time,total,state_id,payment_id,user_id,id = null){
        this.id = id
        this.time = time
        this.total = total
        this.state_id = state_id
        this.payment_id = payment_id
        this.user_id = user_id
    }
}

module.exports = Order