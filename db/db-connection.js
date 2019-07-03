const mongoose = require('mongoose');
const dbDebugger = require('debug')('app:db');
const config = require('config');


mongoose.connect(`mongodb+srv://gadget_village:${encodeURI(config.get('db.password'))}@gadgetvillage-z7ykd.mongodb.net/test?retryWrites=true&w=majority`, (err) => {
    console.log(err)
})
.then((succ) => {
    dbDebugger('Database Connected');
})
.catch((err) => {{
    dbDebugger(err);
}});

module.exports.mongoose = mongoose;