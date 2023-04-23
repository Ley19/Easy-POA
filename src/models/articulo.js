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
    etiquebi:{type:String},//etiqueta del bien
    seguim:{type:String},//Seguimiento de la etiqueta del bien
    estatusbi:{type:String},//Estatus del bien
    bajabien:{type:String},//
    fechabaja:{type:String},//fecha de la baja del articulo
    registrocon:{type:String},//aplica para el registro contable
    registrodb:{type:String},//ESTA REGISTRADO EN LA BASE CONTABLE
    grupobien:{type:String},//GRUPO DE BIENES (ACORDE A LA CÉDULA DE DEPRECIACIÓN)
    trataconta:{type:String},//TRATAMIENTO CONTABLE
    NombreSolici:{type:String},//Solicitante
    areasolici:{type:String}//area solicitante
    

});
const Articulos= mongoose.model('Articulos', articuloSchema);
module.exports= Articulos;