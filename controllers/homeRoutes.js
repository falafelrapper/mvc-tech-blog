const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// route for the hompage which will display the homepage handlebars
// Originally we were going to display some recipes on the hompage but ended up not using them

router.get('/', async (req, res) => {
    try {
        // const recipeData = await Recipe.findAll({
        //     include: [
        //         {
        //             model: User,
        //             attributes: ['name'],
        //         },
        //         {
        //             model: Category,
        //             attributes: ['name'],
        //         },
        //     ],
        // });


        // const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));

        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for the recipes page
// Returns recipes with thier associated Users with names and ids, and category
router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });

        // map is needed to 
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('posts', {
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for a single recipe based on id, also includes the associated user with name and id to make a link, and category
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name', 'id'],
                },
            ],
        });

        const post = postData.get({ plain: true });

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for a single user based on id
// Only returns the associated recipes since the information displayed on the page is limited
router.get('/users/:id', async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Post
                }
            ],
        });

        const user = userData.get({ plain: true });

        res.render('user', {
            ...user,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for the profile of the currently logged in user
// Requires the user to be logged in to view, withAuth will redirect the user to the login otherwise
// Returns the associated recipes only since the information displayed on this page is limited
// Uses session id to find the currently logged in user
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }]
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route for the login, will redirect the user to thier profile is already logged in
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

// Route for the signup, will redirect the user to thier profile if already logged in
router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('signup');
});

module.exports = router;
