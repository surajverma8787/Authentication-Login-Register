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
    const user = await User.findOne({ username });
    const validPass = await bcrypt.compare(password, user.password);
    if (validPass) {
        req.session.user_id = user._id;
        res.send('/secret');
    }
    else {
        res.send('/login');
    }

})
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    //Here 12 is number of salt rounds
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username,
        password: hash
    })
    await user.save();
    req.session.user_id = user._id;
    res.redirect("/");
})
app.get('/secret', (req, res) => {
    if (!req.session.user_id)
        res.redirect("/login");
    else
        res.send("Secret revealed");
})
app.listen(3000, () => {
    console.log("server started");
});