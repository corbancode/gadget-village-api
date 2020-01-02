const mongoose = require('mongoose');
const { logger } = require('../app/utils/logger');
const config = require('config');


mongoose.connect(`mongodb+srv://gadget_village:${encodeURI(config.get('db.password'))}@gadgetvillage-z7ykd.mongodb.net/test?retryWrites=true&w=majority`, (err) => {
    if (err) {
        throw new Error('Database connection failed', err);
    }    
})
.then((succ) => {
    logger.info('Database Connected');
});

module.exports.mongoose = mongoose;