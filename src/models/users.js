const {Schema,model} = require('mongoose')
const bcrypt= require('bcrypt')
const userSchema = new Schema({
    name: {type: String,required: true},
    email: {type: String,required: true},
    password: {type: String,required: true}


},{
    timestamps: true
})

userSchema.methods.encrypPassword = async password =>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password,salt)
}

userSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password,this.password)

}

module.exports = model('user',userSchema)