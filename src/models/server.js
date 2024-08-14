const express = require('express')
const cors= require('cors');
const sequelize = require('../database/sequelize');

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';
require('dotenv').config({path: envFile});

class Server{

    constructor(){
        this.app= express(); 
        this.port= 3000;
        this.paths ={
            auth:'/api/auth',
            usuario:'/api/usuario',
        }

        this.contectarDbSequelize();

         //Middlewares
         this.middlewares();
        //Rutas de mi aplicacion
        this.routes();

        
    }

    async contectarDbSequelize(){
        await sequelize.sync();
    }

    middlewares(){
        //CORS
        this.app.use( cors());

        //Lectura y parseo del codigo
        this.app.use(express.json());


    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuario, require('../routes/usuario'));

        this.app.get('/health', (req, res)=>{
            res.sendStatus(200);
        })

        this.app.get('/health2', (req, res)=>{
            res.sendStatus(200);
        })
        this.app.get('/health3', (req, res)=>{
            res.sendStatus(200);
        })
        this.app.get('/health4', (req, res)=>{
            res.sendStatus(200);
        })
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Servidor corriendo en puerto', this.port)
        });
    }
}

module.exports= Server;