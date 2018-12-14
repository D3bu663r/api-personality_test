const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: false,
        enum: ['admin', 'user'],
        default: 'user'
    }
});

schema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

function hash(user, next) {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
}

schema.pre('save', function (next) {
    if (!this.isModified('password')) return next();
    hash(this, next);
});

schema.pre('findOneAndUpdate', function (next) {
    if (!this._update.password) return next();
    hash(this._update, next);
});

module.exports = mongoose.model('user', schema);