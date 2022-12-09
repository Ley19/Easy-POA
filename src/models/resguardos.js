const mongoose = require('mongoose');
const { Schema } = mongoose;

const resguardoSchema = new Schema({
    Resguardo:{type:String},
    Tipo:{ type:String},
    FechaEla:{type:Date},
    CEtiqueta:{type:String},
    Seguimiento:{type:String},
    NomRes:{type:String},
    NuResguardo:{type:Number},
    AreaAds:{type:String},
    ubicacion:{type:String},
    PerfilAcadem:{type:String},
    Puesto:{type:String},
    estatus:{type:String},
    correoPer:{type:String},
    correoIns:{type:String},
    firmado:{type:String},
    añofirmado:{type:Number},
    observaciones:{type:String}

});

module.exports = mongoose.model('resguardos', resguardoSchema);