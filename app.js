const yargs = require("yargs");

//paquete express
const express = require('express')
const app = express()
var cors = require('cors')

//paquete bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//paquete mongoose
const mongoose = require('mongoose');

//usar paquete express
app.use(require('./controldeusuarios'));

 
const baseDatos = "mongodb+srv://Alejandro.03:bedoya.27@cluster0.gbhz7.mongodb.net/Almacen?retryWrites=true&w=majority"
mongoose.connect('mongodb://localhost:27017/bdhotel', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection 
.once('open', () => console.log("conectados a db"))
.on('error', (error) => { console.log("error", error) });



const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () =>{
    console.log("hola");
});