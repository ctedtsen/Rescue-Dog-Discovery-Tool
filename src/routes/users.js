const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;
const helpers = require("../helpers");

router
  .route("/login")
  .get(async (req, res) => {
    let loggedIn = helpers.isAuthenticated(req);
    if (req.session.user) {
      res.redirect(loggedIn);
      return;
    }
    //let loggedIn = helpers.isAuthenticated(req);
    res.render("users/login", { title: "Login", loggedIn:loggedIn });
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
    if (req.session.user) {
      res.redirect("/");
      return;
    }
    let loggedIn = helpers.isAuthenticated(req);
    res.render("users/register", { title: "Register" , loggedIn: loggedIn});
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
    req.session.destroy()
    res.render("users/logout", {titile: "Logout"});
    return;
  });

router.get('/:username', async (req, res) => {
  if (!req.session.user) {
    res.redirect("login");
    return;
  }
  let loggedIn = helpers.isAuthenticated(req);
  let user;
  try{
      user = await userData.findByUsername(loggedIn);
  } catch(e) {
    res.redirect("/");
  }  
  try{
      let username = loggedIn.toUpperCase();
      res.render('profile/index', {title: username, user: user});
  } catch(e) {
    res.redirect("/");
  }
});
module.exports = router;
