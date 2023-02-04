
const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

const COMPLEXITY = process.env.COMPLEXITY ?? 5;

function makeUser(sequelize) {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  })

  User.createWithHashed = async (username, password, role) => {
    try {
      password = await bcrypt.hash(password, COMPLEXITY);
      // console.log("Creating New User", username, password);
      // const user = await User.create({ username, password })
      return await AuthUser.create({ username, password, role });
    } catch (e) {
      console.error(e);
    }
    // return user;
  };

  User.findLoggedIn = async (username, password) => {
    try{
    const user = await User.findOne({ where: { username } });
    if (user == null) {
      return null;
    }
    const matches = await bcrypt.compare(password, user.password)
    return matches ? user: null
} catch (e) {
    console.warn(`error finding logged in`,e)
    return null
    }
}
return User;
}
//     }
//     if (await bcrypt.compare(password, user.password)) {
//       return user;
//     }
//     return null;
//   };
=======
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const COMPLEXITY = 5;

function makeUser(sequelize){
    // making a user table
    const User = sequelize.define('User', {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
    });


    User.createWithHashed = async (username, password) => {
        password = await bcrypt.hash(password, COMPLEXITY);
        console.log("Creating New User", username, password);
        const user = await User.create({ username, password })
        return user;
    };




module.exports = { makeUser };
