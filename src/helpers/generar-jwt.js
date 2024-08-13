const jwt = require('jsonwebtoken');


const generarJWT= (restaurante_id, id, tipo_usuario_id) => {
    return new Promise((resolve, reject)=>{
        const payload = {restaurante_id, id,tipo_usuario_id};
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
        
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }else{
                resolve(token);
            }
        })
    })
}

module.exports = {
    generarJWT
}