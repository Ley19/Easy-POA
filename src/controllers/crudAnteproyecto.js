
const connection = require('../database');

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
        const Fecha = new Date();

        console.log("Resultados: ", Total, " - ", Fecha);
        connection.query('INSERT INTO anteproyecto SET ?',{Actividad:Actividad, Partida:Partida, Enero:Enero, Febrero:Febrero, Marzo:Marzo, Abril:Abril, Mayo:Mayo, Junio:Junio, Julio:Julio, Agosto:Agosto, Septiembre:Septiembre, Octubre:Octubre, Noviembre:Noviembre, Diciembre:Diciembre, Total:Total, Fecha:Fecha}, (error, results)=>{
            if(error){
                console.log(error);
            }else{  
            ;
                res.redirect('/anteproyecto');         
            }
        });
    };
//ACTUALIZAR un REGISTRO
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
        const Fecha = req.body.Fecha;
        
        connection.query('UPDATE anteproyecto SET ? WHERE id = ?',[{Actividad:Actividad, Partida:Partida, Enero:Enero, Febrero:Febrero, Marzo:Marzo, Abril:Abril, Mayo:Mayo, Junio:Junio, Julio:Julio, Agosto:Agosto, Septiembre:Septiembre, Octubre:Octubre, Noviembre:Noviembre, Diciembre:Diciembre, Total:Total, Fecha:Fecha}, id], (error, results)=>{
            if(error){
                console.log(error);
            }else{           
                res.redirect('/anteproyecto');          
            }
         });
    };


    /*
//Funcion del tiempo
    let horas = 7;
    let minutos = 0;
    let segundos = 0;

    //definimos y ejecutamos los segundos

    function cargaSegundos(){
        let txtSegundos;
        if(segundos < 0){
            segundos = 59;
        }
        //Mostrar segundos en pantalla
        if(segundos < 10){
            txtSegundos = `0$(segundos)`;
        }else{
            txtSegundos = segundos;
        }
        document.getElementById('segundos').innerHTML = txtSegundos;
        segundos --;
    }

    //Ejecutamos cada segundo

    setInterval(cargaSegundos, 1000)
    */