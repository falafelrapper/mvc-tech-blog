const path = require('path'); // file and directory 
const express = require('express'); // express frame work
const session = require('express-session'); // manages user's sessions
const exphbs = require('express-handlebars'); // handlebars templating engine
const routes = require('./controllers'); // imports routes 
const helpers = require('./utils/helpers'); // util functions

const sequelize = require('./config/connection'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3001;

// Session configuartion 
const sess = {

    secret: 'Super secret secret',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })

  };

// Use session middleware
app.use(session(sess));

// Handlebars setup
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware for parsing JSON and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for serving static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the './controllers' directory
app.use(routes);

// Synchronize Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    
    // Start the Express server and listen on the specified port
    app.listen(PORT, () => console.log('Now listening'));

});