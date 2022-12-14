const express =  require('express')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const cors = require('cors');
const path = require('path')

//init server
const app = express()

//import json to receive requirements in json format
app.use(express.json())

//Enable cors
app.use('*', cors());

//controller
const { globalErrorHandler } = require('./controllers/error.controller')

//router
const { covidRouter } = require('./routes/covid.routes');

//util
const { AppError } = require('./util/AppError');

//swagger
const swaggerSpec = {
    definition:{
        openapi: '3.0.3',
        info: {
            title: "Covid report API for LAX",
            description: "This is delivery server test designed as input text in lax, based on the OpenAPI 3.0 specification. ",
            contact: {
                "name": "Javier Rodrigo Fonseca Leal",
                "url": "https://portafolio-javierfonseca.netlify.app/",
                "email": "javierrfl1985@gmail.com"
              },
            version: "1.0.0"
        },
        servers: [
            {
              "url":"http://localhost:4000",
              "description": "Development server"
            },
            {
              "url":"https://lax-api-covid.herokuapp.com/",
              "description": "Production server"
          }
        ]
    },
    apis: [`${path.join(__dirname, './routes/*.js')}`]
  }

//routes
app.use('/api/v1/', covidRouter)
app.use('/api/v1/doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))
app.use('*', (req, res, next) => {
    next(new AppError(404, "The `${req.originalUrl}` does not found in this server."))
})

// Error handler (err -> AppError)
app.use(globalErrorHandler)

const PORT = process.env.PORT || 4000
app.listen(PORT, () =>{
    console.log('app running')
})

//module.exports = { app }