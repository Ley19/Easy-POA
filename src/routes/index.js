const { Router, response } = require("express");
const router = Router();

//Importaciones para Inventarios
const Articulos = require("../models/articulo");
const resguardos = require("../models/resguardos");
const mongoose = require("mongoose");

//Importaciones para Anteproyecto
const pdfCtrl = require("../controllers/creacionPdf");
const database = require("../database");
const crudAnteproyecto = require("../controllers/crudAnteproyecto");
const requisicionCtrl = require("../controllers/requisicion");
const transferir = require("../controllers/transferir");

const { appendBezierCurve } = require("pdf-lib");

router.get("/", async (req, res) => {
  database.query(
    "SELECT * FROM requisicion WHERE usuario=?",
    0,
    (error, results) => {
      if (error) throw error;
      results = JSON.parse(JSON.stringify(results));
      console.log(results);
      res.render("index", { requisiciones_data: results });
    }
  );
});

router.get("/calendario", (req, res) => {
  database.query(
    "SELECT idActividad, nombre FROM actividad ORDER BY idActividad ASC",
    function (err, actividades) {
      if(err) throw err;
      database.query('SELECT * FROM actividad a INNER JOIN anteproyecto an ON a.idActividad=an.Actividad ORDER BY a.idActividad ASC, an.Partida ASC', (error, results)=>{
        if(error) throw error;
        results = JSON.parse(JSON.stringify(results));
        actividades = JSON.parse(JSON.stringify(actividades));
        res.render("calendario", { actividad_data: actividades, anteproyecto_data: results });
    })
      
      
    }
  );
});

//RUTAS PARA ANTEPROYECTO
router.get('/crearAnteproyecto/:id',(req,res) =>{
    console.log(req.file);
    database.query('SELECT * FROM partida', (error, results)=>{
        if(error){
            throw error;
        }else{
            database.query('SELECT * FROM actividad WHERE idActividad='+req.params.id,(error, actividad)=>{
                if(error){
                    throw error;
                }else{
                    res.render('crearAnteproyecto', {results:results, actividad:actividad[0]});
                }
            })
            
        }
    })
});

router.get("/editarAnteproyecto/:id", (req, res) => {
  const id = req.params.id;
  database.query(
    "SELECT * FROM anteproyecto WHERE id=? ",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("editarAnteproyecto", { Partida: results[0] });
      }
    }
  );
});

router.get("/eliminarAnteproyecto/:id", (req, res) => {
  const id = req.params.id;
  database.query(
    " DELETE FROM anteproyecto WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("/anteproyecto");
      }
    }
  );
});

router.get("/anteproyecto", (req, res) => {
  console.log(req.file);

    database.query('SELECT * FROM anteproyecto', (error, results)=>{
        if (error) {
            throw error;
        }else{
            res.render('anteproyecto', {results:results});
        }
    })
    
});

