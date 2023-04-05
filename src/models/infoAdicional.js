const mongoose = require('mongoose');
const { Schema } = mongoose;

const infoadicionalSchema = new Schema ({
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

module.exports = mongoose.model('InformacionAdicional', infoadicionalSchema);