const express =  require('express');
const routes = require('./controllers');
const sequelize =  require('./config/connection');
const path = require('path');

const helpers = require('./utils/helpers');

require('dotenv').config();

// implement express session (cookies)
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',//process.env.DB_SECRET
    // session timeout after 5 min of inactivity
    cookie: { maxAge: 3000000 },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// configure handlebars.js as template engine of choice
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// session initiation
app.use(session(sess));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});