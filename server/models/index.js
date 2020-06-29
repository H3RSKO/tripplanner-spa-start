const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost/tripplanner', {
  logging: false
});

const Place = db.define("place", {
  address: {
    type: Sequelize.STRING,
  },
  city:{
    type: Sequelize.STRING,
  },
  state: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT), //stores longtitude & latitude
  }
})

const Hotel = db.define("hotel", {
  name:{
    type: Sequelize.STRING,
  },

  num_stars: {
    type: Sequelize.FLOAT,
    validations: {
      min: 1.0,
      max: 5.0
    }
  },

  amenities: {
    type: Sequelize.STRING
  }
})

const Activity = db.define("activity", {
  name: {
    type: Sequelize.STRING,
  },
  age_range:{
    type: Sequelize.STRING,
  }
})

const Restaurant = db.define("restaurant", {
  name: {
    type: Sequelize.STRING,
  },
  cuise: {
    type: Sequelize.STRING,
  },
  price: {
    type: Sequelize.INTEGER,
    validations: {
      min: 1,
      max: 5
    }
  }
})

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
  db,
  Hotel,
  Activity,
  Restaurant,
  Place
};



