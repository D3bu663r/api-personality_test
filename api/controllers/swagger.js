const express = require('express')
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      version: 'v1',
      title: 'REST - Swagger',
      description: 'REST API with Swagger doc',
      termsOfService: 'None',
      contact: {
        email: 'rafaelssouzaads@gmail.com'
      }
    },
    produces: ['application/json'],
    consumes: ['application/json'],
    host: 'localhost:3000',
    basePath: '/api',
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    }
  },
  apis: ['./api/controllers/user.js', './api/models/user.js']
}

const swaggerSpec = swaggerJSDoc(options)
require('swagger-model-validator')(swaggerSpec)

router.get('/json', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

function validateModel(name, model) {
  const responseValidation = swaggerSpec.validateModel(name, model, false, true)
  if (!responseValidation.valid) {
    console.error(responseValidation.errors)
    throw new Error(`Model doesn't match Swagger contract`)
  }
}

module.exports = {
  router,
  validateModel
}
