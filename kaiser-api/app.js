// var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'partycrusherdev.cm14myorxsdl.us-west-2.rds.amazonaws.com',
//   user     : 'kaiser',
//   password : 'k4153r#SCC1'
// });

// connection.connect();

// connection.query('select * from party_crusher_dev.Evento;', 
// 		function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The evets are: ', rows[0]);
// });

// connection.end();

var express = require("express");
var logger = require("morgan");
var http = require("http");
var app = express();

app.use(logger("short"));

var app_db;
var orm = require('orm');

orm.connect('mysql://kaiser:k4153rSCC1@partycrusherdev.cm14myorxsdl.us-west-2.rds.amazonaws.com:3306/party_crusher_dev', 
function(err, db) 
{
	if (err) return console.error('Connection error: ' + err);

	var Evento = db.define('Evento', {
	  id_evento:      	{type: 'serial', key: true}, // the auto-incrementing primary key
	  Nombre:    		{type: 'text'},
	  Descripcion: 		{type: 'text'},
	  Fecha: 			{type: 'date'},
	  Raiting:     		{type: 'number'},
	  Capacidad:     	{type: 'number'},
	  Publico:     		{type: 'boolean'},
	  Tipo_Musica:     	{type: 'text'},
	  Ubicacion:     	{type: 'text'},
	  Bailar:     		{type: 'boolean'},
	  Llegar_con:     	{type: 'text'}
	}, {
	  methods : {
	    fullName: function() {
	      return this.Nombre + ' ' + this.Descripcion + ' ' + Fecha;
	    }
	  }
	});

	app_db = db;  

 });



app.get("/event-list", function(request, response)
{
	app_db.models.Evento.one({}, function(err_event, data){
	  	if(err_event)
		{
			console.log("error al consultar los eventos. " + err_event);
			response.json({statusCode:200, error: "error al consultar los eventos. " + err_event});
			return;
	  	}

	  	response.json({statusCode:200, data});
	});
});	

http.createServer(app).listen(3000, function(){
	console.log("Kaise-PatyCrusher API runnin on port 3000.");
});