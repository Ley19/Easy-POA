const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Inventarios',{
    useNewUrlParser:true
})

    .then(db=> console.log('DB conectada'))
    .catch(err=>console.error(err))

const mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "easypoa",
    multipleStatements : true
 })

 mysqlConnection.connect((err)=>{
    if(!err){
        console.log("Conectado a la base de datos")
    }else{
        console.log("Conexión a la base de datos fallida")
    }
 })