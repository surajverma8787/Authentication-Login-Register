const express = require('express');
const app = express();
const User = require("./models/user");

app.set('view engine', 'ejs');
app.get("/register", (req, res) => {
    res.render('register');
})
app.get('/secret', (req, res) => {
    res.send("Secret revealed");
})
app.listen(3000, () => {
    console.log("server started");
});