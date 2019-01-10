var http = require('http');
var fs = require('fs');
var formid = require('formidable');
var mv = require('mv');

http.createServer((request, response) => {
	console.log("Method: " + request.method);
	console.log("URL: " + request.url);
	if (request.method === "GET") {
		switch (request.url) {
			case '/index.css':
				fs.readFile("index.css", (err, data) => {
					response.writeHead(200, {'Content-Type': 'text/css'});
					if (err) throw err;

					response.end(data);
				})
				break;
			case '/':
				fs.readFile("index.html", (err, data) => {
					response.writeHead(200, {'Content-Type': 'text/html'});
					if (err) throw err;

					response.end(data);
				});
				break;
			case '/app':
				fs.readFile("app.html", (err, data) => {
					response.writeHead(200, {'Content-Type': 'text/html'});
					if (err) throw err;

					response.end(data);
				});
				break;
		};
	};

	if (request.method === "POST") {
		var form = new formid.IncomingForm();

		form.parse(request, (err, fields, files) => {
			var oldpath = files.filetoupload.path;
			var newpath = __dirname + "/uploads/" + files.filetoupload.name;

			console.log("old path: " + oldpath);
			console.log("new path: " + newpath);

			mv(oldpath, newpath, (err) => {
				if (err) {
					throw err;
				}

				console.log('file uploaded successfully');
				return response.end("file uploaded successfully");
			});
		});
	}
}).listen(8000);

console.log("Listening to http://localhost:8000");