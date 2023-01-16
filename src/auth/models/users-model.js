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

    User.findLoggedIn = async (username, password) => {
        const user = await User.findOne({ where: { username } });
        if (user == null){
            return null;
        }
        if (await bcrypt.compare(password, user.password)){
            return user;
        }
        return null;
    };

    return User;
}

module.exports = { makeUser };