const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ROLES = require('../constants').ROLES;
const bitcoin = require('../utils/bitcoin-utils.js');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

autoIncrement.initialize(mongoose);


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
  customerId: { type: String, required: true, default: 0 },
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
  bitcoin: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  billing: {
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
UserSchema.plugin(autoIncrement.plugin, 'customerId');

// Pre-save of user to database, hash password if password is modified or new
UserSchema.pre('save', async function hashPassword(next) {
  const user = this;
  if (user && user.isModified('password')) {
    try {
      // counter.findByIdAndUpdateAsync({
      //   email: user.email },
      // { $inc: { seq: 1 } },
      // { new: true, upsert: true,
      // }).then((count) => {
      //   console.log(`...count: ${JSON.stringify(count)}`);
      //   user.sort = count.seq;
      //   next();
      // })
      //   .catch((error) => {
      //     console.error(`counter error-> : ${error}`);
      //     throw error;
      //   });

      const salt = await bcrypt.genSalt(5);
      console.log('user: ', user);
      user.bitcoin = await bitcoin.getDeposit(user._id);
      user.password = await bcrypt.hash(user.password, salt, null);
      return next();
    } catch (err) {
      return next(err);
    }
  } else {
    return next();
  }
});

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
