// const e = require("express");
const express = require("express");

const { Record } = require("../models/index");

const recordRoutes = express.Router();

// /RESTful  route declarations

// URL
// REST declarations
recordRoutes.get("/record", getRecords);
recordRoutes.get("/record/:id", getRecord);
recordRoutes.post("/record", createRecord);
recordRoutes.put("/record/:id", updateRecord);
recordRoutes.delete("/record/:id", deleteRecord);

async function getRecords(_, res) {
  const allRecords = await Record.findAll();
  res.json(allRecords);
}

async function getRecord(req, res, next) {
  const id = req.params.id;
  const record = await Record.findOne({ where: { id: id } });
  if (record === null) {
    next();
  }
  res.json(record);
}

async function createRecord(req, res) {
  // how to declare band name
  const bandName = req.body.bandName;
  const recordName = req.body.recordName;
  const record = await Record.create({
    bandName,
    recordName,
  });
  res.json(record);
}


async function deleteRecord(req, res, next) {
  const id = req.params.id;
  const record = await Record.findOne({ where: { id: id } });
  if (record === null) {
    next();
  } else {
    await Record.destroy({ where: { id } });
    res.json({});
  }
}

async function updateRecord(req, res) {
  const id = req.params.id;
  let record = await Record.findOne({ where: { id } });
  if (record === null) {
    next();
  } else {
    const bandName = req.body.bandName ?? record.bandName;
    const recordName = req.body.recordName ?? record.recordName;

    let updatedRecord = {
      bandName,
      recordName,
    };
    record = await record.update(updatedRecord);
    res.status(200).json(record);
  }

}

module.exports = {
  recordRoutes,
};
