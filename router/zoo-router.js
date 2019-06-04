const express = require('express');
const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
   client: 'sqlite3',
   useNullAsDefault: true,
   connection: {
     filename: './data/lambda.db3',
   },
 };

 const db = knex(knexConfig);

 router.get('/' , (req,res) => {
  db('zoos')
  .then(zoo => {
    res.status(200).json(zoo);
  })
  .catch(error => {
    res.status(500).json(error);
  })
 })

module.exports = router;