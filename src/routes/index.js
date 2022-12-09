const {Router, response}=require ('express');
const router =Router();
const Articulo=require('../models/articulo');
const pdfCtrl=require('../controllers/creacionPdf');
const resguardos=require('../models/resguardos');
const database = require('../database');
const crudAnteproyecto = require('../controllers/crudAnteproyecto');
const transferir = require('../controllers/transferir');
const { appendBezierCurve } = require('pdf-lib');
const { db } = require('../models/articulo');

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
    router.post('/Resguardos',async(req,res) =>{
    const resguardo = new resguardos();
    resguardo.Resguardo=req.body.Resguardo;
    resguardo.Tipo=req.body.TipoResguardo;
    resguardo.FechaEla= req.body.FechaResguardo;
    resguardo.CEtiqueta=req.body.cuenEtiq;
    resguardo.Seguimiento=req.body.segEti;
    resguardo.NomRes=req.body.NombreRes;
    resguardo.NuResguardo=req.body.NumRes;
    resguardo.AreaAds=req.body.AreaAdscrip;
    resguardo.ubicacion=req.body.UbiFisica;
    resguardo.PerfilAcadem=req.body.PerAcademico;
    resguardo.Puesto=req.body.puest;
    resguardo.estatus=req.body.EstatLaboral;
    resguardo.correoPer=req.body.CorreoPersonal;
    resguardo.correoIns=req.body.CorrInstitucion;
    resguardo.firmado=req.body.ResgFirmado;
    resguardo.añofirmado=req.body.AñoFirma;
    resguardo.observaciones=req.body.obser;
    //articulo.image=req.file.image;
    await resguardo.save();
    
    
    console.log(req.file);
    res.redirect('/inventario');
    });
    
});
router.get('/inventario',async (req,res) =>{
    console.log(await Articulo.find())
    var articulos=await Articulo.find()
    articulos=JSON.parse(JSON.stringify(articulos))
    res.render('inventario',{
        articulos_data:articulos
    })
});
router.get('/calendario',(req,res) =>{
     database.query('SELECT idActividad, nombre FROM actividad ORDER BY idActividad ASC', function(err,data){
        data = JSON.parse(JSON.stringify(data))
        res.render('calendario', {actividad_data: data})
    });
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

router.get('/editarAnteproyecto/:id',(req, res)=>{
    const id = req.params.id;
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

    database.query('SELECT Partida FROM anteproyecto', (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('anteproyecto', {results:results});
        }
    })
    
});


router.post('/saveAnteproyecto', crudAnteproyecto.saveAnteproyecto);
router.post('/updateAnteproyecto', crudAnteproyecto.updateAnteproyecto);

//BOTONES DE EDICION

/*app.get('/inventario/:id', async (req, res) => {
    const inventario = await inventario.findByID(req.params.id)
    console.log(inventario)

    res.render('inventario', {
        inventario
    })
})*/

//ROUTER. DELET

router.delete('/borrarArticulo',(req, res) => {
    db.articulos.remove({
    "ObjectId":"6383db0535d8b3d38d21ba39"
    });

})

//RUTAS DE TRANSFERENCIAS

router.get('/transferencias',(req,res) =>{
    console.log(req.file);
    database.query('SELECT * FROM anteproyecto', (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('transferencias', {results:results});
        }
    })
    
});


router.post('/saveTransferir', transferir.saveTransferir);


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
    res.redirect('/inventario');
});

router.post('/infoadicional',async(req,res) =>{
    const Informaciona = new Articulo();
    Informaciona.etiquebi=req.body.etibi;
    Informaciona.seguim=req.body.segui;
    Informaciona.estatusbi= req.body.estabi;
    Informaciona.bajabien=req.body.bajabi;
    Informaciona.fechabaja=req.body.fechaba;
    Informaciona.registrocon=req.body.regicon;
    Informaciona.registrodb=req.body.regidb;
    Informaciona.grupobien=req.body.grubi;
    Informaciona.trataconta=req.body.tratacon;
    Informaciona.NombreSolici=req.body.NombreSo;
    Informaciona.areasolici=req.body.areaso;
    await Informaciona.save();

    console.log(Informaciona);
    res.redirect('/inventario');
});

router.get('/image/:id',(req,res) =>{
    res.send('Perfil de la Imagen');
});

router.get('/image/:id/delete',(req,res) =>{
    res.send('Imagen Eliminada');
});

module.exports=router;