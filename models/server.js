const express =require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath='/api/usuarios';
        //Conexion Bd
        this.conectarDB();
        //Midelwares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares(){
        //Cors
        this.app.use(cors());
        //Directorio Publico
        this.app.use(express.static('public'));
        //Json 
        this.app.use(express.json());
    }

    //Definimos las rutas
    routes(){
      this.app.use(this.usuariosPath,require('../routes/usuarios'));
       
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en el puerto",this.port)
        })
    }
}

module.exports=Server;