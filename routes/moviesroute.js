const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/MovieSchemaModel.js');


/* GET List ALl Movies. */
router.get('/', (req, res) => {

    const promise = Movie.find({});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* GET List One Movie. */
router.get('/:movie_id', (req, res, next) => {

    const promise = Movie.findById(req.params.movie_id);

    promise.then((data) => {
        if (!data) next('The movie was not found');
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* POST movie added. */
router.post('/', (req, res, next) => {
    //===================  basit yapı ile =======================//

    // const {title, imdb_score, category, country, year} = req.body;
    //
    // const movie = new Movie({
    //     title: title,
    //     category: category,
    //     imdb_score: imdb_score,
    //     country: country,
    //     year: year
    // });
    //
    // movie.save((error, result) => {
    //     if (error) res.json(error);
    //     res.json(result);
    // });

    //===================  promise yapısı ile =======================//
    const movie = new Movie(req.body);
    const promise = movie.save();

    promise.then((data) => {
        res.json({status: 1});
    }).catch((err) => {
        res.json(err);
    });

});

/* PUT ReWrite One Movie. */
router.put('/:movie_id', (req, res, next) => {

    const promise = Movie.findByIdAndUpdate(
        req.params.movie_id,
        req.body,
        {
            new:true,
            lastUpdate:Date.now()
        }
    );

    promise.then((data) => {
        if (!data) next('The movie was not found for update');
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
