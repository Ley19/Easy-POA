const {PDFDocument} = require('pdf-lib');
const {readFile, writeFile} = require('fs/promises');
const PDFMerger = require('pdf-merger-js');
const mesActual = new Date();
const fs = require('fs');
const { writeFileSync, readFileSync } = require("fs");
const mysqlConnection = require('../database');
let rooms


const listaMeses = [
	'Enero',
	'Febrero',
	'Marzo',
	'Abril',
	'Mayo',
	'Junio',
	'Julio',
	'Agosto',
	'Septiembre',
	'Octubre',
	'Noviembre',
	'Diciembre',
];

//Guardar registro
exports.saveTransferir = (req, res)=>{
	let formulario=Object.keys(req.body);
	//console.log(formulario)
	let actividadForm = formulario.shift();
	let idActividad = req.body[actividadForm]
	let justificacion = formulario.pop();
	
	//if( formulario.select ){
	let motivo = formulario.pop();
		console.log("Motivo "+motivo)
	//}
	
	//console.log("idActividad "+idActividad)
	//console.log("Justificación "+justificacion)
	
	//console.log(req.body)
	const Partida = 1;
	
	const select = 3;
	const texto = "SI";
	
	function sliceIntoChunks(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}
	let valores= {};
	
	valores['Actividad']=idActividad
	//valores['Partida']=1
	valores['Fecha']=mesActual.toISOString().slice(0, 19).replace('T', ' ')
	valores['Motivo']=req.body[motivo]
	valores['Justificacion']=req.body[justificacion]
	
	//console.log(valores);
	
	mysqlConnection.query('INSERT INTO transferencia SET ?', valores, (error, results)=>{
		if(error){
			console.log(error);
		}else{
			let Lote = results.insertId
			console.log("1 record inserted, ID: " + results.insertId);
			
			
			transferencias=sliceIntoChunks(formulario, 13);
			
			transferencias.forEach(registro => {
				
				//console.log( registro );
				
				let contenido= {};
				
				contenido['Lote']=Lote
				
				let tabla='';
				
				const partida = registro.shift()
				
				let Total = 0
				//console.log( "partida"+ partida);
				
				contenido['Partida']=req.body[partida]
				
				registro.forEach(function callback(mes, index) {	
					
					if(mes.charAt(0)=='i'){
						//console.log( mes + "Incremento" );
						tabla='ampliaciones';
					}else if(mes.charAt(0)=='r'){
						//console.log( mes + "Reduccion" );
						tabla='reducciones';
					}
					//console.log(listaMeses[index]+" > "+ req.body[mes] );
					
					contenido[ listaMeses[index] ]=req.body[mes]
					
					Total += parseFloat( req.body[mes] );
					
				});
				contenido['Total']=Total;
				// listaMeses.forEach(function callback(mes, index) {
					
					// var mesA = registro[ index ]
					// //console.log( req.body[mesA] );
					
					// //console.log( req.body[mesA] );
					// contenido[mes]=req.body[mesA]
				// });
				
				mysqlConnection.query('INSERT INTO '+tabla+' SET ?', contenido, (error, results)=>{
					if(error){
						console.log(error);
					}else{
						//let Lote = results.insertId
						console.log("1 RECORD inserted, ID: " + results.insertId);
						
						
						
					}
				});
				
				
				console.log( "Corte" )
			});
			
			
			
			
			
			res.redirect('/transferencias/'+idActividad);
		}
	});
	
	
	
	
	
  
	
};



