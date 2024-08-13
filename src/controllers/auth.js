const { response, request } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const Usuario = require("../models/usuario");
const bcryptjs = require('bcryptjs');
const crypto = require('crypto');


require('dotenv').config();

const login = async (req=request, res=response) => {
    const {usuario, clave} = req.body;

    try {

        const usuarioEncontrado = await  Usuario.findOne({where: {
            usuario,
            estado:true
        }});

        if(!usuarioEncontrado){
            return res.json({
                code:401,
                content:{},
                msg:'Usuario / Password no son correcto - correo',
                ok:false
            })
        }
        
        const validPassword = bcryptjs.compareSync(clave, usuarioEncontrado.dataValues.clave);

        if(!validPassword){
            return res.json({
                code:401,
                content:{},
                msg:'Usuario / Password no son correcto - correo',
                ok:false
            })
        }

        const access_token = await generarJWT( encrypt(usuarioEncontrado.dataValues.restaurante_id), usuarioEncontrado.dataValues.id, usuarioEncontrado.dataValues.tipo_usuario_id);
   
        res.json({
            code:200,
            content:{ 
                user:{
                    id:usuarioEncontrado.dataValues.id,
                    tipo_usuario_id:usuarioEncontrado.dataValues.tipo_usuario_id,
                    pin:usuarioEncontrado.dataValues.pin,  
                    locales:usuarioEncontrado.dataValues.locales                  
                },
                access_token
            },
            msg:'',
            ok:true
        })
        
    } catch (error) {
        console.log(error)
        return res.json({
            code:401,
            content:{},
            msg:'Hubo un error comuniquese con el administrador',
            ok:false
        })
    }
    
}

const encrypt= (text) =>{
    const key = crypto.scryptSync(process.env.SECRETKEYCRIPTO, 'salt', 32); // Genera una clave de 32 bytes
    const iv = crypto.randomBytes(16); 
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ":"+encrypted;
}


module.exports = {
    login,
}