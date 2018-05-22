'use strict'
const fs = require('fs');
const express = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001
const nodemailer = require('nodemailer')

const app = express()
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'ingeniofuncional@gmail.com',
		pass: 'ingeniofunc'
	}
})

var mailOptions = {
	from: 'postmaster@unal.edu.co',
	to: 'jmbarreram@unal.edu.co',
	subject: 'prueba de correo nodeJS',
	text: 'solo dejo la prueba del envio del correo desde el servicio REST con adjunto :v',
	attachments: [
		{
			//path: 'C:/Users/Mazqhalo/NodeJs/output.pdf'
			filename: 'prueba.pdf',
            content: fs.createReadStream('index.js')
		}
	]
}


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/api/product:mail', (req, res) => {
	res.send(200, {products: []})
	mailOptions.to = req.params.mail;
	transporter.sendMail(mailOptions,(error, info) => {
		if (error){
			console.log(error);
		}else {
			console.log('Email sent: ' + info.response);
		}
	})
});

app.get('/api/product/:productId', (req, res) => {

});

app.post('/api/product', (req, res) => {
    console.log(req.body)
	res.status(200).send({message: 'El producto se ha recibido'})
})

app.put('/api/product/:productId', (req, res) => {

});

app.delete('/api/product/:productId', (req, res) => {

});

app.listen(port, () => {
	console.log(`Api rest corriendo en http://localhost:${port}`)
});