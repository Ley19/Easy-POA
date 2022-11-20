const express =require("express");
const path=require('path');
const morgan= require('morgan');
const multer=require('multer');
const uuid=require('uuid').v4;
const bodyParser=require("body-parser");
const expressLayouts=require('express-ejs-layouts')

//Inicializaciones
const app = express();
require('./database');

//Settings
app.use(expressLayouts)
app.set('layout','./layouts/layout')
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');


//Middlewares

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
app.use(multer({storage: storage}).single('articulo'));


//Variables Globales

//Routes

app.use(require('./routes/index'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')));

//Iniciar Servidor
app.listen(app.get('port'),()=>{
    console.log("Servidor en el puerto", app.get('port'))
})