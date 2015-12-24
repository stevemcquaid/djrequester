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
mongoose.connect(process.env.MONGO_URI);


// Get models
var User = require('./app/models/user');

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
var publicRouter = express.Router();

// Define routes
publicRouter.route('/')
  .get(function(req, res) {
    res.render('pages/index');
  });

publicRouter.route('/users')
  .post(function(req, res) {
    console.log("Body: \n" + JSON.stringify(req.body));
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.phone = req.body.phone;

    user.save(function(err) {
      if(err) {
        res.status(422).send(err);
      }
      else {
        res.status(201).json({
          success: true,
          message: 'User Created!'
        });
      }
    });
  });

// Register routes
app.use('/', publicRouter);

// Start server
app.listen(port);
