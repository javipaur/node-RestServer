const {Router}=require('express');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require('../controllers/usuarios');
const {check}=require('express-validator');
const router =Router();

router.get('/',usuariosGet); 

router.put('/:id', usuariosPut);  

 router.post('/',[
     check('correo','El correo no es valido').isEmail(),
 ],usuariosPost); //Definimos un midelware para validar los campos

 router.delete('/',usuariosDelete); 



module.exports=router;