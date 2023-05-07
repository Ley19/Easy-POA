const {PDFDocument} = require('pdf-lib');
const {readFile, writeFile} = require('fs/promises');
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');

exports.pdfRequisicion = async (req,res)=>{
    async function createPdf (input,output){
        console.log(req.body);
        try{
            const pdfDoc = await PDFDocument.load(await readFile(input));

            pdfDoc.registerFontkit(fontkit);
            const montserratFont= await readFile('src/temp/Montserrat-Regular.ttf');
            const montserrat = await pdfDoc.embedFont(montserratFont);

            const form = pdfDoc.getForm();
            form.getTextField('areaSuperior').setText(req.body.Area);
            const componente = req.body.Componente.split(' - ');
            form.getTextField('componente').setText(componente[0]);
            form.getTextField('denominacionComp').setText(componente[1]);
            form.getTextField('areaSolicitante').setText(req.body.Solicitante);
            form.getTextField('unidadAdministrativa').setText(req.body.UnidadAdministrativa);
            const actividad = req.body.Actividad.split(' - ');
            form.getTextField('actividad').setText(actividad[0]);
            form.getTextField('denominacionAct').setText(actividad[1]);
            if(req.body.Solicitud==='Material') form.getTextField('material').setText('X');
            if(req.body.Solicitud==='Servicio') form.getTextField('servicio').setText('X');
            if(req.body.Tipo==='Normal') form.getTextField('normal').setText('X');
            if(req.body.Tipo==='Urgente') form.getTextField('urgente').setText('X');
            form.getTextField('partida').setText(req.body.NoPartida);
            form.getTextField('nombrePartida').setText(req.body.Partida);
            const date = new Date();
            const formattedDate = date.toLocaleDateString('en-GB', {
              day: 'numeric', month: 'short', year: 'numeric'
            }).replace(/ /g, '-');
            form.getTextField('fecha').setText(formattedDate)
            form.getTextField('leyenda').setText(req.body.Leyenda)
            form.getTextField('fuenteFinanciamiento').setText(req.body.Fuente)
            form.getTextField('programaEspecial').setText(req.body.Programa)
            form.getTextField('mesAfectar').setText(req.body.Mes)
            form.getTextField('periodoUtilizacion').setText(req.body.Periodo)
            if(req.body.Para==='Gestion') form.getCheckBox('gestion').check()
            if(req.body.Para==='Liberacion') form.getCheckBox('liberacion').check()

            if(Array.isArray(req.body.Cantidad)){
                for (let index = 0; index < req.body.Cantidad.length; index++) {
                    if(index==0){
                        form.getTextField('noProgresivo').setText((index+1).toString())
                        form.getTextField('cantidad').setText(req.body.Cantidad[index])
                        form.getTextField('unidadM').setText(req.body.UnidadM[index])
                        form.getTextField('claveBien').setText(req.body.Clave[index])
                        form.getTextField('descripcion').setText(req.body.Descripcion[index])
                        form.getTextField('presupuesto') .setText(req.body.Presupuesto[index])
                    }else{
                        // var noProgresivo = noProgresivo + form.getTextField('noProgresivo').getText()
                        form.getTextField('noProgresivo').setText(form.getTextField('noProgresivo').getText()+"\n"+(index+1).toString())
                        form.getTextField('cantidad').setText(form.getTextField('cantidad').getText()+"\n"+req.body.Cantidad[index])
                        form.getTextField('unidadM').setText(form.getTextField('unidadM').getText()+"\n"+req.body.UnidadM[index])
                        form.getTextField('claveBien').setText(form.getTextField('claveBien').getText()+"\n"+req.body.Clave[index])
                        form.getTextField('descripcion').setText(form.getTextField('descripcion').getText()+"\n"+req.body.Descripcion[index])
                        form.getTextField('presupuesto') .setText(form.getTextField('presupuesto') .getText()+"\n"+req.body.Presupuesto[index])                 
                    }
                }
            }else{
                form.getTextField('noProgresivo').setText("1")
                form.getTextField('cantidad').setText(req.body.Cantidad)
                form.getTextField('unidadM').setText(req.body.UnidadM)
                form.getTextField('claveBien').setText(req.body.Clave)
                form.getTextField('descripcion').setText(req.body.Descripcion)
                form.getTextField('presupuesto') .setText(req.body.Presupuesto)
            }
            form.getTextField('total').setText(req.body.Total)
            form.getTextField('mesAfectar').setText(req.body.MesAfectar)
            form.getTextField('noCuenta').setText(req.body.NoCuenta)
            const total = parseFloat(req.body.Total)
            if(req.body.NoCuenta === '2581'){
                
                var sub = total/2
                form.getTextField('subFederal').setText(sub.toFixed(2))
                form.getTextField('subEstatal').setText(sub.toFixed(2))
                form.getTextField('ingresosPropios').setText("-")

            } else if(req.body.NoCuenta === '2554') {
                form.getTextField('ingresosPropios').setText(total.toFixed(2))
            }else{
                var sub = total/3
                form.getTextField('subFederal').setText(sub.toFixed(2))
                form.getTextField('subEstatal').setText(sub.toFixed(2))
                form.getTextField('ingresosPropios').setText(sub.toFixed(2))
            }
            form.updateFieldAppearances(montserrat)
            const pdfBytes = await pdfDoc.save();

            await writeFile(output, pdfBytes);
            console.log('PDF creado');
        }catch(err){
            console.log(err)
        }
    }
    const nombrePDF = "formato-requisicion-" + Date.now() +".pdf"
    await createPdf('src/temp/formato_requisicion.pdf','src/temp/pdf/' + nombrePDF )
    fs.readFile('src/temp/pdf/' + nombrePDF, function(err,data){
        res.contentType("application/pdf")
        res.send(data)
    })
    
    
}

