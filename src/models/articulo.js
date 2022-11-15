const mongoose = require('mongoose');
const { Schema } = mongoose;

const articuloSchema = new Schema({
    nombre:{type:String},
    numInventario: { type:String},
    clvControl:{type:String},
    marca:{type:String},
    modelo:{type:String},
    tipoAlta:{type:String},
    costoAdquisicion:{type:Number},
    numFactura:{type:Number},
    description:{type:String}

});

module.exports = mongoose.model('Articulo', articuloSchema);