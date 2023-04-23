const mongoose=require('mongoose');//Implementación de la librería de mongoose
const fs = require('fs');
const mysql = require('mysql');


//Link de la base de datos de Mongo en la Nube
mongoose.connect('mongodb+srv://Admin:Prometeo2022@cluster0.kqo6b6w.mongodb.net/?retryWrites=true&w=majority',{
    useNewUrlParser:true
})
    //Si se realizó la conección se muestra el mensaje de exito
    .then(db=> console.log('DB de Mongo conectada'))
    //Si no se realizó muestra el error 
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