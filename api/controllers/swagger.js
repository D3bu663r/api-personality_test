const express = require('express')
const router = express.Router()
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
    swaggerDefinition: {
        info: {
            version: 'v1',
            title: 'Personality Test',
            termsOfService: 'None',
            contact: {
                email: 'rafaelssouzaads@gmail.com'
            }
        },
        produces: ['application/json'],
        consumes: ['application/json'],
        securityDefinitions: {
            Bearer: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        }
    },
    apis: ['./api/controllers/auth.js',
        './api/controllers/user.js',
        './api/controllers/question.js',
        './api/controllers/answer.js',
        './api/controllers/dtos/user/*.js',
        './api/controllers/dtos/auth/*.js',
        './api/controllers/dtos/question/reference.js',
        './api/controllers/dtos/question/condition.js',
        './api/controllers/dtos/question/create.js',
        './api/controllers/dtos/question/read.js',
        './api/controllers/dtos/answer/*.js'
    ]
}

const swaggerSpec = swaggerJSDoc(options)

router.get('/json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

module.exports = {
    router
}
