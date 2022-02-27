const {Router}=require('express');
const {check}=require('express-validator');

const {validarCampos} = require('../middleware/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');

const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut, usuariosPatch } = require('../controllers/usuarios');

const router =Router();




router.get('/',usuariosGet); 

router.put('/:id', usuariosPut);  

router.post('/',[
     check('nombre','El nombre  es obligatorio').not().isEmpty(),
     check('password','El password  es obligatorio y mayor de 6 letras').isLength({min:6}),
     check('correo','El correo no es valido').isEmail(),
     check('correo').custom(emailExiste),
    // check('rol','No es un rol permitodo').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
 ],usuariosPost); //Definimos un midelware para validar los campos

 router.delete('/',usuariosDelete); 

 router.patch('/',usuariosPatch); 

module.exports=router;