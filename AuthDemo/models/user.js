const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Need Username']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty']
    }
})

userSchema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    if (isValid)
        return foundUser;
    else
        return false;
}

userSchema.pre('save', async function (next) {

    if (this.isModified('password'))
        this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userSchema);