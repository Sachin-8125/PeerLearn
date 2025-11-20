const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true 
  },
  topic: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  members: [{ 
    type: String 
  }], // Stores usernames currently in the room
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Group', GroupSchema);