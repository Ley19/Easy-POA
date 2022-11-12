const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/Imagenes',{
    useNewUrlParser:true
})

    .then(db=> console.log('DB conectada'))
    .catch(err=>console.error(err))