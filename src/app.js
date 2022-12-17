const express = require('express');
const session = require('express-session');
const app = express();
const static = express.static(__dirname + '/public');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use;
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.",
    saveUninitialized: false,
    resave: false,
  })
);

app.use('/shelters/add', async (req, res, next) => {
  if(!req.session.admin){
    res.status(403).render('users/forbiddenAccess');
    return;
  }
  next();
});

app.use('/shelters/remove', async (req, res, next) => {
  if(!req.session.admin){
    res.status(403).render('users/forbiddenAccess');
    return;
  }
  next();
});

app.use('/shelters/:id/add_pet', async (req, res, next) => {
  if(!req.session.admin){
    res.status(403).render('users/forbiddenAccess');
    return;
  }
  next();
});

app.use('/shelters/:id/delete_pet', async (req, res, next) => {
  if(!req.session.admin){
    res.status(403).render('users/forbiddenAccess');
    return;
  }
  next();
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});