const { response, request } = require('express');
const Usuario = require('../models/usuario');

const bcrypt =require('bcryptjs');




const usuariosGet = async(req = request, res = response) => {
    res.json({
        msg: 'get API - usuariosGet'
    });
  
}

const usuariosPost = async(req, res = response) => {

    

    const {nombre,correo,password,rol}=req.body;

    const usuario=new Usuario({nombre,correo,password,rol});//Creamos la isntancia
    
    //Verificamso si el correo existe
    const existecorreo=await Usuario.findOne({correo:correo});
    if(existecorreo){
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        });
    }

    //Encriptamos la contraseña
    const salt=bcrypt.genSaltSync();
    usuario.password=bcrypt.hashSync(password,salt);


    //Guardar Bd
    await usuario.save();//insertamos el usuario


    res.json({
        msg: 'post API - usuariosPost',
        usuario
    });
   
}

const usuariosPut = async(req, res = response) => {

    res.json({
        msg: 'put API - usuariosPut'
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    res.json({
        msg: 'delete API - usuariosDelete'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}