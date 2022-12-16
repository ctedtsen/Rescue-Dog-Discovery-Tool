const sheltersRoutes = require('./shelters');
const petRoutes = require('./pets');
const userRoutes = require('./users');

const constructorMethod = (app) => {
  app.use('/shelters', sheltersRoutes);
  app.use('/petdetails', petRoutes);
  app.use('/users', userRoutes);
  app.use('/', (req, res) => {
    let loggedIn = false;
    if(req.session.user){
      loggedIn = true;
    }
    res.render('about', {title: 'Home', loggedIn: loggedIn});
    return;
  })
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;
