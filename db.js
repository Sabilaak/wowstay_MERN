const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://sabilaak9395:8590210290@cluster0.gqwaxvv.mongodb.net/hotelbookig'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser: true })

var connection = mongoose.connection


connection.on('error', ()=>{
    console.log('Mongo DB Connection failed')
})
connection.on('connected' , ()=>{
    console.log('Mongo DB Connection Successful')
})
module.exports = mongoose;