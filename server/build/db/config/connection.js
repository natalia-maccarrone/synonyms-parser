"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Analysis_1 = __importDefault(require("../models/Analysis"));
const sequelize = new sequelize_typescript_1.Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    dialect: 'mysql',
    logging: false
});
sequelize.addModels([Analysis_1.default]);
exports.default = sequelize;
