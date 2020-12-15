//paquete mongoose
const mongoose = require('mongoose');
const { strict, string, number } = require('yargs');

let esquemausuario = new mongoose.Schema({

    nombre:{
        type:String,
        require:[true, 'el nombre es requerido']
    },

    apellido:{
        type:String,
        require:[true, 'el apellido es requerido']
    },

    telefono:{
        type:Number,
        require:[true, 'el numero es necesario']
    },

    fechaReserva:{
        type:Date,
        require:[true, 'se requiere la fecha']
    },
    
    fechaFinal:{
        type:Date,
        require:[true, 'se requiere la fecha final']
    },

    tipoClase:{
        type:String,
        require:[true, 'se requiere la clase']
    }
});

module.exports = mongoose.model('modeloUsuario', esquemausuario)