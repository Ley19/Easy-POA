
const mysqlConnection = require('../database');

//Guardar registro
    exports.saveTransferir = (req, res)=>{
        console.log(req.body)
        const Partida = req.body.PartidaR;
        const Enero = req.body.EneroR;
        const Febrero = req.body.FebreroR;
        const Marzo = req.body.MarzoR;
        const Abril = req.body.AbrilR;
        const Mayo = req.body.MayoR;
        const Junio = req.body.JunioR;
        const Julio = req.body.JulioR;
        const Agosto = req.body.AgostoR;
        const Septiembre = req.body.SeptiembreR;
        const Octubre = req.body.OctubreR;
        const Noviembre = req.body.NoviembreR;
        const Diciembre = req.body.DiciembreR;
        const Total = req.body.TotalR;
        const select = req.body.select;
        const texto = req.body.texto;
      
        mysqlConnection.query('INSERT INTO transferir SET ?',{Partida:Partida, Enero:Enero, Febrero:Febrero, Marzo:Marzo, Abril:Abril, Mayo:Mayo, Junio:Junio, Julio:Julio, Agosto:Agosto, Septiembre:Septiembre, Octubre:Octubre, Noviembre:Noviembre, Diciembre:Diciembre, Total:Total, Motivo:select, Justificacion:texto}, (error, results)=>{
            if(error){
                console.log(error);
            }else{  
            ;
                res.redirect('/transferencias');         
            }
        });
    };