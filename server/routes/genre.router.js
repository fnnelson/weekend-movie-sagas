const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  console.log('get received for param id:', req.params.id)
  const queryParams = [req.params.id];
  const sqlText = (`
  SELECT genres.name 
  FROM movies
  JOIN movies_genres ON movies.id = movies_genres.movie_id
  JOIN genres ON genres.id = movies_genres.genre_id
  WHERE movies.id = $1;
  `)
  pool.query(sqlText, queryParams)
    .then(result => {
      console.log('result.rows for get genres is:', result.rows)
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get 1 movie\'s genres', err);
      res.sendStatus(500)
    })
});

module.exports = router;