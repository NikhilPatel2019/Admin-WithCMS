const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id } , "TESTING-BOOKSTORE", { expiresIn: '30d'} )
}

module.exports = generateToken;
//MyOwnHeadlessCMS is a JWT SECRET KEY