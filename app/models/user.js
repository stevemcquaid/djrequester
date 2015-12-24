var mongoose = require('mongoose');
var validate = require('mongoose-validator');
var Schema   = mongoose.Schema;

var emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Please enter a valid email address'
  })
];

var passwordValidator = [
  validate({
    validator: 'isLength',
    arguments: [8, 30],
    message: 'Password must be between {ARGS[0]} and {ARGS[1]} characters'
  })
];

var phoneValidator = [
  validate({
    validator: 'isMobilePhone',
    arguments: 'en-US',
    messages: 'Please enter a valid US phone number'
  })
]

var UserSchema = new Schema({
  email: {type: String, required: [true, 'Email cannot be blank'], validate: emailValidator},
  password: {type: String, required: [true, 'Password cannot be blank'], validate: passwordValidator},
  phone: {type: String, required: false, validate: phoneValidator},
  name: {type: String, required: true}
});

module.exports = mongoose.model('User', UserSchema);
