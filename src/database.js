const mongoose=require('mongoose');
const fs = require('fs');
const mysql = require('mysql');

mongoose.connect('mongodb+srv://Admin:Prometeo2022@cluster0.kqo6b6w.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
})

    .then(db=> console.log('DB de Mongo conectada'))
    .catch(err=>console.error(err))

    
    var connection = mysql.createConnection({
        host : "easypoa.mysql.database.azure.com",
        user : "Administrador",
        password : "Prometeo2022",
        database : "EasyPOA",
        port: 3306,
        multipleStatements : true,
        
     })

 connection.connect((err)=>{
    if(!err){
        console.log("Conectado a la base de datos de mysql")
    }else{
        console.log(err)
    }
 })

 module.exports = connection;