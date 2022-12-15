const {v4: uuidv4} = require("uuid");
const fs = require("fs");
const chalk = require("chalk");

//generando id con uuid
let id = uuidv4().slice(-6);

//almacenando archivo con id unico x cada correo
let escribeArchivo = (data, texto) => {
    fs.writeFile("correos/correo_id_" + id, texto, "utf8", () => {
        console.log(chalk.bgBlack.red(`Archivo para el correo_id_${id} creado con exito.`));
    });
}

module.exports = escribeArchivo;