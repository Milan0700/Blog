const mongoose = require("mongoose");

async function connectMongo(url) {
  return mongoose.connect(url).then(() => {
    console.log("mongodb connected");
  });
}

module.exports = { connectMongo };
