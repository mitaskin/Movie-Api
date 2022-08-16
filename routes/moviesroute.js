const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/MovieSchemaModel.js');

/* GET movie listing. */
router.post('/', (req, res, next) => {
    const {title, imdb_score, category, country, year} = req.body;

    const movie = new Movie({
        title: title,
        category: category,
        imdb_score: imdb_score,
        country: country,
        year: year
    });

    movie.save((error, result) => {
        if (error) res.json(error);
        res.json(result);
    });

});

module.exports = router;
