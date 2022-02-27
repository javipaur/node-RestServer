const Role =require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido= async(rol='')=>{
    const existeRol=await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no está registrado en la BD `);
    }
}

const emailExiste=async(correo='')=>{
//Verificar si el correo existe    
const existecorreo=await Usuario.findOne({correo});
    if(existecorreo){
        throw new Error(`El correo ${correo} ya está registrado`);
    }
}

const existeUsuarioPorId=async(id='')=>{
    //Verificar si el id existe    
    const existeUsuario=await Usuario.findById({id});
        if(!existeUsuario){
            throw new Error(`El id no existe ${id}`);
        }
    }

module.exports={
    esRoleValido,
    existeUsuarioPorId,
    emailExiste
}