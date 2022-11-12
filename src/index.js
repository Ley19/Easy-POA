const express =require("express");
const path=require('path');
const morgan= require('morgan');
const multer=require('multer');
const uuid=require('uuid').v4;

//Inicializaciones
const app = express();
require('./database');
//Settings
app.set('port',process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');


//Middlewares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination:path.join(__dirname,'public/img/uploads'),
    filename:(req,file,cb,filename)=>{
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({storage: storage}).single('image'));

//Variables Globales

//Routes

app.use(require('./routes/index'));

//Archivos Estaticos
app.use(express.static(path.join(__dirname,'public')));

//Iniciar Servidor
app.listen(app.get('port'),()=>{
    console.log("Servidor en el puerto", app.get('port'))
})