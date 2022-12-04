const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const movieValidation = require('../validations/createMovie')

router.get('/', moviesController.list);
router.get('/new', moviesController.new);
router.get('/recommended', moviesController.recomended);
router.get('/detail/:id', moviesController.detail);


//CRUD
router.get('/add', moviesController.add);
router.post('/create',movieValidation, moviesController.create);
router.get('/edit/:id', moviesController.edit);
router.put('/update/:id', moviesController.update);
router.get('/delete/:id', moviesController.delete);
router.delete('/delete/:id', moviesController.destroy);

module.exports = router;