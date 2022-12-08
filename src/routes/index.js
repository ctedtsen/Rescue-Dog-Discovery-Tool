const sheltersRoutes = require('./shelters');
const petRoutes = require('./pets');
const path = require("path");

const constructorMethod = (app) => {
  app.use('/shelters', sheltersRoutes);
  app.use('/petdetails', petRoutes);
  app.use('/', (req, res) => {
    res.sendFile(path.resolve("static/about.html"));
  });

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;
