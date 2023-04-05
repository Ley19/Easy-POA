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
    description:{type:String},
    
    etiquebi:{type:String},
    seguim:{type:String},
    estatusbi:{type:String},
    bajabien:{type:String},
    fechabaja:{type:String},
    registrocon:{type:String},
    registrodb:{type:String},
    grupobien:{type:String},
    trataconta:{type:String},
    NombreSolici:{type:String},
    areasolici:{type:String}
    

});


const Articulos= mongoose.model('Articulos', articuloSchema);
module.exports= Articulos;

/*const infoadicionalSchema = new Schema ({
    etiquebi:{type:String},
    seguim:{type:String},
    estatusbi:{type:String},
    bajabien:{type:String},
    fechabaja:{type:String},
    registrocon:{type:String},
    registrodb:{type:String},
    grupobien:{type:String},
    trataconta:{type:String},
    NombreSolici:{type:String},
    areasolici:{type:String},

});

module.exports = mongoose.model('InformacionAdicional', infoadicionalSchema);*/
