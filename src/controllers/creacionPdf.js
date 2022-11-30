const {PDFDocument} = require('pdf-lib')
const {readFile, writeFile} = require('fs/promises')
const fontkit = require('@pdf-lib/fontkit');
const fs = require('fs');
const connection = require('../database')

exports.pdfRequisicion = (req,res)=>{

    async function createPdf (input,output){
        try{
            const pdfDoc = await PDFDocument.load(await readFile(input));

            pdfDoc.registerFontkit(fontkit)
            const montserratFont= await readFile('src/temp/Montserrat-Regular.ttf')
            const montserrat = await pdfDoc.embedFont(montserratFont)

            const fields = pdfDoc.getForm().getFields().map(f=>f.getName())
            console.log(fields)

            const form = pdfDoc.getForm();
            form.getTextField('areaSuperior').setText(req.body.Area)
            const componente = req.body.Componente.split(' - ')
            form.getTextField('componente').setText(componente[0])
            form.getTextField('denominacionComp').setText(componente[1])
            form.getTextField('areaSolicitante').setText(req.body.Solicitante)
            form.getTextField('unidadAdministrativa').setText(req.body.UnidadAdministrativa)
            const actividad = req.body.Actividad.split(' - ')
            form.getTextField('actividad').setText(actividad[0])
            form.getTextField('denominacionAct').setText(actividad[1])
            if(req.body.Solicitud==='Material') form.getTextField('material').setText('X')
            if(req.body.Solicitud==='Servicio') form.getTextField('servicio').setText('X')
            if(req.body.Tipo==='Normal') form.getTextField('normal').setText('X')
            if(req.body.Tipo==='Urgente') form.getTextField('urgente').setText('X')
            form.getTextField('partida').setText(req.body.NoPartida)
            form.getTextField('nombrePartida').setText(req.body.Partida)
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
            form.updateFieldAppearances(montserrat)
            const pdfBytes = await pdfDoc.save();

            await writeFile(output, pdfBytes);
            console.log('PDF creado');
        }catch(err){
            console.log(err)
        }
    }
    createPdf('src/temp/formato_requisicion.pdf','src/temp/output.pdf' )
    fs.readFile('src/temp/output.pdf', function(err,data){
        res.contentType("application/pdf")
        res.send(data)
    })
}

