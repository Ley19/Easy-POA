const connection = require('../database');
const date = new Date();
const PDF = require('pdfkit');
const fs = require('fs');

//Guardar registro
    exports.saveAnteproyecto = (req, res)=>{
        const Actividad = req.body.Actividad.slice(0,3);
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
                connection.query('INSERT INTO calendario SET ?',{actividad:Actividad, partida:Partida, enero:Enero, febrero:Febrero, marzo:Marzo, abril:Abril, mayo:Mayo, junio:Junio, julio:Julio, agosto:Agosto, septiembre:Septiembre, octubre:Octubre, noviembre:Noviembre, diciembre:Diciembre, total:Total, anio:Fecha}, (error, results)=>{
                    if(error){
                        console.log(error);
                    }else{
                        res.redirect('/anteproyecto');         
                    }
                });
            }
        });
                
    };
//ACTUALIZAR UN REGISTRO
    exports.updateAnteproyecto = (dataPrj, dataCld, id)=>{
        connection.query('UPDATE anteproyecto SET ? WHERE id = ?',[dataPrj,id], (error, results)=>{
            if(error){
                console.log(error);
                return false;
            }else{
                return true;
            }
         });

        connection.query('SELECT * FROM anteproyecto WHERE id = ?',[id], (error, results)=>{
            if (error) {
                throw error;
            }else{
                connection.query('UPDATE calendario SET ? WHERE idCalendario = ?',[dataCld,results[0].Calendario], (error, results)=>{
                    if(error){
                        console.log(error);
                        return false;
                    }else{
                        return true;
                    }
                 });
            }
        })
        
    };

    exports.updateCalendario = (data, id)=>{                      
        connection.query('UPDATE calendario SET ? WHERE idCalendario = ?',[data,id], (error, results)=>{
            if(error){
                console.log(error);
                return false;
            }else{
                return true;
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
