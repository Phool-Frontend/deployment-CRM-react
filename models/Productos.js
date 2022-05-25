const mongoose = require('mongoose');
const Shema = mongoose.Schema;

const productosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        trim:true
    },
    precio:{
        type:Number
    },
    imagen:{
        type:String
    }
});

module.exports = mongoose.model('Productos',productosSchema);