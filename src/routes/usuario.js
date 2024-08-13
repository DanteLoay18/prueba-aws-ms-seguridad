const {Router} = require('express');
const { register, actualizar, eliminar } = require('../controllers');
const { validarCampos } = require('../middlewares');
const { check } = require('express-validator');
const router= Router();

router.post('/register',
        check('usuario','El username es obligatorio').not().isEmpty(),
        check('clave','La contrasena es obligatoria').not().isEmpty(),
        check('tipo_usuario_id','El tipo de usuario es obligatorio').not().isEmpty(),
        check('locales','Los locales es obligatorio').not().isEmpty(),
        check('pin','El pin es obligatorio').not().isEmpty(),
        check('restaurante_id','El id de restaurante es obligatorio').not().isEmpty(),
        check('user_id','El id de usuario es obligatorio').not().isEmpty(),
        validarCampos, 
        register
    );

router.put('/actualizar',
        check('restaurante_id','El id de restaurante es obligatorio').not().isEmpty(),
        check('user_id','El id de usuario es obligatorio').not().isEmpty(),
        validarCampos, 
        actualizar
    );
router.patch('/eliminar',
        check('estado','El estado es obligatorio').not().isEmpty(),
        check('restaurante_id','El id de restaurante es obligatorio').not().isEmpty(),
        check('user_id','El id de usuario es obligatorio').not().isEmpty(),
        validarCampos, 
        eliminar
    );

module.exports= router;