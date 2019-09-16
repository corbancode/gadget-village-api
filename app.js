const config = require('config');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan', 'combined');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const compression = require('compression');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const auth = require('./routes/auth');
const merchantAuth = require('./routes/merchant-auth');
const users = require('./routes/users');
const products = require('./routes/products');
const merchants = require('./routes/merchants');
const categories = require('./routes/categories');
const subCategories = require('./routes/sub-categories');

const PORT = process.env.PORT || 3000;
const app = express();
if (!config.get('jwt.secret_key')) {
  console.log('FATAL ERROR: Jwt secret key is undefined!');
  process.exit(1);
} else if (!config.get('db.password')) {
  console.log('FATAL ERROR: Database password is undefined!');
  process.exit(1);
}
app.use(cors());
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(compression());
app.use(cookieparser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ extended: true }));
if (app.get('env') === 'development') {
    app.use(morgan());
    console.log('App is running in development');
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
app.use(express.static('public'));

const redirectowww = config.get('domain.redirectowww');
const redirectohttps = config.get('domain.redirectohttps');
const wwwredirecto = config.get('domain.wwwredirecto');

app.use((req, res, next) => {
    // check if it is a secure (https) request
    // if not redirect to the equivalent https url
    if (redirectohttps && req.headers['x-forwarded-proto'] !== 'https' && req.hostname !== 'localhost') {
      // special for robots.txt
      if (req.url === '/robots.txt') {
        next();
        return;
      }
      res.redirect(301, 'https://' + req.hostname + req.url);
    }
  
    // www or not
    if (redirectowww && !req.hostname.startsWith('www.')) {
      res.redirect(301, 'https://www.' + req.hostname + req.url);
    }
  
    // www or not
    if (wwwredirecto && req.hostname.startsWith('www.')) {
      const host = req.hostname.slice(4, req.hostname.length);
      res.redirect(301, 'https://' + host + req.url);
    }
  
    next();
  }
);

app.use('/api/v1/auth', auth);
app.use('/api/v1/merchants/auth', merchantAuth);
// app.use('/api/v1/users', users);
app.use('/api/v1/products', products);
app.use('/api/v1/merchants', merchants);
app.use('/api/v1/categories', categories);
app.use('/api/v1/sub-categories', subCategories);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});