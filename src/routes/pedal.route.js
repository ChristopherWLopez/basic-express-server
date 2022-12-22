// const e = require("express");
const express = require("express");

const { Pedal, Style } = require("../models/index");

const pedalRoutes = express.Router();

// /RESTful  route declarations

// URL

pedalRoutes.get("/pedal", getPedals);
pedalRoutes.get("/pedal/:id", getPedal);
pedalRoutes.post("/pedal", createPedal);
pedalRoutes.put("/pedal/:id", updatePedal);
pedalRoutes.delete("/pedal/:id", deletePedal);

async function getPedals(_, res) {
  const allPedals = await Pedal.findAll();
  res.json(allPedals);
}

async function getPedal(req, res, next) {
  const id = req.params.id;
  const pedal = await Pedal.findOne({ where: { id: id }, include: Style });
  if (pedal === null) {
    next();
  }
  res.json(pedal);
}

async function createPedal(req, res) {
  // how to declare band name
  const pedalType = req.body.pedalType;
  const pedalName = req.body.pedalName;
  const pedal = await Pedal.create({
    pedalType,
    pedalName,
  });
  
  const styles  = req.body.style ?? [];
  for (const name of styles){
    await style.createStle({name});
  }

  res.json(pedal);
}


async function deletePedal(req, res, next) {
  const id = req.params.id;
  const pedal = await Pedal.findOne({ where: { id: id } });
  if (pedal === null) {
    next();
  } else {
    await Pedal.destroy({ where: { id } });
    res.json({});
  }
}

async function updatePedal(req, res) {
  const id = req.params.id;
  let pedal = await Pedal.findOne({ where: { id } });
  if (pedal === null) {
    next();
  } else {
    const pedalType = req.body.pedalType ?? pedal.pedalType;
    const pedalName = req.body.pedalName ?? pedal.pedalName;

    let updatedPedal = {
      pedalType,
      pedalName,
    };
    pedal = await pedal.update(updatedPedal);
    res.status(200).json(pedal);
  }
}

module.exports = {
   pedalRoutes
};
