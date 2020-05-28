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

exports.atualizarAnimal = (req, res, next) => {
  mysql.getConnection((error1, conn) => {
    conn.query(`select * from Animal where id_dono = ?`, [res.locals.id_dono],
      (error, results, fields) => {
        if (error) {
          res.status(500).send({ error: error });
        } else {
          foto                    = req.body.foto                       ? `'${req.body.foto}'`                          : 'null';
          nome                    = req.body.nome                       ? `'${req.body.nome}'`                          : 'null';
          idade                   = req.body.idade                      ? `'${req.body.idade}'`                         : 'null';
          informacoes_extras      = req.body.informacoes_extras         ? `'${req.body.informacoes_extras}'`            : 'null';
          cidade                  = req.body.cidade                     ? `'${req.body.cidade}'`                        : 'null';
          estado                  = req.body.estado                     ? `'${req.body.estado}'`                        : 'null';
          status                  = req.body.status                     ? `'${req.body.status}'`                        : 'null';
          if (error) {
            res.status(500).send({ error: error });
          } else {
            conn.query(` update Animal
                      set foto                              = ${foto},
                          nome                              = ${nome}, 
                          idade                             = ${idade},
                          informacoes_extras                = ${informacoes_extras},
                          cidade                            = ${cidade},
                          estado                            = ${estado},
                          status                            = ${status}
                        
                    where id_animal = ?`, [req.body.id_animal],

            (error, results, fields) => {
              conn.release();
              if (error) {
                res.status(500).send({ error: error });
              } else {
                res.status(201).send({ message: "Animal Atualizado com Sucesso." });
              }
          });
        }
      }
    });
  });
};