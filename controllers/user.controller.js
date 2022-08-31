userCtrl ={}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



const userModel  = require('../models/modeluser.schema')



userCtrl.postUser = async (req, res)=>{
    
    const {nombre, apellidos, cumpleaños, username, email, contraseña } = req.body;
    
    
    
    const newUser = await new userModel({
        nombre: nombre,
        apellidos: apellidos,
        cumpleaños: cumpleaños,
        username: username,
        email: email,
        password: await userModel.encriptarPassword(contraseña)
    })
    
    const savedUser = await newUser.save() 
    const token= jwt.sign({id: savedUser._id}, "socialReact" , {
        expiresIn: 86400
    } )
    


    res.status(200).json({token})
}

userCtrl.updateUser = async (req, res)=>{
    const id = req.params.id
    const {nombre, apellidos, cumpleaños, username, email, contraseña, estado_civil, trabajo, amigos } = req.body;
    
    await userModel.findByIdAndUpdate(id , {
        nombre,
        apellidos,
        cumpleaños,
        username,
        email,
        password: contraseña,
        estado_civil,
        trabajo,
        $addToSet:{
            amigos: amigos
        }
    })
    res.json({"message": "User actualizado"})
}

userCtrl.getUser1 = async(req, res)=>{
    const id = req.params.id
    const user = await userModel.findById(id)
    res.json(user)
}
module.exports = userCtrl