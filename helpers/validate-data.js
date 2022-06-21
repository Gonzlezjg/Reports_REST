const User = require("../models/user")


const emailValidate = async( email = '' ) => {

    // Verificar si el email existe
    const existeEmail = await User.findOne({ email });
    if ( existeEmail ) {
        throw new Error(` ${ email } ya está en uso`);
    }
}

const idValidate = async( id ) => {

    // Verificar si el email existe
    const findId = await User.findById( id );
    if ( !findId ) {
        throw new Error(` el ${ id }  id no existe`);
    }
}


module.exports = {
    emailValidate,
    idValidate
}
