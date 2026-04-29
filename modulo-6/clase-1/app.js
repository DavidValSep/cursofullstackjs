//creacion de server nodeJS
const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    //console.log(req.url, req.method, req.headers);
    const url = req.url;
    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><lang="es"></head>');
        res.write('<body><h1>Escribe tu mensaje</h1><form action="/mensaje" method="POST"><input type="text" name="mensaje"><button type="submit">Enviar</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/mensaje' && req.method === 'POST') {
        fs.writeFileSync('mensaje.txt', 'Mensaje enviado desde formulario.');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

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