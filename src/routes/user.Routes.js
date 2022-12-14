const express = require("express");
const { express } = require("express");
const { user } = require();
const userRoutes = express();

// /RESTful  route declarations
userRoutes.get("/record", getRecord);
userRoutes.get("/record:id", getRecord);
userRoutes.post("/record", createRecord);
userRoutes.put("record:id", updateRecord);
userRoutes.delete("record/:id", deleteRecord);

async function getUsers(req, res) {
  const allRecords = await userRecords.findAll();
  res.json(allRecords);
}

async function createRecord(req, res) {
  // how to declare band name
  const bandName = req.body.bandName;
  const recordName = req.body.recordName;
  const record = await Record.create({
    bandName,
    recordName,
  });

  res.json(user);
}
async function getUser(req, res) {
  const id = req.params.id;
  const user = await User.FindOne({ where: { id: id } });
  if (user === null) {
    next();
  }
  res.json(user);
}

async function deleteUser(req, res) {
  const id = req.params.id;
  const user = await User.FindOne({ where: { id: id } });
  if (user === null) {
    next();
  }
  await user.destroy();
  res.json({});
}


async function upDateUser(req, res){
    const id = req.params.id;
    const user = await User.findOne({ where: {id:id}});
    if (user === null){
        next();
    }else{
        const username = req.body.username ?? user.username;
        const birthday = Date. parse(req.body.birthday ?? user.birthday);
        user.username =username;
        user.birthday = birthday;
    }
    user = await user.update()
    }
module.exports = {
  userRoutes,
};
