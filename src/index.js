
require('dotenv').config();

const app = require('./server')
const database = require('./database')




//start server
app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
})