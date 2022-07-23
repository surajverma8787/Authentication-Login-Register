const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
const session = require("express-session");

mongoose.connect('mongodb://localhost:27017/authD')
    .then(() => {
        console.log("Mongo connection created");
    })
    .catch((err) => {
        console.log("Mongo Connection Failed");
        console.log(err);
    })

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        // console.log("Secret");
        res.redirect("/login");
    }
    else
        next();
}

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "A good Secret" }));

app.get("/register", (req, res) => {
    res.render('register');
})

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        console.log(foundUser);
        req.session.user_id = foundUser._id;
        res.redirect("/secret");
    }
    else {
        res.send('/login');
    }

})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/");
})

app.post('/logout', (req, res) => {
    req.session.user_id = null;
    res.redirect('/login');
})

app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

app.listen(3000, () => {
    console.log("server started");
});