// Foundation for future authentication features
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  email: { 
    type: String 
  },
  academicInterests: [{ 
    type: String 
  }], // e.g., ['Python', 'Data Science']
  joinedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('User', UserSchema);