const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.cadastrarAnimal = (req, res, next) => {

    let aml = req.body;
    mysql.getConnection((error1, conn) => {
      conn.query(`insert into Animal (foto, nome, idade, informacoes_extras, cidade, estado, status, id_dono) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [aml.foto, aml.nome, aml.idade, aml.informacoes_extras, aml.cidade, aml.estado, aml.status, res.locals.id_dono],
        (error, results, fields) => {
          conn.release();
          if (error) {
            res.status(500).send({ error: error });
          } else {
            res.status(201).send({ message: "Animal inserido com Sucesso." });
          }
        });
    });
};