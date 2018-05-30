const fs = require('fs');
const PDF = require('pdfkit');
const inport = require('./info.js');
    let doc = new PDF();
    doc.pipe(fs.createWriteStream(`pdf-files/cotizacion.pdf`));
   
doc.moveDown()


nfactura = inport.nfactura;
dempresa= inport.dempresa;
ciudad= inport.eciudad;
fecha= inport.fecha;
cliente = inport.cliente;
domicilio= inport.domicilio;
ciudad= inport.cciudad;
nif= inport.nif;
comentarios= inport.comentarios;
codigo= inport.codigo;
articulo= inport.articulo;
unidad= inport.unidad;
precio= inport.precio;
subtotal = inport.subtotal;
 iva = inport.iva;
 total = inport.total;
 rsubtotal = inport.rsubtotal;
 descuento = inport.descuento;
 base = inport.base;
 riva = inport.riva;
 rfactura = inport.rfactura;
doc.fontSize(20).text((domicilio),290, 77); // direccion empresa empresa
doc.fontSize(20).text((ciudad),290, 102);// ciudad empresa
doc.fontSize(15).text((fecha),10, 102);// fecha de la cotizacion
doc.fontSize(15).text(('Cliente:    '+cliente),7, 158);// nombre cliente
doc.fontSize(15).text(('Domicilio: '+domicilio),7, 182);// domicilio cliente
doc.fontSize(15).text(('Ciudad:    '+ ciudad),7, 207);// ciudad cliente
doc.fontSize(15).text(('N.I.F:       '+ nif),7, 230);//nif cliente
doc.fontSize(15).text(('Comentarios: '+ comentarios),290, 153);//comentarios
doc.fontSize(12).text(('Codigo'),10, 282);//codigo
doc.fontSize(12).text(('Articulo'),130, 282);//arituclo
doc.fontSize(12).text(('Unidades'),249, 282);//unidades
doc.fontSize(12).text(('Precio U.'),310, 282);//precio unidad
doc.fontSize(12).text(('Subtotal'),380, 282);//subtotal
doc.fontSize(12).text(('Iva'),455, 282);//% iva
doc.fontSize(12).text(('Total'),505, 282);//Total con iva
doc.fontSize(12).text(('Forma de pago'),7, 635);//Forma de pago
doc.fontSize(10).text((codigo),7, 310,{
    width: 50,
    align: 'justify',
});//codigo recibido

doc.fontSize(10).text((articulo),60, 310,{
    width: 175,
    align: 'right',
});//articulo recibido

doc.fontSize(10).text((unidad),245, 310,{
    width: 50,
    align: 'right',
});//unidades recibido
doc.fontSize(10).text((precio),302, 310,{
    width: 65,
    align: 'right',
});//precio recibido 
doc.fontSize(10).text((subtotal),372, 310,{
    width: 60,
    align: 'right',
});//subtotal
doc.fontSize(10).text((iva),425, 310,{
    width: 60,
    align: 'right',
});//iva recibido
doc.fontSize(10).text((total),490, 310,{
    width: 60,
    align: 'right',
});//total recibido

doc.rect(5, 50, 275, 50).stroke() ;// logo u nombre
doc.rect(280,50,275,25).stroke() ;// numero cotizacion
doc.rect(280,75,275,25).stroke() ;  // direccion empresa
doc.rect(280,100,275,25).stroke() ;//ciudad empresa
doc.rect(5,100,275,25).stroke() ;// fecha
doc.rect(280,150,275,100).stroke() ; //comentarios
doc.rect(5,150,275,25).stroke() ; //cliente
doc.rect(5,175,275,25).stroke() ; //domicilio del cliente
doc.rect(5,200,275,25).stroke() ; //ciudad del cliente 
doc.rect(5,225,275,25).stroke() ; //nif del cliente
doc.rect(5,275,550,300).stroke() ; //recuadro productos
doc.rect(5,275,550,25).stroke() ; //recuadro principal
doc.rect(5,275,50,300).stroke() ; //codigo
doc.moveTo(240, 275).lineTo(240, 575).stroke();//articulo
doc.moveTo(300, 275) .lineTo(300,575).stroke();//unidades
doc.moveTo(370, 275) .lineTo(370,575).stroke();//subtotal
doc.moveTo(435, 275) .lineTo(435,575).stroke();//iva
doc.moveTo(490, 275) .lineTo(490,575).stroke();//total
doc.rect(5,580,550,125).stroke() ; //recuadro recaudo
doc.rect(5,580,132,125).stroke() ; //forma pago
doc.rect(137,580,418,25).fillAndStroke("#f2f3f4", "black").stroke() ; //subtotal  #f2f3f4
doc.moveUp().fillColor('black');//total cotizacion
doc.fontSize(12).text(('Subtotal: '),140, 588);//Subtotal recaudo
doc.fontSize(12).text((rsubtotal),385, 588);//Subtotal recaudo numero
doc.fontSize(12).text(('Descuento'),140, 615);//descuento recaudo
doc.fontSize(12).text((descuento),495, 615);//descuento recaudo numero
doc.fontSize(12).text(('Base imponible'),140, 632);//Base imponible
doc.fontSize(12).text((base),495, 632);//base imponible numero
doc.moveTo(136, 645) .lineTo(555,645).stroke();//linea descuento y base imponible
doc.fontSize(12).text(('Iva'),140, 651);//Iva recaudo
doc.fontSize(12).text((riva),495, 651);//Iva recaudo numero
doc.rect(138,679,417,25).fill("#cacfd2").moveDown().stroke() ;//relleno caslla total cotizacion
doc.moveUp().fillColor('#ec7063');//total cotizacion
doc.fontSize(14).text(('Total cotizacion: '),140, 685);// total cotizacion
doc.fontSize(14).text(('Total cotizacion: '),140, 685);// total cotizacion
doc.fontSize(14).text((rfactura),480, 685);//total cotizacion recibido
doc.fontSize(20).text(('Cotizacion'),290, 52);// numero cotizacion
//imagen escala
doc.image('LogoIngenioFuncional.png', 5, 55, {scale: 0.25})

    doc.end();
    console.log(`Okey`);