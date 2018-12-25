const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    trim: true
  },
  lastname: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    trim: true
  },
  picture: {
    type: String
  },
  bio: {
    type: String
  },
  contact: {
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    website: {
      type: String,
      trim: true
    }
  },
  living: {
    country: {
      type: String
    },
    city: {
      type: String
    }
  },
  socials: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    twitter: {
      type: String
    },

    linkedin: {
      type: String
    }
  },
  skills: [
    {
      skill: {
        type: String
      },
      years: {
        type: Number
      }
    }
  ],
  workexperience: [
    {
      position: {
        type: String
      },
      companyname: {
        type: Number
      },
      start: {
        month: {
          type: String
        },
        year: {
          type: String
        }
      },
      end: {
        month: {
          type: String
        },
        year: {
          type: String
        }
      }
    }
  ],
  lifeexperience: [
    {
      position: {
        type: String
      },
      companyname: {
        type: Number
      },
      start: {
        month: {
          type: String
        },
        year: {
          type: String
        }
      },
      end: {
        month: {
          type: String
        },
        year: {
          type: String
        }
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
