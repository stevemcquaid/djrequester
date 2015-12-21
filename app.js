// Call the packages we need
var express         = require('express'),
    bodyParser      = require('body-parser'),
    path            = require('path'),
    mongoose        = require('mongoose'),
    morgan          = require('morgan');

// Initialize Express
var app = express();
var port = process.env.port || 8080;

// Connect to database
// mongoose.connect(process.env.MONGOLAB_URI);

// Set views path and use EJS as templating engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// Serve static assets from public directory
app.use(express.static('public'));


// Configure app to use bodyParser
// This will let us get data from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use morgan to log requests
app.use(morgan('dev'));

// Setup router
var router = express.Router();

// Define routes
router.route('/')
  .get(function(req, res) {
    res.render('pages/index');
  });

// Register routes
app.use('/', router);

// Start server
app.listen(port);
