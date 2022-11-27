const {Router, response}=require ('express');
const router =Router();
const {PDFDocument} = require('pdf-lib')
const {readFile, writeFile} = require('fs/promises')
const fontkit = require('@pdf-lib/fontkit')
const Articulo=require('../models/articulo');
var database = require('../database');


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
router.get('/anteproyecto',(req,res) =>{
    console.log(req.file);
    res.render('anteproyecto');
});
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

router.post('/get_pdf',function(req,res){
    async function createPdf (input,output){
        try{
            const pdfDoc = await PDFDocument.load(await readFile(input));

            pdfDoc.registerFontkit(fontkit)
            const montserratFont= await readFile('./temp/Montserrat-Regular.ttf')
            const montserrat = await pdfDoc.embedFont(montserratFont)

            const fields = pdfDoc.getForm().getFields().map(f=>f.getName())
            console.log(fields)

            const form = pdfDoc.getForm();

            const pdfBytes = await pdfDoc.save();

            await writeFile(output, pdfBytes);
            console.log('PDF creado');
        }catch(err){
            console.log(err)
        }
    }
    createPdf('./temp/formato_requisicion.pdf','./temp/output.pdf' )
})



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