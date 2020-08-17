const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db'); // Code to connect database found here
const methodOverride = require('method-override')
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session); // Need session middlware and pass it to this varaible
// Load the configurations (variables), which you can can find at the specified path
dotenv.config({ path: './config/config.env'});

// Passport config
require('./config/passport')(passport);

// Connect the database
connectDB()

// Creating the server and port the server's running on
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// Body Parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Method override
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
)

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
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

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));
app.use('/user', require('./routes/user'));


// Run the server (npm run dev or start)
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));