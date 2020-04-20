class User{
    constructor(username,fullname,address,password,mail,phone,token,user_type_id,id = null){
        this.id = id
        this.username = username
        this.fullname = fullname
        this.address = address
        this.password = password
        this.mail = mail
        this.phone = phone
        this.token = token
        this.user_type_id = user_type_id
    }
}

module.exports = User