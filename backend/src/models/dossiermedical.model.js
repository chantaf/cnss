const mongoose = require('mongoose')

const dossiermedicalSchema = new mongoose.Schema({
    cnie: {
        type: String,
        required: true,
        unique: true
    },
    typemaladie: {
        type: String,
        required: true
    },
    code:{
        type: String,
        required: true,
    },
    quantite:{
        type: String,
        required: true,
    },
    remboursementtotal:{
        type: Number,
        required: true,
    },
    file : [{
        type: String,
        required: true
    }],
    detailsmaladies:[ {type:mongoose.Schema.ObjectId, ref:'detailsmaladie'}] ,
})

module.exports = mongoose.model('dossiermedicals', dossiermedicalSchema)