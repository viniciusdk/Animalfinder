const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.optional = (req, res, next) => {
    res.locals.id = 0;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        res.locals.id = req.userData.id;
        next();
    } catch (error) {
        next();
    }
};

exports.required = (req, res, next) => {
    res.locals.id_dono = 0;
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        res.locals.id_dono = req.userData.id_dono;
        next();
    } catch (error) {
        return res.status(401).json({
            message: '111111Usuário não autenticado.'
        });
    }
};

exports.requiredToken = (req, res, next) => {
    try {
        const token = req.params.form;
        console.log(token)
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        
        res.status(200).send({mensagem:"ok"})
        
    } catch (error) {
        return res.status(401).json({
            message: 'Usuário não autenticado.'
        });
    }
};