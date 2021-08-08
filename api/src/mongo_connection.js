const { MongoClient } = require("mongodb");
require('dotenv').config()

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:27017`;

const client = new MongoClient(uri);

module.exports = client;
