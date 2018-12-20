const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId
  },
  name: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  contact: {
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      lowercase: true,
      trim: true
    }
  },
  living: {
    country: {
      type: String
    },
    city: {
      type: String
    },
    address: {
      type: String
    },
    postalcode: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
