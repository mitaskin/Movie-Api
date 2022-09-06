const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../app');
const {TokenExpiredError} = require("jsonwebtoken");

chai.use(chaiHttp);

let token, movieId;

describe('----> /api/movies TEST <----', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'testUser', password: 'testPassword'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('----> /GET movies <----', () => {
        it('should GET all movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                })
        });

    });

    describe('----> /POST movie <----', () => {
        it('should POST a movie', (done) => {
            const movie = {
                title: 'Test Title',
                director_id: '631710258b98482d23fe1b0a',
                category: 'Test Category',
                country: 'Test Country',
                year: 2022,
                imdb_score: 10
            }

            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();

                });
        });
    });

    describe('----> /GET/:movie.id <----', () => {
        it('should GET a movie by the given id', (done) => {
            chai.request(server)
                .get('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

    describe('----> /PUT/:movie.id <----', () => {
        it('should UPDATE a movie given by id', (done) => {
            const movie = {
                title: 'Test Title Update',
                director_id: '631710258b98482d23fe1b0a',
                category: 'Test Category',
                country: 'Test Country',
                year: 2021,
                imdb_score: 9
            }

            chai.request(server)
                .put('/api/movies/' + movieId)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });
    });

    describe('----> /DELETE/:movie.id <----', () => {
        it('should DELETE a movie given by id', (done) => {
            chai.request(server)
                .put('/api/movies/' + movieId)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });
    });

});