
fotosCtrl ={}

const modelGallery = require('../models/modelgalery.schema')

fotosCtrl.getFotos = async(req, res)=>{
    const author = req.params.author
    const arrayFotos = await modelGallery.find({author:author}).exec()
  
    res.json(arrayFotos)
}

fotosCtrl.postFotos = async (req, res)=>{
   
    const {titulo, texto, imagen, author} = req.body
    const newFoto = await new modelGallery({
        titulo: titulo,
        texto: texto,
        imagen: imagen,
        author: author
    })
    res.send({"message": "Publicado"})
    
    await newFoto.save()

    
}

fotosCtrl.getAllFotos = async(req, res)=>{
    const arrayFotos = await modelGallery.find()
    res.send(arrayFotos)
}
module.exports = fotosCtrl