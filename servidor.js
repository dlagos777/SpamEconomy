const axios = require("axios");
const fs = require("fs");
const http = require("http");
const url = require("url");
const chalk = require("chalk");
const enviarCorreo = require("./mailer");
const escribeArchivo = require("./uuid.js");
const PORT = 3000;

http
    .createServer((req, res) => {

        const getData = async () => {
            let { correos, asunto, contenido } = url
                .parse(req.url, true)
                .query;

            const { data } = await axios.get("https://mindicador.cl/api")

            texto = `<p>${contenido}</p>
            <br/>
            <p>Hola! Los Indicadores economicos de hoy son los siguientes:</p>
            <ul>
                    <li>El valor del dolar el dia de hoy es: ${data.dolar.valor}</li>
                    <li>El valor del euro el dia de hoy es: ${data.euro.valor}</li>
                    <li>El valor del uf el dia de hoy es: ${data.uf.valor}</li>
                    <li>El valor del utm el dia de hoy es: ${data.utm.valor}</li>
            </ul>`

            return { correos, asunto, texto };
        }

        if (req.url.startsWith("/")) {
            fs.readFile("index.html", "utf8", (err, html) => {
                if (err) {
                    res.writeHead(500, { "Content-Type": "text/html; charset=utf-8" });
                    res.end("No se pudo acceder a la página");
                } else {
                    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
                    res.end(html);
                }
            });
        }

        if (req.url.startsWith("/mailing")) {
            getData().then((data) => {
                const { correos, asunto, texto } = data;
                if ((correos !== "") && (asunto !== "") && (texto !== "")) {
                    escribeArchivo(data, texto);
                    enviarCorreo(correos.split(","), asunto, texto);

                    fs.readFile("index.html", "utf8", (err, data) => {
                        console.log(chalk.bgBlack.green(`El correo fue enviado con exito a los destinatarios: ${correos}`));
                        res.write("El correo fue enviado con exito.");
                        res.end();
                    })
                    
                } else {
                    res.write("Falta rellenar campos");
                    res.end();
                }
            })
        }
    })
    .listen(PORT, () => console.log(chalk.bgBlack.green.bold("Servidor corriendo http://localhost:" + PORT)));