const fileUpload = require('express-fileupload');
const morgan = require('morgan', 'combined');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const helmet = require('helmet');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const { logger } = require('../app/utils/logger');

module.exports = function (app) {
    app.use(cors());
    app.use(fileUpload({
        limits: { fileSize: 50 * 1024 * 1024 },
    }));
    app.use(helmet());
    app.use(compression());
    app.use(cookieparser());
    app.use(bodyparser.urlencoded({ extended: true }));
    app.use(bodyparser.json({ extended: true }));
    
    app.use(express.static('public'));

    if (app.get('env') === 'development') {
        app.use(morgan());
        logger.info('App is running in development');
    } else {
        var logDirectory = path.join(__dirname, 'log')

        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

        // create a rotating write stream
        var accessLogStream = rfs('access.log', {
            interval: '1d', // rotate daily
            path: logDirectory
        })

        // setup the logger
        app.use(morgan('combined', { stream: accessLogStream }))
    }
}