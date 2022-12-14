// const { Sequelize, Model, DataTypes } = require('sequelize');

// const sequelize = new Sequelize('sqlite::memory:')

// const Record = sequelize.define('Record', {
//     bandName: DataTypes.STRING,
//     recordName: DataTypes.STRING,
// });


// async function makeUser(sequelize){
//     return sequelize.define('User', {
//         user
//     })
// }

// async function main(){
//     await sequelize.sync();
//     await Record.create({
//         bandName: 'Tom Waits',
//         recordName: 'Alice'
//     })
//         console.log(await Record.findAll());
// }
// // async function main() {
// //     const jane = await user.create({
// //         username: 'janedoe',
// //         birthday: new Date(1980, 6, 20),
// //     })
// // } 

// main();

const { DataTypes } = require('sequelize');

function record(){
    return sequelize.define('Record', {
        bandName: DataTypes.STRING,
        album: DataTypes.STRING
    })

}

module.exports ={
    user,
}