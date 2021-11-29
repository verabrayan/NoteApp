const mongoose = require('mongoose');

const {NOTES_MONGODB_HOST, NOTES_MONGODB_NAME} = process.env
const MONGODB_URI = `mongodb://${NOTES_MONGODB_HOST}/${NOTES_MONGODB_NAME}`

mongoose.connect(MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db =>console.log('DB is connected'))
.catch(err => console.log(err));