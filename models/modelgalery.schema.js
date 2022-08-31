const {Schema, model} = require('mongoose')


const galerySchema = new Schema({
    titulo: String,
    texto: String,
    imagen:
    {
        data: Buffer,
        contentType: String
    },
    author: {
        type: Schema.ObjectId,
        ref: "user"
    }
}, {
    timestamp: true
},{
    statics:{
        findByAuthor(author){
            return this.find({author: author})
        }
    }
}

)


module.exports = model("galery", galerySchema)