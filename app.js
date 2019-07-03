const config = require('config');
const express = require('express');
const morgan = require('morgan', 'combined');
const compression = require('compression');
const cookieparser = require('cookie-parser');
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');
const products = require('./routes/products');

const PORT = process.env.PORT || 3000;
const app = express();

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

app.use('/api/v1/products', products);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});