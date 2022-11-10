const express = require('express');

const { covidrequired, sendNotification } = require('../controllers/covid.controller');

//reportDaily schema
/**
 * @swagger
 * components:
 *  securitySchemes:
 *   bearerAuth:
 *     type: http
 *     scheme: bearer
 *     bearerFormat: JWT
 *  schemas:
 *     case:
 *        type: object
 *        properties:
 *          Date:
 *              type: string
 *              description: According to date
 *          Positivos:
 *              type: Integer
 *              description: Quantity confirmed cases people
 *          Negativos:
 *              type: Integer
 *              description: Quantity unconfirmed cases people
 *          Pendiente:
 *              type: Integer
 *              description: Quantity that ther not confirmed cases people
 *          Muertes:
 *              type: Integer
 *              description: Quantity confirmed death people
 *        example:
 *          Date: 20210307,
 *          Positivos: 28756489,
 *          Negativos: 74582825,
 *          Pendientes: 11808,
 *          Muertes: 515151
 *     email:
 *        type: object
 *        properties:
 *          destinatarios:
 *              type: array
 *              description: According to email addresses
 *          mensaje:
 *              type: string
 *              description: According to message content email
 *        example:
 *          destinatarios: [javierrfl1985@gmail.com, javier_fonsi@hotmail.com]
 *          mensaje: Este corresponde a un mensaje de prueba.
 */

const router = express.Router();


//View covid daily
/**
 * @swagger
 * /api/v1/coviddaily/:
 *  get:
 *    summary: return an array with info 
 *    tags: [case]
 *    responses:
 *      200:
 *        description: return the info created
 *        content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  items:
 *                    $ref: '#/components/schemas/case'
 */
//router.post('/', createPublishValidators, validateResult, createPublish)
router.get('/coviddaily', covidrequired);

//send a email
/**
 * @swagger
 * /api/v1/sendnotification/:
 *  post:
 *    summary: allow to create an email to address and their content 
 *    tags: [email]
 *    requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/email'
 *    responses:
 *      201:
 *        description: return success  and data with the message typed
 *        content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/email'
 */
router.post('/sendnofication', sendNotification);
module.exports = { covidRouter: router };