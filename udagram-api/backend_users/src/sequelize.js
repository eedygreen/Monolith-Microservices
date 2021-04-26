"use strict";
exports.__esModule = true;
exports.sequelize = void 0;
var sequelize_typescript_1 = require("sequelize-typescript");
var config_1 = require("./config/config");
var c = config_1.config;
// Instantiate new Sequelize instance!
exports.sequelize = new sequelize_typescript_1.Sequelize({
    "username": c.username,
    "password": c.password,
    "database": c.database,
    "host": c.host,
    dialect: 'postgres',
    storage: ':memory:'
});
