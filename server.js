const express = require('express')
const mongoose = require('mongoose')
const url = 'mongodb+srv://lakshan:123Samitha@cluster0.inao4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



// const host = '0.0.0.0';
// const port = process.env.PORT || 3000;


const app = express()

mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection

con.on('open', () => {
    console.log('connected...')
})

app.use(express.json())

const alienRouter = require('./routes/products')
app.use('/aliens',alienRouter)

// app.listen(port, host, function() {
//   console.log("Server started.......");
// });

app.listen(3000, () => {
    console.log('Server started')
})


