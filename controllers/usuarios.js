const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt =require('bcryptjs');




const usuariosGet = async(req = request, res = response) => {
    //QueryParams
    const {q,nombre="No name",apikey,page=1,limit}=req.query;
    res.json({
        msg: 'get API - usuariosGet',
        q,nombre,apikey,page,limit
    });
  
}

const usuariosPost = async(req, res = response) => {


    const {nombre,correo,password,rol}=req.body;
    //Estos son los campos que se grabaran en  el insert del usuario
    const usuario=new Usuario({nombre,correo,password,rol});//Creamos la instancia
    
    //Verificamos si el correo existe
    const existecorreo=await Usuario.findOne({correo});
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
        usuario
    });
   
}

const usuariosPut = async(req, res = response) => {
    const {id}=req.params;
    res.json({
        msg: 'put API - usuariosPut',
        id
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