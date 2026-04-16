const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },

  
  level: {
    type: Number,
    default: 1
  },
  exp: {
    type: Number,
    default: 0
  },

  assets: {
    money: {
      type: Number,
      default: 0.00
    },
    goldbar: {
      type: Number,
      default: 0
    }
  },

  
  health: {
    type: Number,
    default: 100
  },
  happiness: {
    type: Number,
    default: 100
  },


  foodexpense: {
    type: Number,
    default: 1
  },
  leisurelife: {
    type: Number,
    default: 1
  },
  
  property: {
    id: {
      type: String,
      default: "none",
    },
    price: {
      purchased: {
        type: Number,
        default: 0
      },
      current: {
        type: Number,
        default: 0
      }
    }
  },
  
  accountbook: {
    currentvalue: {
      type: Number,
      default: 0
    },
    profitloss: {
      type: Number,
      default: 0
    }
  }
});

module.exports = mongoose.model('user', userSchema);