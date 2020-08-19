const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // Need session middlware and pass it to this varaible
const connectDB = require('./config/db'); // Code to connect database found here

// Load the configurations (variables), which you can can find at the specified path
dotenv.config({ path: './config/config.env'});

// Passport config
require('./config/passport')(passport);

// Connect the database
connectDB()

// Creating the server and port the server's running on
const app = express();

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', '.hbs')

// Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false, // dont want to save a session if nothing is modified
    saveUninitialized: false, // dont create a session until something is stored
    store: new MongoStore({mongooseConnection: mongoose.connection})
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')))




// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'));
app.use('/home', require('./routes/home'));



const PORT = process.env.PORT || 5000;

// Run the server (npm run dev or start)
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
