const {Router}=require ('express');
const router =Router();

const Articulo=require('../models/articulo');
const mysqlConnection = require('../database');

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

router.get('/crearAnteproyecto',(req,res) =>{
    console.log(req.file);
    res.render('crearAnteproyecto');
});
router.get('/editarAnteproyecto:ID',(req, res)=>{
    const id = req.params.ID;
    mysqlConnection.query("SELECT * FROM anteproyecto WHERE id=? ", [id], (error,results)=>{
        if (error) {
            throw error;
        }else{
            res.render('editarAnteproyecto', {Partida:results[0]});
        }
    });
});

router.get('/anteproyecto',(req,res) =>{
    console.log(req.file);

    mysqlConnection.query('SELECT * FROM anteproyecto', (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('anteproyecto', {results:results});
        }
    })
    
});

const crudAnteproyecto = require('../controllers/crudAnteproyecto');
router.post('/saveAnteproyecto', crudAnteproyecto.saveAnteproyecto);
router.post('/updateAnteproyecto', crudAnteproyecto.updateAnteproyecto);

router.get('/transferencias',(req,res) =>{
    console.log(req.file);
    res.render('transferencias');
});
router.get('/requisicion',(req,res) =>{
    console.log(req.file);
    res.render('requisicion');
});

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