router.get('/anteproyecto/:id',(req,res) =>{

    database.query('SELECT * FROM actividad a LEFT OUTER JOIN anteproyecto an ON a.idActividad=an.Actividad WHERE a.idActividad='+req.params.id+" ORDER BY Partida ASC", (error, results)=>{
        if (error) {
            throw error;
        }else{
            results = JSON.parse(JSON.stringify(results));
            console.log(results);
            res.render('anteproyectoIndividual', {results:results});
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

//RUTAS DE TRANSFERENCIAS

router.get("/transferencias/:id", (req, res) => {
  console.log(req.file);
  database.query('SELECT * FROM actividad a LEFT OUTER JOIN transferencia an ON a.idActividad=an.Actividad WHERE a.idActividad='+req.params.id+" ORDER BY id ASC", (error, results)=>{
    if (error) {
        throw error;
    }else{
		//results = JSON.parse(JSON.stringify(results));
          //  console.log(results);
      res.render("transferencias", { results: results });
    }
  });
});

router.get("/eliminarTransferencia/:id", (req, res) => {
  const id = req.params.id;
  database.query(
    " DELETE FROM transferencia WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        //res.redirect("/transferencias/"+id);
        res.redirect('back');
      }
    }
  );
});


router.get("/nuevaTransferencia/:id", (req, res) => {
  console.log(req.file);
  database.query('SELECT * FROM actividad a LEFT OUTER JOIN anteproyecto an ON a.idActividad=an.Actividad WHERE a.idActividad='+req.params.id+" ORDER BY Partida ASC", (error, results)=>{
    if (error) {
        throw error;
    }else{
		results = JSON.parse(JSON.stringify(results));
          console.log(results);
      res.render("nuevaTransferencia", { results: results });
    }
  });
});

router.post("/saveTransferir", transferir.saveTransferir);

///////// router.get("/reporteTransferencia/1.1", transferir.pdfTransferencia);

router.get("/reporteTransferencia/:id", transferir.pdfTransferencia);



// RUTAS PARA REQUISICION
router.get("/requisicion", function (req, res, next) {
  database.query(
    "SELECT * FROM actividad ORDER BY idActividad ASC",
    function (err, data) {
      data = JSON.parse(JSON.stringify(data));
      res.render("requisicion", { actividad_data: data });
    }
  );
});

router.get("/editar-requisicion/:id", requisicionCtrl.getRequisicion);
router.get("/get_calendario", function (req, res) {
  var idActividad = req.query.idActividad;

  database.query(
    "SELECT * FROM calendario WHERE actividad =" +
      idActividad +
      " ORDER BY partida ASC",
    function (err, data) {
      data = JSON.parse(JSON.stringify(data));
      res.json(data);
    }
  );
});

router.get("/get_partida", function (req, res) {
  var idPartida = req.query.idPartida;
  database.query(
    "SELECT * FROM partida WHERE idPartida =" + idPartida + " LIMIT 1",
    function (err, data) {
      data = JSON.parse(JSON.stringify(data[0]));
      res.json(data);
    }
  );
});

router.get("/get_mes", function (req, res) {
  var idActividad = req.query.idActividad;
  var idPartida = req.query.idPartida;
  database.query(
    "SELECT * FROM calendario WHERE actividad=" +
      idActividad +
      " AND partida=" +
      idPartida,
    function (err, data) {
      data = JSON.parse(JSON.stringify(data[0]));
      res.json(data);
    }
  );
});

router.post("/get_pdf", pdfCtrl.pdfRequisicion);

router.post("/guardarRequisicion", requisicionCtrl.guardarRequisicion);

router.post("/actualizarRequisicion", requisicionCtrl.actualizarRequisicion);

router.get("/image/:id", (req, res) => {
  res.send("Perfil de la Imagen");
});

router.get("/image/:id/delete", (req, res) => {
  res.send("Imagen Eliminada");
});

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< RUTAS DE INVENTARIOS >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

//<<<<<<<<<<<<<<<<< MÉTODOS GET >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.get("/agregarArticulo", (req, res) => {
  console.log(req.file);
  res.render("agregarArticulo");
});

router.get("/Resguardos", (req, res) => {
  console.log(req.file);
  res.render("Resguardos");
});

router.get("/inventario", async (req, res) => {
  var articulos = await Articulos.find({ estatusbi: { $in: ["Activo", "activo"] }}); // filter documents by estatus = 'Activo'
  articulos = JSON.parse(JSON.stringify(articulos));
  res.render("inventario", {
    articulos_data: articulos,
  });
});

router.get("/consulta/:id", (req, res) => {
  const articleId = req.params.id;
  Articulos.findById(articleId, (err, article) => {
    if (err) {
      console.log(err);
    } else {
      console.log(article);
      res.render("consulta", { article: article });
    }
  });
});

//<<<<<<<<<<<<<<< MÉTODOS POST >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

router.post('/inventario/estatus', async (req, res) => {
    const estatus = req.body.estatus; // obtener el valor del botón presionado
    
    let articulos;
    if (estatus === 'activo') {
        articulos = await Articulos.find({ estatusbi: { $in: ["Activo", "activo"] }}); // filtrar por estatus = 'Activo'
    } else if (estatus === 'inactivo') {
        articulos = await Articulos.find({ estatusbi: 'Inactivo' }); // filtrar por estatus = 'Inactivo'
    }
    
    articulos = JSON.parse(JSON.stringify(articulos));
    res.render('inventario', {
        articulos_data: articulos
    });
});

router.post("/agregarArticulo", async (req, res) => {
  const articulo = new Articulos();
  articulo.nombre = req.body.nombreBien;
  articulo.numInventario = req.body.numInventario;
  articulo.clvControl = req.body.clvControl;
  articulo.marca = req.body.marca;
  articulo.modelo = req.body.modelo;
  articulo.tipoAlta = req.body.tipoAlta;
  articulo.costoAdquisicion = req.body.costoAdquisicion;
  articulo.numFactura = req.body.numFactura;
  articulo.description = req.body.descripcion;
  articulo.etiquebi=req.body.etibi;
  articulo.seguim=req.body.segui;
  articulo.registrocon=req.body.regicon;
  articulo.registrodb=req.body.regidb;
  articulo.grupobien=req.body.grubi;
  articulo.trataconta=req.body.tratacon;
  articulo.NombreSolici=req.body.NombreSo;
  articulo.areasolici=req.body.areaso;
  articulo.estatusbi = "Activo";
  articulo.bajabien="N/A";
  //articulo.image=req.file.image;
  await articulo.save();
  const nuevoId = articulo._id;
  console.log(articulo);
  res.redirect("/inventario");
});

router.post("/consulta/:id", async (req, res) => {
  
  const articulo=new Articulos();
  articulo.nombre=req.body.nombre;
  console.log(req.body);
  await Articulos.findByIdAndUpdate(req.params.id,req.body);
  res.redirect("/inventario")

});

router.post("/consulta/:id/deshabilitar", async (req, res) => {
  console.log("DESHABILIDANTO")
  await Articulos.findByIdAndUpdate(req.params.id,{estatusbi:"Inactivo"});
  res.redirect("/inventario")

});

router.post("/Resguardos", async (req, res) => {
  const resguardo = new resguardos();
  resguardo.Resguardo = req.body.Resguardo;
  resguardo.Tipo = req.body.TipoResguardo;
  resguardo.FechaEla = req.body.FechaResguardo;
  resguardo.CEtiqueta = req.body.cuenEtiq;
  resguardo.Seguimiento = req.body.segEti;
  resguardo.NomRes = req.body.NombreRes;
  resguardo.NuResguardo = req.body.NumRes;
  resguardo.AreaAds = req.body.AreaAdscrip;
  resguardo.ubicacion = req.body.UbiFisica;
  resguardo.PerfilAcadem = req.body.PerAcademico;
  resguardo.Puesto = req.body.puest;
  resguardo.estatus = req.body.EstatLaboral;
  resguardo.correoPer = req.body.CorreoPersonal;
  resguardo.correoIns = req.body.CorrInstitucion;
  resguardo.firmado = req.body.ResgFirmado;
  resguardo.añofirmado = req.body.AñoFirma;
  resguardo.observaciones = req.body.obser;
  //articulo.image=req.file.image;
  await resguardo.save();

  console.log(req.file);
  res.redirect("/inventario");
});

//<<<<<<<<<<<<<<<< MÉTODOS DELETE >>>>>>>>>>>>>>>>>>>>>

router.delete("/borrarArticulo", (req, res) => {
  db.articulos.remove({
    ObjectId: "6383db0535d8b3d38d21ba39",
  });
});

module.exports = router;
