const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  photo: {
    type: String
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
      type: String,
      trim: true
    },
    city: {
      type: String,
      trim: true
    }
  },
  socials: {
    facebook: {
      type: String,
      trim: true
    },
    instagram: {
      type: String,
      trim: true
    },
    twitter: {
      type: String,
      trim: true
    },

    linkedin: {
      type: String,
      trim: true
    }
  },
  skills: [
    {
      skill: {
        type: String,
        lowercase: true,
        trim: true
      },
      years: {
        type: String,
        trim: true
      }
    }
  ],
  workexperience: [
    {
      position: {
        type: String,
        trim: true
      },
      company: {
        type: String,
        trim: true
      },
      start: {
        month: {
          type: String,
          trim: true
        },
        year: {
          type: String,
          trim: true
        }
      },
      end: {
        month: {
          type: String,
          trim: true
        },
        year: {
          type: String,
          trim: true
        }
      },
      current: {
        type: Boolean
      }
    }
  ],
  educations: [
    {
      school: {
        type: String,
        trim: true
      },
      country: {
        type: String,
        trim: true
      },
      start: {
        month: {
          type: String,
          trim: true
        },
        year: {
          type: String,
          trim: true
        }
      },
      end: {
        month: {
          type: String,
          trim: true
        },
        year: {
          type: String,
          trim: true
        }
      },
      current: {
        type: Boolean
      }
    }
  ]
});

profileSchema.index({
  name: "text",
  lastname: "text"
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
