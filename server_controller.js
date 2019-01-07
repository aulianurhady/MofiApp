var http = require('http');
var fs = require('fs');
var url = require('url');

http.createServer((request, response) => {
	
	if (request.method === "GET") {
		switch (request.url) {
			case '/':
				fs.readFile("index.html", (err, data) => {
					response.writeHead(200, {'Content-Type': 'text/html'});
					if (err) throw err;

					console.log("data: " + data);

					response.end(data);
				});
				break;
			case '/app':
				fs.readFile("app.html", (err, data) => {
					response.writeHead(200, {'Content-Type': 'text/html'});
					if (err) throw err;

					response.end(data);
				})
				
		};
	};
}).listen(8000);

console.log("Listening to http://localhost:8000");