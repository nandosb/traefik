const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const cookie = require('cookie');

const authService = require('./services/authService');

const app = express()

const appInit = (app, port = 80) => {
    // for parsing application/json
    app.use(bodyParser.json()); 
    // for parsing application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true })); 

    app.get('/healthcheck',(req, res) => {
        res.status('200').send("OK");
    });

    app.get('/',(req, res) => {
        res.status('200').send("Home page");
    });

    app.get('/auth',(req, res) => {
        console.log("Auth validation");
        const authToken = req.headers.authorization || req.headers.Authorization || ''

        if (authService.validateAuthToken(authToken)){
            res.status('200').send("Auth Validation");
        } else {
            res.redirect(301, 'http://'+process.env.CURRENTDOMAIN+'/login');
        }
        
    });

    app.get('/login', (req, res) => {
        res.status(200).send("Login form");
    });

    app.post('/login', (req, res) => {
        const token = 'asdf12345678';
        res.set({
            'X-Auth-Token': token
        });
        res.status('200').send({token});
    })
    
    app.get('*', (req, res) => {
        res.status('404').send('URL not found');
    })
    
    
    app.listen(port, () => {
        console.log('Server is up on port ' + port)
    })
}

let port = process.env.PORT || 80
if (process.argv[2]) {
    port = process.argv[2]
}

appInit(app, port)
