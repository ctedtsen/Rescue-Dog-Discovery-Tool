const dbConnection = require('./mongoConnection');
const getCollectionFn = (collection) => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection.dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};
module.exports = {
  shelters: getCollectionFn('shelters'),
  dogs: getCollectionFn('dogs'),
  cats: getCollectionFn('cats'),
  users: getCollectionFn('users'),
  reviews: getCollectionFn('reviews')
};
