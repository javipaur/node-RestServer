const {response, request}=require('express');

const usuariosGet=(req=request, res=response) =>{
    const {query,
        nombre,
        apikey}=req.query
    res.json({msg:'get Api - Controlador',query,nombre,apikey
     });
}

const usuariosPut=(req, res) =>{
    const id=req.params.id;
    res.status(400).json({msg:'put Api- Controlador',id
     });
}

const usuariosPost = (req, res) =>{
    const {nombre,edad}=req.body;
    res.json({msg:'post Api- Controlador',
    nombre,edad
     });
}

const usuariosDelete =(req, res) =>{
    // res.send('Hello World');
    res.json({msg:'delete Api- Controlador'
     });
}

module.exports={
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}