const { response, request } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');

const register = async (req=request, res=response) => {
    
    let {usuario, clave ,restaurante_id, pin, locales, tipo_usuario_id, user_id} = req.body;

    try {
        const usuarioEncontradoPorUsername = await  Usuario.findOne({where: {
            usuario,
            restaurante_id,
            estado:true
        }});

        if(usuarioEncontradoPorUsername){
            return res.json({
                code:401,
                content:{},
                msg:'El usuario ya existe en ese restaurante',
                ok:false
            });
        }

        const usuarioEncontradoPorPin= await  Usuario.findOne({where: {
            pin,
            restaurante_id,
            estado:true
        }});

        if(usuarioEncontradoPorPin){
            return res.json({
                code:401,
                content:{},
                msg:'El pin ya existe en ese restaurante',
                ok:false
            });
        }

        const salt = bcryptjs.genSaltSync();

        clave= bcryptjs.hashSync(clave, salt);

        await Usuario.create({usuario, clave,restaurante_id,pin,locales,tipo_usuario_id,user_id, estado: true});
    
        return res.json({
            code:200,
            content:{},
            msg:'Se registro correctamente',
            ok:true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code:401,
            content:{},
            msg:'Hubo un error comuniquese con el administrador',
            ok:false
        })
    }
    
}

const actualizar = async (req=request, res=response) => {
    
    let {usuario, clave , pin, locales, tipo_usuario_id, user_id, restaurante_id} = req.body;

    try {

        const userEncontrado = await Usuario.findOne({where: {
            user_id,
            restaurante_id,
            estado:true
        }});

        if(!userEncontrado)
        return res.json({
            code:400,
            content:{},
            msg:'No existe ese usuario en este restaurante',
            ok:false
        })

        await Usuario.update({usuario, clave, pin, locales, tipo_usuario_id}, {
            where: {
              user_id,
              restaurante_id,
              estado:true
            }
          });

        return res.json({
            code:200,
            content:{},
            msg:'Se actualizo correctamente',
            ok:true
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            code:500,
            content:{},
            msg:'Hubo un error comuniquese con el administrador',
            ok:false
        })
    }
    
}

const eliminar = async (req=request, res=response) => {
    
    let {restaurante_id, user_id, estado} = req.body;

    try {
      
        const userEncontrado = await Usuario.findOne({where: {
            user_id,
            restaurante_id,
            estado:true
        }});

        if(!userEncontrado)
        return res.json({
            code:400,
            content:{},
            msg:'No existe ese usuario en este restaurante',
            ok:false
        })

        await Usuario.update({estado}, {
            where: {
              user_id,
              restaurante_id,
              estado:true
            }
         });

        return res.json({
            code:200,
            content:{},
            msg:'Se elimino correctamente',
            ok:true
        });

    } catch (error) {
        return res.status(500).json({
            code:500,
            content:{},
            msg:'Hubo un error comuniquese con el administrador',
            ok:false
        })
    }
    
}



module.exports = {
    actualizar,
    eliminar,
    register
}