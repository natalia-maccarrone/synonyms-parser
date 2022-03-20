"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WordNet = require('node-wordnet');
const express_1 = require("express");
const ParseController_1 = require("../controllers/ParseController");
const ParseService_1 = require("../services/ParseService");
const wordNet = new WordNet();
const parseService = new ParseService_1.ParseService(wordNet);
const parseController = new ParseController_1.ParseController(parseService);
const routes = (0, express_1.Router)();
routes.post('/parse', (req, res) => {
    parseController.parse(req, res);
});
exports.default = routes;
