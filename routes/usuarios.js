const {Router}=require('express');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require('../controllers/usuarios');
const {check}=require('express-validator');
const {validarCampos} = require('../middleware/validar-campos');
const router =Router();
const Role =require('../models/role');

router.get('/',usuariosGet); 

router.put('/:id', usuariosPut);  

router.post('/',[
     check('nombre','El nombre  es obligatorio').not().isEmpty(),
     check('password','El password  es obligatorio y mayor de 6 letras').isLength({min:6}),
     check('correo','El correo no es valido').isEmail(),
    // check('rol','No es un rol permitodo').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(async(rol='')=>{
        const existeRol=await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD `);
        }
    }),
     validarCampos
 ],usuariosPost); //Definimos un midelware para validar los campos

 router.delete('/',usuariosDelete); 



module.exports=router;