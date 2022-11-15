const {Router}=require ('express');
const router =Router();

const Articulo=require('../models/articulo');

router.get('/', async (req,res) =>{
    res.render('index');
});

router.get('/agregarArticulo',(req,res) =>{
    console.log(req.file);
    res.render('agregarArticulo');
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