const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const User = require("./models/user");
const bcrypt = require("bcrypt");
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
        res.send("Welcome!");
    }
    else {
        res.send("Incorrect Username or Password");
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
    res.redirect("/");
})
app.get('/secret', (req, res) => {
    res.send("Secret revealed");
})
app.listen(3000, () => {
    console.log("server started");
});