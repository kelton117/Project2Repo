const express = require('express');
const recipesRouter = express.Router();
const Recipe = require('../models/recipe');


//INDEX
recipesRouter.get('/recipes', async (req, res) => {
    // await Recipe.deleteMany({});
    Recipe.find({}, (err, foundRecipes) => {
        res.render('index.ejs', {
            recipes: foundRecipes
        });
    });
});

//NEW
recipesRouter.get('/new', (req, res) => {
    Recipe.find({}, (err, foundRecipes) => {
        res.render('new.ejs', {
            recipes: foundRecipes
        });
        
    });
});

//DELETE
recipesRouter.delete('/:id/delete', (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, (err, deletedRecipe) => {
        res.json(deletedRecipe)
    });
});

//UPDATE
recipesRouter.put('/:id', (req, res) => {
    req.body.completed = !!req.body.completed;
    Recipe.findByIdAndUpdate(req.params.id, req.body, (err, recipe) => {
        console.log(req.params.id)
        res.redirect(`/recipes/${req.params.id}`)
    });
});

//CREATE
recipesRouter.post('/recipes', (req, res) => {
    console.log(req.body)
    req.body.completed = !!req.body.completed;
    Recipe.create(req.body, (error, createdRecipe) => {
        res.redirect('/recipes');
    });
});

//EDIT
recipesRouter.get('/:id/edit', (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render('edit.ejs', { recipe });
    });
});

//SHOW
recipesRouter.get('/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id)
        res.render('show.ejs', { recipe })
    } catch (error) {
        console.log(error.message)
    }
});

module.exports = recipesRouter;