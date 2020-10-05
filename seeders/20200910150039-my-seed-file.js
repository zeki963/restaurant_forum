'use strict';
const bcrypt = require('bcryptjs')
const faker = require('faker')

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      email: 'root@example.com',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
      isAdmin: true,
      image: "https://free-icon-rainbow.com/i/icon_04447/icon_044470_256.jpg",
      name: "root",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', bcrypt.genSaltSync(10), null),
      isAdmin: false,
      image: "https://free-icon-rainbow.com/i/icon_04447/icon_044470_256.jpg",
      name: "user",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

    queryInterface.bulkInsert('Categories',
      ['中式料理', '日本料理', '義大利料理', '墨西哥料理', '素食料理', '美式料理', '複合式料理']
        .map((item, index) =>
          ({
            id: index + 1,
            name: item,
            createdAt: new Date(),
            updatedAt: new Date()
          })
        ), {})

    // generate restaurant seed data
    queryInterface.bulkInsert('Restaurants',
      Array.from({ length: 50 }).map((d, i) =>
        ({
          id: i + 1,
          name: faker.company.companyName(),
          tel: faker.phone.phoneNumber(),
          address: faker.address.streetAddress(),
          opening_hours: '08:00',
          // image: faker.image.imageUrl(),
          //image: `https://loremflickr.com/320/240/restaurant,food/?random=${Math.random() * 100}`,
          image: `https://icon-library.com/images/fast-food-icon/fast-food-icon-1.jpg`,
          description: faker.lorem.text(),
          createdAt: new Date(),
          updatedAt: new Date(),
          CategoryId: Math.floor(Math.random() * 5) + 1
        })
      ), {})

    // generate comment seed data
    return queryInterface.bulkInsert('Comments',
      [...Array(150)].map((item, index) => index).map(i =>
        ({
          id: i + 1,
          text: faker.lorem.sentence(),
          UserId: Math.floor(Math.random() * 3) + 1,
          RestaurantId: i % 50 + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        })
      ), {})
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
    queryInterface.bulkDelete('Categories', null, {});
    return queryInterface.bulkDelete('Restaurants', null, {});
  }
};
