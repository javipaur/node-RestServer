const { response, request } = require('express');
const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {
    res.json({
        msg: 'get API - usuariosGet'
    });
  
}

const usuariosPost = async(req, res = response) => {
    res.json({
        msg: 'post API - usuariosPost'
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