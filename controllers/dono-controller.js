const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();

exports.createDono = (req, res, next) => {

    let response = [];
    let dono = req.body;
    mysql.getConnection((err, conn) => {
        if (err) {
            return res.status(500).send({error: err});
        } else {
            conn.query(`select 1 from Dono where email = ?`, [dono.email], (error, results) => {
                if (err) {
                    console.log(err.sqlMessage);
                    return res.status(500).send({error: err})
                } else if (results.length > 0) {
                    return res.status(409).json({
                      message: 'E-mail já Cadastrado'
                  })
                } else {
                  bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (err) {
                        response.push({ error: errBcrypt });
                    } else {
                      conn.query('insert into Dono ( nome, email, telefone, senha) values ?;',
                                [[[dono.nome, dono.email, dono.telefone, hash]]], (error2, results2) => {
                        conn.release();
                        if (error2) {
                          console.log(error2.sqlMessage);
                          return res.status(500).send({error: error2})
                        } else {
                          res.status(201).json({ mensagem: 'Dono Incluído com Sucesso', id_dono: results.insertId})
                        }
                    }); 
                }
              });
            }
          });
        }
    });
};

exports.login = (req, res, next) => {

  mysql.getConnection((error1, conn) => {
    conn.query(`select * from Dono where email = ?`, [req.body.email], (error, rows, fields) => {
      conn.release();
      if (error) {
        res.status(500).send({ error: error });
      } else {
        if (rows.length < 1) {
          return res.status(401).send({ message: "Falha na Autenticação" });
        } else {
          bcrypt.compare(req.body.senha, rows[0].senha, (err, result) => {
            if (err) {
              return res.status(401).json({ message: "Falha na Autenticação" });
            }
            if (result) {
              const token = jwt.sign(
                {
                  email: rows[0].email,
                  nome: rows[0].nome,
                  id_dono: rows[0].id_dono
                },
                process.env.JWT_KEY,
                {
                  expiresIn: "1d"
                }
              );
              return res.status(200).json({
                message: "Autenticado com Sucesso",
                token: token,
              });
            } else {
              res.status(401).json({ message: "Falha na Autenticação" });
            }
          });
        }
      }
    });
  });
};