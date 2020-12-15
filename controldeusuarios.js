//paquete express
const express = require('express');
const app = express();


//paquete bodyparser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const UsuarioModelo = require('./modelousuarios');

let under = require('underscore');


app.get('/reservas', function (peticion, respuesta) {
    
    let identificador = peticion.params.id;
    UsuarioModelo.findById(identificador,(err, resultado) =>{

        if(err){

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else{

            respuesta.json({
                usuario: resultado
            });

        }       
        
    });
  })

  app.use(cors())
  app.get('/reservas/all', function (peticion, respuesta) {
    
    let identificador = peticion.params.id;
    UsuarioModelo.find({})
    .exec((err, resultado) =>{

        if(err){

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else{

            respuesta.json({
                usuario: resultado
            });

        }       
        
    });
  })
  
  app.post('/reservas', function (peticion, respuesta) {

    let datos = peticion.body

    let guardarUsuario = new UsuarioModelo({

        nombre: datos.nombre,
        apellido: datos.apellido,
        telefono: datos.telefono,
        fechainicio: datos.fechainicio,
        fechafinal: datos.fechafinal,
        tipopaquete: datos.tipopaquete
    });
  
    guardarUsuario.save((err,resultado) => {

        if(err){

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else{

            respuesta.json({
                mensaje:'usuario agregado con exito'
            })

        }
    });

    if(datos.nombre==undefined){
  
      respuesta.status(400).json({
        mensaje: "el nombre es necesario"
      });
  
    } else {
         respuesta.json({usuario: datos});
    }
    
  })
  
  app.put('/reservas/:id', function (peticion, respuesta) {

    let datos = peticion.body;

    let actualizar = under.pick(datos,["nombre","apellido","telefono","fechainicio","fechafinal","tipopaquete"]);

    let identificador = peticion.params.id;

    UsuarioModelo.findByIdAndUpdate(identificador,actualizar, (err,resultado) => {

        if(err) {

            respuesta.status(400).json({
                mensaje: err,
                estado: false
            })

        } else {

            respuesta.json({

                mensaje: 'Usuario editado con exito',
            });

        }
    });


  })
  
  app.delete('/reservas/:ident', function (peticion, respuesta) {
    let identificador = peticion.params.ident;
   
    UsuarioModelo.findByIdAndRemove(identificador,(err,resultado) =>{

        if(err) {
            respuesta.status(400).json({
                mensaje: err,
                estado: false
            });

        } else {

            respuesta.json({
                mensaje:"Usuario eliminado con exito"
            })

        }
    })
  });

  module.exports = app;