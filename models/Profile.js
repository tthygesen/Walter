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
        type: String
      }
    }
  ],
  workexperience: [
    {
      position: {
        type: String
      },
      company: {
        type: String
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
      },
      current: {
        type: Boolean
      }
    }
  ],
  educations: [
    {
      school: {
        type: String
      },
      country: {
        type: String
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
      },
      current: {
        type: Boolean
      }
    }
  ]
});

profileSchema.index({
  name: "text",
  lastname: "text",
  skills: "text"
});

module.exports = Profile = mongoose.model("profiles", profileSchema);