// PDF REPORTE DE TRANSFERENCIA
exports.pdfTransferencia = async(req, res)=>{
	
	function getTransferencia(id) {
		//let queryString = 'SELECT * FROM transferencia WHERE id='+id;
		//let queryString = 'SELECT * FROM actividad a LEFT OUTER JOIN anteproyecto an ON a.idActividad=an.Actividad WHERE a.idActividad='+id+" ORDER BY Partida ASC";;
		let queryString = 'SELECT * FROM transferencia t, actividad a WHERE a.idActividad=t.Actividad AND t.id='+id  ;
		console.log(queryString)
		return new Promise((resolve, reject) => {
			mysqlConnection.query(queryString, (err, result) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(result);
				}
			});
		});
	}
	function getAmpliaciones(lote) {
		let queryString = 'SELECT * FROM ampliaciones WHERE Lote='+lote;
		return new Promise((resolve, reject) => {
			mysqlConnection.query(queryString, (err, result) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(result);
				}
			});
		});
	}
	function getReducciones(lote) {
		let queryString = 'SELECT * FROM reducciones WHERE Lote='+lote;
		return new Promise((resolve, reject) => {
			mysqlConnection.query(queryString, (err, result) => {
				if (err) {
					reject(err);
				}
				else {
					resolve(result);
				}
			});
		});
	}
	
	function dividirArray(arr, chunkSize) {
		const res = [];
		for (let i = 0; i < arr.length; i += chunkSize) {
			const chunk = arr.slice(i, i + chunkSize);
			res.push(chunk);
		}
		return res;
	}
	
	async function createPdf (directorio, input,idTransferencia){
        
		try{
			const transferenciaList	= await getTransferencia(req.params.id);
			const ampliacionesList 	= await getAmpliaciones(req.params.id);
			const reduccionesList 	= await getReducciones(req.params.id);
			
			var merger = new PDFMerger();
			
			ampliaciones=dividirArray(ampliacionesList, 4); // Cada 4 partidas hacer una página
			reducciones=dividirArray(reduccionesList, 4); // Cada 4 partidas hacer una página
			console.log(transferenciaList)
			let i;
			const proyecto= transferenciaList[0].idActividad+" "+transferenciaList[0].nombre;
			const justificacion=transferenciaList[0].Justificacion
			
			//const motivo = transferenciaList[0].Motivo
			
			
			let listaMotivos = [
				{ value:"tipo_1", motivo:"Por cambio de periodo", },
				{ value:"tipo_2", motivo:"Por ampliacion del periodo de gestion", },
				{ value:"tipo_3", motivo:"Por diferencia en costos", },
				{ value:"tipo_4", motivo:"Por error en la fecha o suficienca presupuestal", },
			];
			
			let motivoItem = listaMotivos.find(o => o.motivo === transferenciaList[0].Motivo);

			const motivo = motivoItem.value
			
			for (i = 0; i < ampliaciones.length; i++) {
				const pdfDoc = await PDFDocument.load(await readFile(input));
				const form = pdfDoc.getForm();
				
				form.getTextField('proyecto').setText(proyecto);
				form.getTextField('justificacion').setText(justificacion);
				form.getTextField(motivo).setText("X")
				
				let r=1;
				let totalReduccion=0
				reducciones[i].forEach(function (element) {
					form.getTextField('Reduccion'+r).setText(element.Partida.toString());
					form.getTextField('r_ene'+r).setText(element.Enero.toString());
					form.getTextField('r_feb'+r).setText(element.Febrero.toString());
					form.getTextField('r_mar'+r).setText(element.Marzo.toString());
					form.getTextField('r_abr'+r).setText(element.Abril.toString());
					form.getTextField('r_may'+r).setText(element.Mayo.toString());
					form.getTextField('r_jun'+r).setText(element.Junio.toString());
					form.getTextField('r_jul'+r).setText(element.Julio.toString());
					form.getTextField('r_ago'+r).setText(element.Agosto.toString());
					form.getTextField('r_sep'+r).setText(element.Septiembre.toString());
					form.getTextField('r_oct'+r).setText(element.Octubre.toString());
					form.getTextField('r_nov'+r).setText(element.Noviembre.toString());
					form.getTextField('r_dic'+r).setText(element.Diciembre.toString());
					form.getTextField('TR'+r).setText(element.Total.toString());
					totalReduccion+=element.Total
					r++
				});
				form.getTextField('TReduccion').setText( totalReduccion.toString() );
				
				let a=1;
				let totalAmpliacion=0
				ampliaciones[i].forEach(function (element) {
					form.getTextField('Ampliacion'+a).setText(element.Partida.toString());
					form.getTextField('a_ene'+a).setText(element.Enero.toString());
					form.getTextField('a_feb'+a).setText(element.Febrero.toString());
					form.getTextField('a_mar'+a).setText(element.Marzo.toString());
					form.getTextField('a_abr'+a).setText(element.Abril.toString());
					form.getTextField('a_may'+a).setText(element.Mayo.toString());
					form.getTextField('a_jun'+a).setText(element.Junio.toString());
					form.getTextField('a_jul'+a).setText(element.Julio.toString());
					form.getTextField('a_ago'+a).setText(element.Agosto.toString());
					form.getTextField('a_sep'+a).setText(element.Septiembre.toString());
					form.getTextField('a_oct'+a).setText(element.Octubre.toString());
					form.getTextField('a_nov'+a).setText(element.Noviembre.toString());
					form.getTextField('a_dic'+a).setText(element.Diciembre.toString());
					form.getTextField('TA'+a).setText(element.Total.toString());
					totalAmpliacion+=element.Total
					a++
				});
				form.getTextField('TAmpliacion').setText( totalAmpliacion.toString() );
				
				
				
				form.getTextField('pagina').setText( "Página " + (i+1) +" de " + ampliaciones.length);
				
				const pdfBytews = await pdfDoc.save();
				
				let archivo = directorio+idTransferencia+i+".pdf"
							
				await writeFile(archivo, pdfBytews);
				
				await merger.add(archivo);
				
				fs.unlinkSync(archivo);

				//console.log(archivo+" delete successfully.");

			}
			
			await merger.save(directorio+"transferencia_"+idTransferencia+".pdf");
			
			
        }catch(err){
            console.log(err)
        }
    }
	
	const origenPDF = "F-PL_SF-02 Solicitud de transferencia de recursos.pdf"
    
	const directorio= 'src/temp/pdf/';

	const fuente= 'src/temp/';
    
	await createPdf(directorio, fuente+origenPDF, req.params.id )
	
    fs.readFile(directorio+"transferencia_"+req.params.id+".pdf", function(err,data){
		
        res.contentType("application/pdf")
        res.send(data)
    })
    
}