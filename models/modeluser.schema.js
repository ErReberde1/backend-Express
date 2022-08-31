const bcrypt = require('bcryptjs')

const {Schema, model} = require("mongoose")

const userSchema = new Schema({
    nombre: String,
    apellidos: String,
    cumpleaños: String,
    username: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    galery: String, 
    estado_civil: String,
    trabajo: String,
    amigos: {
        type: Array,
        default: []
    }
}, {
    statics:{
        findByEmail(email){
            return this.find({ email: email})
        }
        

    }
}


)
userSchema.statics.encriptarPassword= async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
};

userSchema.statics.comparePassword= async(passwordRecibida, password)=>{
    return await bcrypt.compare(passwordRecibida, password)
}

module.exports = model("user", userSchema)