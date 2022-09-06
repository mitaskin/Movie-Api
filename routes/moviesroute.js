const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/MovieSchemaModel.js');

/*======================    SUB ROUTERS    ======================*/

/* GET List TOP10 Movies. */
router.get('/top10', (req, res) => {
    const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* GET List Start-End Day Movies. */
router.get('/between/:start_year/:end_year', (req, res) => {
    const {start_year, end_year} = req.params;

    const promise = Movie.find(
        {
            year: {"$gte": parseInt(start_year), "$lte": parseInt(end_year)}
        }
    ).sort({imdb_score: -1});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


/*======================    MAIN ROUTERS    ======================*/
/* GET List ALl Movies. */
router.get('/', (req, res) => {

    const promise = Movie.aggregate([
        {
            $lookup: {
                from: 'directors',
                localField: 'director_id',
                foreignField: '_id',
                as: 'director'
            }
        },
        {
            $unwind: '$director'
        }
    ]);

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
            new: true,
            lastUpdate: Date.now()
        }
    );

    promise.then((data) => {
        if (!data) next('The movie was not found for update');
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* DELETE One Movie. */
router.delete('/:movie_id', (req, res, next) => {

    const promise = Movie.findByIdAndRemove(req.params.movie_id);

    promise.then((data) => {
        if (!data) next('The movie was not found for delete');
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});


module.exports = router;
