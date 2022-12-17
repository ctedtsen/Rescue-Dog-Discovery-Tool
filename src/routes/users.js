const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const helpers = require("../helpers");

router
  .route("/login")
  .get(async (req, res) => {
    let loggedIn = req.session.user;
    if(loggedIn){
      return res.redirect(loggedIn);
    }
    res.render("users/login", { title: "Login"});
    return;
  })
  .post(async (req, res) => {
    let usernameInput = req.body.usernameInput;
    let passwordInput = req.body.passwordInput;

    try {
      usernameInput = helpers.checkUsername(usernameInput.trim());
    } catch (e) {
      res.status(400).render("users/login", { title: "Login", error: e });
      return;
    }
    try {
      passwordInput = helpers.checkPassword(passwordInput);
    } catch (e) {
      res.status(400).render("users/login", { title: "Login", error: e });
      return;
    }

    try {
      let authenticatedUser = await userData.checkUser(
        usernameInput,
        passwordInput
      );
      if (authenticatedUser) {
        req.session.user = usernameInput;
        let user = await userData.findByUsername(usernameInput);
        req.session.admin = user.admin;
      } else {
        res.render("users/login", {
          title: "login",
          error: "Username or password invalid",
        });
        return;
      }
      return res.redirect("/");
    } catch (e) {
      res.status(404).render("users/login", { title: "login", error: e });
    }
  });

router
  .route("/register")
  .get(async (req, res) => {
    let loggedIn = req.session.user;
    if(loggedIn){
      return res.redirect('/');
    }
    res.render("users/register", { title: "Register"});
    return;
  })
  .post(async (req, res) => {
    let usernameInput = req.body.usernameInput;
    let passwordInput = req.body.passwordInput;
    let cityInput = req.body.cityInput;
    let stateInput = req.body.stateInput;

    try {
      usernameInput = helpers.checkUsername(usernameInput.trim());
    } catch (e) {
      res.status(400).render("users/register", { title: "Register", error: e });
      return;
    }
    try {
      passwordInput = helpers.checkPassword(passwordInput);
    } catch (e) {
      res.status(400).render("users/register", { title: "Register", error: e });
      return;
    }

    try {
      cityInput = helpers.checkString(cityInput, "cityInput");
    } catch (e) {
      res.status(400).render("users/register", { title: "Register", error: e });
      return;
    }

    try {
      stateInput = helpers.checkState(stateInput);
    } catch (e) {
      res.status(400).render("users/register", { title: "Register", error: e });
      return;
    }

    try {
      let userCreated = await userData.createUser(usernameInput, passwordInput, cityInput, stateInput, false, [], [], []);
      res.redirect("/users/login");
      return;
    } catch (e) {
      res.status(404).render("users/register", { title: "Register", error: e });
      return;
    }
  });

router.route("/logout").get(async (req, res) => {
    if(!req.session.user){
      return res.redirect('/');
    }
    req.session.destroy()
    res.render("users/logout", {titile: "Logout"});
    return;
});

router.get('/:username/saved_lists', async (req, res) => {
  let loggedIn = req.session.user;
  let username = req.params.username;
  if(!loggedIn){
    return res.redirect('/');
  }
  if(username.toLowerCase()!==loggedIn){
    return res.redirect('/');
  }
  let user;
  try{
      user = await userData.findByUsername(loggedIn);
  } catch(e) {
    res.redirect("/users/login");
    return;
  }  
  try{
      res.render('profile/saved', {title: "Saved Shelters and Pets", user: user});
  } catch(e) {
    res.redirect("/");
  }
});

router.get('/:username', async (req, res) => {
  let loggedIn = req.session.user;
  let isAdmin = req.session.admin;
  let username = req.params.username;
  if(!loggedIn){
    return res.redirect('/');
  }
  if(username.toLowerCase()!==loggedIn){
    return res.redirect('/');
  }
  let user;
  try{
      user = await userData.findByUsername(loggedIn);
  } catch(e) {
    res.redirect("/users/register");
    return;
  }  
  try{
      let username = loggedIn.toUpperCase();
      res.render('profile/index', {title: username, user: user, loggedIn: loggedIn,isAdmin: isAdmin});
  } catch(e) {
    res.redirect("/");
  }
});

router.post('/create-admin', async (req, res) => {
  let loggedIn = req.session.user;
  let isAdmin = req.session.admin;
  if(!isAdmin){
    return res.status(403).render('/users/forbiddenAccess');
  }
  let username = loggedIn.toUpperCase();
  let usernameInput = req.body.usernameInput;
  let passwordInput = req.body.passwordInput;
  let cityInput = req.body.cityInput;
  let stateInput = req.body.stateInput;
  let user;
  try{
      user = await userData.findByUsername(loggedIn);
  } catch(e) {
    res.redirect("/users/register");
    return;
  }  
  try {
    usernameInput = helpers.checkUsername(usernameInput.trim());
  } catch (e) {
    res.status(400).render("profile/index", { title: username, error: e, user: user, loggedIn: loggedIn, isAdmin: isAdmin });
    return;
  }
  try {
    passwordInput = helpers.checkPassword(passwordInput);
  } catch (e) {
    res.status(400).render("profile/index", { title: username, error: e, user: user,loggedIn: loggedIn, isAdmin: isAdmin });
    return;
  }

  try {
    cityInput = helpers.checkString(cityInput, "cityInput");
  } catch (e) {
    res.status(400).render("profile/index", { title: username, error: e, user: user, loggedIn: loggedIn, isAdmin: isAdmin });
    return;
  }

  try {
    stateInput = helpers.checkState(stateInput);
  } catch (e) {
    res.status(400).render("profile/index", { title: username, error: e, user: user, loggedIn: loggedIn, isAdmin: isAdmin });
    return;
  }

  try {
    let userCreated = await userData.createUser(usernameInput, passwordInput, cityInput, stateInput, true, [], [], []);
    res.render("profile/index", { title: username, user: user, loggedIn: loggedIn, isAdmin: isAdmin, message: "New Admin user was created!" });
    return;
  } catch (e) {
    res.status(400).render("profile/index", { title: username, error: e, user: user, loggedIn: loggedIn, isAdmin: isAdmin });
    return;
  }

})
module.exports = router;
