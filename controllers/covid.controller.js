//const { catchAsync } = require ('../util/catchAsync')
//const { AppError } = require ('../util/AppError')
const axios = require('axios');
const { transporter } = require('../util/mailer');
const { template } = require('../util/template');


exports.covidrequired = async(req, res) => {
    try {
        //const {data: json} = await axios.get('https://api.covidtracking.com/v1/us/daily.json')
        const respues = await axios.get('https://api.covidtracking.com/v1/us/daily.json')
        let caso = respues.data.map(x => {return {Date: x.date, Positivos: +x.positive, Negativos: +x.negative, Pendientes: +x.pending, Muertes: +x.death}})
        //const data = json.map((item) => {
        //    const { date, positive, negative } = item;
        //    return { date, positive, negative };
        //  });

        //console.log(json)

        //  const caso = json.map((item) => {
        //    return { date: item.date, positive: item.positive, negative: item.negative };
        //  });
        ////console.log(respues)
        res.status(200).json({
            status:'success',
            data: {
                caso
            }
        })

    } catch (error) {
        console.error(error)
    }
}

exports.sendNotification = async(req, res) => {

    const { destinatarios, mensaje } = req.body
    console.log(destinatarios)

    await transporter.verify().then(() => {
        console.log('Ready for send emails');
    })

    let info = await transporter.sendMail({
        from: '"Javier Rodrigo Fonseca Leal" <javier_fonseca@lax.com>', // sender address
        //to: ["javier_fonsi@hotmail.com", "paolita943@hotmail.com","javierrfl1985@gmail.com"], // list of receivers
        to: destinatarios, // list of receivers
        subject: "Correo desde node LAX AGENCY", // Subject line
        text: `${mensaje}` , // plain text body
        html: `${mensaje}, ${template}` // html body
      });
    
      console.log("Message sent: %s", info.messageId);
      res.status(201).json({
        status:'success',
        data: mensaje
      })
}