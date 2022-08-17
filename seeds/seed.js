const sequelize = require('../config/connection');
const { User, Service, User_Subscription } = require('../models');

const userSeedData = require('./userSeedData.json');
const serviceData = require('./serviceData.json');
const subscriptionData = require('./subscriptionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });

  await Service.bulkCreate(serviceData, {
    individualHooks: true,
    returning: true,
  });
  await User_Subscription.bulkCreate(subscriptionData, {
    individualHooks: true,
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
