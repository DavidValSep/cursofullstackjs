const http = require("http");


const generateRandomWord = (min, max) => {
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const length = Math.floor(Math.random() * (max - min + 1)) + min;
  let word = "";
  for (let i = 0; i < length; i++) {
    word += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  return word;
};

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // 1. Servidor de Fecha y Hora (Endpoint Principal)
  if (url === "/" && method === "GET") {
    const now = new Date();
    const days = [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ];

    const data = {
      dia: days[now.getDay()],
      numeroDia: now.getDate(),
      mes: now.getMonth() + 1,
      anio: now.getFullYear(),
      hora: now.getHours(),
      minutos: now.getMinutes(),
      segundos: now.getSeconds(),
    };

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.end(`
            <!DOCTYPE html>
            <html>
            <head><title>Fecha y Hora</title></head>
            <body>
                <h1>Fecha y Hora del Servidor</h1>
                <ul>
                    <li><strong>Día:</strong> ${data.dia}</li>
                    <li><strong>Número día:</strong> ${data.numeroDia}</li>
                    <li><strong>Mes:</strong> ${data.mes}</li>
                    <li><strong>Año:</strong> ${data.anio}</li>
                    <li><strong>Hora:</strong> ${data.hora}</li>
                    <li><strong>Minutos:</strong> ${data.minutos}</li>
                    <li><strong>Segundos:</strong> ${data.segundos}</li>
                </ul>
            </body>
            </html>
        `);
  } else if (url === "/random-data") {
    if (method === "GET") {
      const word = generateRandomWord(4, 8);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        `<html><body><p>Palabra aleatoria: <strong>${word}</strong></p></body></html>`,
      );
    } else if (method === "PUT") {
      const number = generateRandomNumber(10, 50000);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        `<html><body><p>Número aleatorio: <strong>${number}</strong></p></body></html>`,
      );
    } else {
      res.writeHead(405, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`Aún no estoy preparado para responder al método ${method}`);
    }
  }

  // Manejo de rutas no encontradas (404)
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Ruta no encontrada");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
