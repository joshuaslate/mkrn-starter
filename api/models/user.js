const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;

const Schema = mongoose.Schema;

//= ===============================
// User Schema
//= ===============================
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true },
  },
  role: {
    type: String,
    enum: Object.keys(ROLES).map(key => ROLES[key]),
    default: ROLES.USER,
  },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  billing: {
    customerId: { type: String },
    subscriptionId: { type: String },
    plan: { type: String },
    nextPaymentDue: { type: Date },
  },
  deactivated: { type: Boolean, default: false },
},
{
  timestamps: true,
  toObject: {
    virtuals: true,
  },
  toJSON: {
    virtuals: true,
  },
});

UserSchema.virtual('fullName').get(function virtualFullName() {
  return `${this.name.first} ${this.name.last}`;
});

//= ===============================
// User model hooks
//= ===============================
async function hashPassword(next) {
  const user = this;

  if (user && user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(5);
      user.password = await bcrypt.hash(user.password, salt, null);
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
}

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', hashPassword);
UserSchema.pre('update', hashPassword);

//= ===============================
// User model methods
//= ===============================
// Method to compare password for login
UserSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model('User', UserSchema);
