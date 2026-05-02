//creacion de server nodeJS
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><lang="es"></head>');
    res.write('<body><h1>No existe mensaje.</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});