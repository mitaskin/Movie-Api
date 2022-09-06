const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/DirectorSchemaModel');

/*======================    MAİN ROUTERS    ======================*/

/* POST Director */
router.post('/', (req, res, next) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    })
})

/* GET All Director */
router.get('/', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: 'bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* GET id Director */
router.get('/:director_id', (req, res, next) => {
    const promise = Director.aggregate([
        {
            $match: {
                '_id': mongoose.Types.ObjectId(req.params.director_id)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: '_id',
                foreignField: 'director_id',
                as: 'movies'
            }
        },
        {
            $unwind: {
                path: '$movies',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: {
                    _id: '$_id',
                    name: '$name',
                    surname: '$surname',
                    bio: 'bio'
                },
                movies: {
                    $push: '$movies'
                }
            }
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                surname: '$_id.surname',
                movies: '$movies'
            }
        }
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });


});

/* PUT ReWrite One Movie. */
router.put('/:director_id', (req, res, next) => {

    const promise = Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new: true,
            lastUpdate: Date.now()
        }
    );

    promise.then((data) => {
        if (!data) next('The director was not found for update');
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

/* DELETE One Director. */
router.delete('/:director_id', (req, res, next) => {

    const promise = Director.findByIdAndRemove(req.params.director_id);

    promise.then((data) => {
        if (!data) next('The director was not found for delete');
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

module.exports = router;
