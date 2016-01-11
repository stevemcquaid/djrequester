var mongoose              = require('mongoose'),
    uniqueValidator       = require('mongoose-unique-validator'),
    bcrypt                = require('bcrypt'),
    validate              = require('mongoose-validator'),
    Schema                = mongoose.Schema; 

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
  email: {type: String, required: [true, 'Email cannot be blank'], unique: true, validate: emailValidator},
  password: {type: String, required: [true, 'Password cannot be blank'], validate: passwordValidator},
  phone: {type: String, required: false, validate: phoneValidator},
  name: {type: String, required: true}
});

// Apply the uniqueValidator plugin to userSchema.
UserSchema.plugin(uniqueValidator, { message: '{PATH} already exists. Please choose another.' });

// UserSchema.pre('save', function(next) {
//   var user = this;
//   user.password = user.password ? user.password : '';
// 
//   if (!user.isModified('password')) return next();
// 
//   bcrypt.genSalt(process.env.SALT_WORK_FACTOR, function(err, salt){
//     
//     if(err) return next(err);
// 
//     bcrypt.hash(user.password, salt, function(err, hash) {
//       
//       if(err) return next(err);
//       user.password = hash;
//       next();
// 
//     });
//   });
// });

module.exports = mongoose.model('User', UserSchema);
