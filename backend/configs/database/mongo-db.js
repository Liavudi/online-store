var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/store',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


var db = mongoose.connection;


db.on('error', console.error.bind(console, 'MongoDB connection error:'));






