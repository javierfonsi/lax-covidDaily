//const { catchAsync } = require ('../util/catchAsync')
//const { AppError } = require ('../util/AppError')
const axios = require('axios');


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
    

}