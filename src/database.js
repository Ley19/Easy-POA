const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Inventarios',{
    useNewUrlParser:true
})

    .then(db=> console.log('DB conectada'))
    .catch(err=>console.error(err))

const mysql = require('mysql');
var connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "easypoa",
    multipleStatements : true
 })

 connection.connect((err)=>{
    if(!err){
        console.log("Conectado a la base de datos")
    }else{
        console.log("Conexión a la base de datos fallida")
    }
 })

 module.exports = connection;