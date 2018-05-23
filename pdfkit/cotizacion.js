const fs = require('fs');
const PDF = require('pdfkit');


const people = [
    {name : 'ok'},
];

let i = 1;

people.forEach((person) => {
    i++;
    let doc = new PDF();
    doc.pipe(fs.createWriteStream(`pdf-files/cotizacion.pdf`));
   
doc.moveDown()

dempresa= (`car `);
ciudad= (`Bogota `);
fecha= (`Hoy  `);
cliente = (`Cliente Nombre`);
domicilio= (`Car nn #nn L nn`);
ciudad= (`Medellin`);
nif= (`12112121`);
comentarios= (` `);
codigo= (`25 `);
articulo= (`110`);
unidad= (`11`);
precio= (`15000000`);
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
doc.fontSize(12).text(('Unidaes'),249, 282);//unidades
doc.fontSize(12).text(('Precio U.'),316, 282);//precio unidad
doc.fontSize(12).text(('Subtotal'),380, 282);//subtotal
doc.fontSize(12).text(('Iva'),455, 282);//% iva
doc.fontSize(12).text(('Total'),505, 282);//Total con iva
doc.fontSize(12).text(('Forma de pago'),7, 635);//Forma de pago
doc.fontSize(10).text(('REF12345'),7, 310,{
    width: 50,
    align: 'justify',
});//codigo recibido

doc.fontSize(10).text(('mueble bonito funcional y barato'),60, 310,{
    width: 175,
    align: 'right',
});//articulo recibido

doc.fontSize(10).text(('10'),245, 310,{
    width: 50,
    align: 'right',
});//unidades recibido
doc.fontSize(10).text(('1.000.000'),302, 310,{
    width: 65,
    align: 'right',
});//precio recibido 
doc.fontSize(10).text(('1.000.000'),372, 310,{
    width: 60,
    align: 'right',
});//subtotal
doc.fontSize(10).text(('190.000'),425, 310,{
    width: 60,
    align: 'right',
});//iva recibido
doc.fontSize(10).text(('1.190.000'),490, 310,{
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
doc.fontSize(12).text(('$$0000'),385, 588);//Subtotal recaudo numero
doc.fontSize(12).text(('Descuento'),140, 615);//descuento recaudo
doc.fontSize(12).text(('$$0000'),495, 615);//descuento recaudo numero
doc.fontSize(12).text(('Base imponible'),140, 632);//Base imponible
doc.fontSize(12).text(('$$0000'),495, 632);//base imponible numero
doc.moveTo(136, 645) .lineTo(555,645).stroke();//linea descuento y base imponible
doc.fontSize(12).text(('Iva'),140, 651);//Iva recaudo
doc.fontSize(12).text(('$$0000'),495, 651);//Iva recaudo numero
doc.rect(138,679,417,25).fill("#cacfd2").moveDown().stroke() ;//relleno caslla total cotizacion
doc.moveUp().fillColor('#ec7063');//total cotizacion
doc.fontSize(14).text(('Total cotizacion '),140, 685);// total cotizacion
doc.fontSize(14).text(('$$0000'),490, 685);//Iva recaudo numero
doc.fontSize(20).text(('Cotizacion'),290, 52);// numero cotizacion
grad = doc.linearGradient(50, 0, 150, 100)
grad.stop(0, 'brown')
.stop(0.5, 'black')
.stop(1, 'blue')
doc.rect (120, 53, 40, 40);
doc.fill (grad);
grad = doc.linearGradient(50, 0, 150, 100)
grad.stop(0, 'blue', 0)
.stop(0.5, 'red')
.stop(1, 'green', 1)
doc.circle (130, 73, 20);
doc.fill (grad);
    doc.end();
    console.log(`Okey`);
});