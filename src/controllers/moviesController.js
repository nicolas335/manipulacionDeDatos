const { response } = require('express');
const db = require('../database/models');
const sequelize = db.sequelize;
const { validationResult } = require('express-validator');


//Otra forma de llamar a los modelos
const Movies = db.Movie;

const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    }, 
    add: function (req, res) {
        db.Genre.findAll()
        .then(genres => {
            return res.render('moviesAdd',{genres}) 
        })
    },
    create: (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
        db.Movie.create({
            title: req.body.title,
            rating: +req.body.rating,
            awards: +req.body.awards,
            release_date: Date(req.body.release_date),
            length: +req.body.length,
            genre_id: +req.body.genre,
            created_at: new Date,
            update_at: new Date
        })
        .then(movie => {
            //return res.send(movie)
            res.redirect('/movies')
        })
    } else {
        res.render('moviesAdd', {errors})
    }
    },
    edit: function(req, res) {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesEdit', {Movie:movie});
            })
            .catch(error => res.send(error))
    },
    update: function (req,res) {
        let idParams = +req.params.id
        
        db.Movie.update({
            title: req.body.title,
            rating: +req.body.rating,
            awards: +req.body.awards,
            release_date: req.body.release_date,
            length: +req.body.length
        },{
            where:{id:idParams}
        })
        .then(pelicula => {
            res.redirect(`/movies/detail/${idParams}`)
        })
        .catch(errors => res.sens(errors))
    

    },
    delete: function (req, res) {
        let idParams = +req.params.id

        db.Movie.findOne({
            where: {id:idParams}
        })
        .then(movie => {
            res.render('moviesDelete',{Movie:movie})
        })
    },
    destroy: function (req, res) {
        let idParams = +req.params.id

        db.Movie.destroy({
            where:{id:idParams}
        })
        .then(pelicula => {
            res.redirect('/movies')
        })
    }

}

module.exports = moviesController;