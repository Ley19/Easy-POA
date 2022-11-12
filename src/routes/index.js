const {Router}=require ('express');
const router =Router();

const Image=require('../models/image');

router.get('/', async (req,res) =>{
    const images = await Image.find();
    res.render('index',{images});
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
    const image = new Image();
    image.tittle=req.body.tittle;
    image.description=req.body.description;
    image.filename= req.file.filename;
    image.path='/img/uploads/'+req.file.filename;
    image.originalname=req.file.originalname;
    image.mimetype=req.file.mimetype;
    image.size=req.file.size;

    await image.save();

    console.log(image);
    res.redirect('/');
});

router.get('/image/:id',(req,res) =>{
    res.send('Perfil de la Imagen');
});

router.get('/image/:id/delete',(req,res) =>{
    res.send('Imagen Eliminada');
});

module.exports=router;