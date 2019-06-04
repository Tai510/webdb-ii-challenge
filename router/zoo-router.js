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

 router.get("/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .first()
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({ message: "no such id exists" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  db('zoos', 'id')
    .insert(req.body)
    .then(ids => {
      const [id] = ids; 
      db('zoos')
        .where({ id })
        .first()
        .then(zoo => {
          res.status(200).json(zoo);
        });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.put('/:id', (req, res) => {
  db('zoos')
  .where({id: req.params.id})
  .update(req.body)
  .then(count => {
    if(count > 0) {
      res.status(200).json({
       message: `${count} record updated!`});
    } else {
      res.status(404).json({ message: 'Name not found'});
    }
  }).catch(error => {
    res.status(500).json(error);
    console.error(error)
  })
});


module.exports = router;