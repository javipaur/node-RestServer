const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt =require('bcryptjs');




const usuariosGet = async(req = request, res = response) => {

    //Flitramso la cantidad de registros
    const{limite=5,desde=0}=req.query;
    const query={estado:true}

  
    const [total,usuarios] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
        .skip(Number (desde))
        .limit(Number (Numberlimite))
    ]);



    res.json({ 
        total,
        usuarios
    });
  
}

const usuariosPost = async(req, res = response) => {


    const {nombre,correo,password,rol}=req.body;
    //Estos son los campos que se grabaran en  el insert del usuario
    const usuario=new Usuario({nombre,correo,password,rol});//Creamos la instancia
    
    //Verificamos si el correo existe
    

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
    const{_id,password,google,correo,...resto}=req.body;

    //Validar contra bd
    if(password){
        const salt=bcrypt.genSaltSync();
        resto.password=bcrypt.hashSync(password,salt);
    }

    const usuario=await Usuario.findByIdAndUpdate(id,resto);


    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res = response) => {

    const {id}=req.params;

    res.json({
        id,
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