const {Router} = require('express');
const { login } = require('../controllers');
const { validarCampos } = require('../middlewares');
const { check } = require('express-validator');
const router= Router();

router.post('/login',
            check('usuario','El correo es obligatorio').not().isEmpty(),
            check('clave','La contrasena es obligatoria').not().isEmpty(),
            validarCampos, 
            login
        );

module.exports= router;