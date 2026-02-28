const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust2';

main().then(() => {
    console.log("connect successfully");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});
  initData.data =  initData.data.map((obj) => ({...obj, owner: '699d44b9e48f947b02d8601d'}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();
