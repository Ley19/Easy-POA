const {Router, response}=require ('express');
const router =Router();
const Articulo=require('../models/articulo');
const pdfCtrl=require('../controllers/creacionPdf');
const database = require('../database');
const crudAnteproyecto = require('../controllers/crudAnteproyecto');

router.get('/', async (req,res) =>{
    res.render('index');
});

router.get('/agregarArticulo',(req,res) =>{
    console.log(req.file);
    res.render('agregarArticulo');
});
router.get('/Resguardos',(req,res) =>{
    console.log(req.file);
    res.render('Resguardos');
});
router.get('/inventario',(req,res) =>{
    console.log(req.file);
    res.render('inventario');
});


//RUTAS PARA ANTEPROYECTO
router.get('/crearAnteproyecto',(req,res) =>{
    console.log(req.file);
    database.query('SELECT * FROM partida', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('crearAnteproyecto', {results:results});
        }
    })
});

router.get('/editarAnteproyecto:ID',(req, res)=>{
    const id = req.params.ID;
    database.query("SELECT * FROM anteproyecto WHERE id=? ", [id], (error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('editarAnteproyecto', {Partida:results[0]});
        }
    });
});

router.get('/eliminarAnteproyecto/:id', (req, res) => {
    const id = req.params.id;
    database.query(" DELETE FROM anteproyecto WHERE id=?", [id], (error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect('/anteproyecto');
        }
    });
});

router.get('/anteproyecto',(req,res) =>{
    console.log(req.file);

    database.query('SELECT * FROM anteproyecto', (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('anteproyecto', {results:results});
        }
    })
    
});


router.post('/saveAnteproyecto', crudAnteproyecto.saveAnteproyecto);
router.post('/updateAnteproyecto', crudAnteproyecto.updateAnteproyecto);

//RUTAS DE TRANSFERENCIAS

router.get('/transferencias',(req,res) =>{
    console.log(req.file);
    res.render('transferencias');
});

router.get('/infoadicional',(req,res) =>{
    console.log(req.file);
    res.render('infoadicional');
});

// RUTAS PARA REQUISICION
router.get('/requisicion',function(req,res,next){
    database.query('SELECT * FROM actividad ORDER BY idActividad ASC', function(err,data){
        data = JSON.parse(JSON.stringify(data))
        res.render('requisicion', {actividad_data: data})
    });

    
})
router.get('/get_calendario', function(req,res){
    var idActividad = req.query.idActividad
    
    database.query('SELECT * FROM calendario WHERE actividad ='+idActividad+' ORDER BY partida ASC', function(err,data){
        data = JSON.parse(JSON.stringify(data))
        res.json(data);
    })
})

router.get('/get_partida', function(req,res){
    var idPartida = req.query.idPartida
    database.query('SELECT * FROM partida WHERE idPartida ='+idPartida+' LIMIT 1', function(err,data){
        data = JSON.parse(JSON.stringify(data[0]))
        res.json(data);
    })
})

router.get('/get_mes', function(req,res){
    var idActividad = req.query.idActividad
    var idPartida = req.query.idPartida
    console.log(idActividad,idPartida)
    database.query('SELECT * FROM calendario WHERE actividad='+idActividad+' AND partida='+idPartida, function(err,data){
        data = JSON.parse(JSON.stringify(data[0]))
        res.json(data);
    })
})

router.post('/get_pdf', pdfCtrl.pdfRequisicion);



router.post('/agregarArticulo',async(req,res) =>{
    const articulo = new Articulo();
    articulo.nombre=req.body.nombreBien;
    articulo.numInventario=req.body.numInventario;
    articulo.clvControl= req.body.clvControl;
    articulo.marca=req.body.marca;
    articulo.modelo=req.body.modelo;
    articulo.tipoAlta=req.body.tipoAlta;
    articulo.costoAdquisicion=req.body.costoAdquisicion;
    articulo.numFactura=req.body.numFactura;
    articulo.description=req.body.descripcion;
    //articulo.image=req.file.image;
    await articulo.save();

    console.log(articulo);
    res.redirect('/');
});

router.get('/image/:id',(req,res) =>{
    res.send('Perfil de la Imagen');
});

router.get('/image/:id/delete',(req,res) =>{
    res.send('Imagen Eliminada');
});

module.exports=router;