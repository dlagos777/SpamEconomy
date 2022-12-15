const nodemailer = require("nodemailer");

const enviarCorreo = (destinatarios, asunto, mensaje) => {
    return new Promise((res, req) => {
        let correo = "kcard.10013@gmail.com";
        let password = "tfxrelriqwhgwfqh";

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: correo,
                pass: password,
            },
            tls: { rejectUnauthorized: false },
        });
        let mailOptions = {
            from: correo,
            replyTo: "no-reply@gmail.com",
            to: destinatarios,
            subject: asunto,
            html: mensaje,
            // o text: <h1>envio de texto plano</h1>
        }

        transporter.sendMail(mailOptions, (error, data) => {
            if (error) {
                console.log(error);
                reject("Falló envio de correo electronico")
            } else {
                alert("Correo enviado con exito")
                resolve("Correo enviado con exito")
            }
        })
    })
}

module.exports = enviarCorreo;