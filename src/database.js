const mongoose=require('mongoose');

mongoose.connect('mongodb+srv://Admin:Prometeo2022@cluster0.kqo6b6w.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

    .then(db=> console.log('DB de Mongo conectada'))
    .catch(err=>console.error(err))

const mysql = require('mysql');
var connection = mysql.createConnection({
    host : "easypoa.cxvh0pslqhaf.us-east-2.rds.amazonaws.com",
    user : "admin",
    password : "Prometeo2022",
    database : "EasyPOA",
    port: 3306,
    multipleStatements : true
 })

 connection.connect((err)=>{
    if(!err){
        console.log("Conectado a la base de datos de mysql")
    }else{
        console.log("Conexión a la base de datos de mysql fallida")
    }
 })

 module.exports = connection;