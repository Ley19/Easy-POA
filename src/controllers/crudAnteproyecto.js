const connection = require('../database');
const date = new Date();
const PDF = require('pdfkit');
const fs = require('fs');

//Guardar registro
    exports.saveAnteproyecto = (req, res)=>{
        const Actividad = req.body.Actividad;
        const Partida = req.body.Partida;
        const Enero = req.body.Enero;
        const Febrero = req.body.Febrero;
        const Marzo = req.body.Marzo;
        const Abril = req.body.Abril;
        const Mayo = req.body.Mayo;
        const Junio = req.body.Junio;
        const Julio = req.body.Julio;
        const Agosto= req.body.Agosto;
        const Septiembre = req.body.Septiembre;
        const Octubre = req.body.Octubre;
        const Noviembre = req.body.Noviembre;
        const Diciembre = req.body.Diciembre;
        const Total = req.body.Total;
        const Fecha = date.getFullYear();

        connection.query('INSERT INTO anteproyecto SET ?',{Actividad:Actividad, Partida:Partida, Enero:Enero, Febrero:Febrero, Marzo:Marzo, Abril:Abril, Mayo:Mayo, Junio:Junio, Julio:Julio, Agosto:Agosto, Septiembre:Septiembre, Octubre:Octubre, Noviembre:Noviembre, Diciembre:Diciembre, Total:Total, Fecha:Fecha}, (error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/anteproyecto');         
            }
        });
    };
//ACTUALIZAR UN REGISTRO
    exports.updateAnteproyecto = (req, res)=>{
        const id = req.body.id;
        const Actividad = req.body.Actividad;
        const Partida = req.body.Partida;
        const Enero = req.body.Enero;
        const Febrero = req.body.Febrero;
        const Marzo = req.body.Marzo;
        const Abril = req.body.Abril;
        const Mayo = req.body.Mayo;
        const Junio = req.body.Junio;
        const Julio = req.body.Julio;
        const Agosto= req.body.Agosto;
        const Septiembre = req.body.Septiembre;
        const Octubre = req.body.Octubre;
        const Noviembre = req.body.Noviembre;
        const Diciembre = req.body.Diciembre;
        const Total = req.body.Total;
        const Fecha = date.getFullYear();
        
        connection.query('UPDATE anteproyecto SET ? WHERE id = ?',[{Actividad:Actividad, Partida:Partida, Enero:Enero, Febrero:Febrero, Marzo:Marzo, Abril:Abril, Mayo:Mayo, Junio:Junio, Julio:Julio, Agosto:Agosto, Septiembre:Septiembre, Octubre:Octubre, Noviembre:Noviembre, Diciembre:Diciembre, Total:Total, Fecha:Fecha},id], (error, results)=>{
            if(error){
                console.log(error);
            }else{
                res.redirect('/anteproyecto');          
            }
         });
    };

//Generar PDF
    
    exports.getPDF = async (req, res)=>{
       const doc = new PDF();
       doc.text('Hola mundo con pdf kit', 30,30);

       doc.pipe(fs.createReadStream('anteproyecto.pdf'));
       doc.end();
    };
