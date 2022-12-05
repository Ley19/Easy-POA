const connection = require('../database');
const date = new Date();

exports.guardarRequisicion = (req,res)=>{
    const Usuario = 0;
    const Folio = 0;
    const Actividad = req.body.Actividad.split(' - ');
    const AreaSolicitante = req.body.Solicitante;
    const Partida = req.body.NoPartida;
    const Solicitud = req.body.Solicitud;
    const Tipo = req.body.Tipo;
    const Fecha =  date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-');
    var Cantidad=req.body.Cantidad
    var UnidadM = req.body.UnidadM
    var Clave = req.body.Clave
    var Descripcion = req.body.Descripcion
    var Presupuesto = req.body.Presupuesto
    if(Array.isArray(req.body.Cantidad)){
        Cantidad=req.body.Cantidad.join('||')
        UnidadM = req.body.UnidadM.join('||')
        Clave = req.body.Clave.join('||')
        Descripcion = req.body.Descripcion.join('||')
        Presupuesto = req.body.Presupuesto.join('||')
    }
    const Total = parseFloat(req.body.Total)
    const Leyenda = req.body.Leyenda
    const Fuente = req.body.Fuente
    const Programa = req.body.Programa
    const MesAfectar = req.body.MesAfectar
    const Periodo = req.body.Periodo
    const Para = req.body.Para
    
    connection.query('INSERT INTO requisicion SET ?', {
        folio: Folio,
        usuario: Usuario,
        actividad: Actividad[0],
        areaSolicitante: AreaSolicitante,
        partida: Partida,
        solicitud: Solicitud,
        tipo: Tipo,
        fecha: Fecha,
        cantidad: Cantidad,
        total: Total,
        unidadM : UnidadM,
        clave: Clave,
        descripcion: Descripcion,
        presupuesto: Presupuesto,
        leyenda: Leyenda,
        fuente: Fuente,
        programa: Programa,
        mesAfectar: MesAfectar,
        periodo: Periodo,
        para: Para
    },(error,results)=>{
        if(error){
            console.log(error);
        }else{
            res.redirect("/")       
        }
    })


};
exports.getRequisicion = (req,res)=>{
    connection.query('SELECT * FROM actividad ORDER BY idActividad ASC', function(err,actividades){
        if (err) console.log(err);
        actividades = JSON.parse(JSON.stringify(actividades))
        connection.query('SELECT * FROM requisicion WHERE idRequisicion='+req.params["id"]+' LIMIT 1', function(err,requisicion){
            if (err) console.log(err);
            requisicion = JSON.parse(JSON.stringify(requisicion[0]))
            console.log(requisicion);
            res.render('editar-requisicion', {actividad_data: actividades, requisicion_data:requisicion})
        });
        
    });
};
exports.actualizarRequisicion = (req,res)=>{
    const Id = parseInt(req.body.IdRequisicion)
    const Actividad = req.body.Actividad.split(' - ');
    const AreaSolicitante = req.body.Solicitante;
    const Partida = req.body.NoPartida;
    const Solicitud = req.body.Solicitud;
    const Tipo = req.body.Tipo;
    const Fecha =  date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-');
    var Cantidad=req.body.Cantidad
    var UnidadM = req.body.UnidadM
    var Clave = req.body.Clave
    var Descripcion = req.body.Descripcion
    var Presupuesto = req.body.Presupuesto
    if(Array.isArray(req.body.Cantidad)){
        Cantidad=req.body.Cantidad.join('||')
        UnidadM = req.body.UnidadM.join('||')
        Clave = req.body.Clave.join('||')
        Descripcion = req.body.Descripcion.join('||')
        Presupuesto = req.body.Presupuesto.join('||')
    }
    const Total = parseFloat(req.body.Total)
    const Leyenda = req.body.Leyenda
    const Fuente = req.body.Fuente
    const Programa = req.body.Programa
    const MesAfectar = req.body.MesAfectar
    const Periodo = req.body.Periodo
    const Para = req.body.Para
    
    connection.query('UPDATE requisicion SET ? WHERE idRequisicion=?', [{
        actividad: Actividad[0],
        areaSolicitante: AreaSolicitante,
        partida: Partida,
        solicitud: Solicitud,
        tipo: Tipo,
        fecha: Fecha,
        cantidad: Cantidad,
        total: Total,
        unidadM : UnidadM,
        clave: Clave,
        descripcion: Descripcion,
        presupuesto: Presupuesto,
        leyenda: Leyenda,
        fuente: Fuente,
        programa: Programa,
        mesAfectar: MesAfectar,
        periodo: Periodo,
        para: Para
    },
    Id],
    (error,results)=>{
        console.log("Actualizando...");
        if(error){
            console.log(error);
        }else{
            res.redirect("/")       
        }
    })
}