var express         = require('express'),
    mongoose        = require('mongoose'),
    app             = express();

var passport        = require('passport'),
    bodyParser      = require('body-parser'),
    LocalStrategy   = require('passport-local'),  // returns a constructor function, so we capitalize this variable
    passportLocalMongoose   = require('passport-local-mongoose');

var User            = require('./models/user');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/authDemoDB', { useMongoClient: true })

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
  secret: "Pressure makes diamonds",  // for encoding and decoding
  resave: false,
  saveUninitialized:  false
}))

// PASSPORT CONFIG
app.use(passport.initialize())
app.use(passport.session())
// from passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// ============
//    ROUTES
// ============

// HOME ROUTE
app.get('/', function (req, res) {
  res.render('home')
})

// SECRET ROUTE
app.get('/secret', isLoggedIn, function (req, res) {
  res.render('secret')
})

// AUTH ROUTES
// show sign up form
app.get('/register', function(req, res){
  res.render('register')
})

// handling user sign up
app.post('/register', function (req, res){
  // res.send("Testing form gets us here to /POST route!!!")
  // bodyParser to get req.body data
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if(err){
      console.log(err)
      alert('ERR')
      return res.render('register')
    }
    passport.authenticate('local')(req, res, function(){
      // using local strategy to login
      res.redirect('/secret')
    })
  })
})

// LOGIN ROUTES
// render login Form
app.get('/login', function(req, res){
  res.render('login')
})
// login logic
// middleware compares input to database and redirect
app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}), function(req, res){
})

app.get('/logout', function(req, res){
  req.logout()
  res.redirect('/')
})

// middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  res.redirect("/login")
}

// LISTEN ON PORT
var port = process.env.PORT | 3000
app.listen(port, process.env.IP, function () {
  console.log('The server is running.')
})
