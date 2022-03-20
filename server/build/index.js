"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const connection_1 = __importDefault(require("./db/config/connection"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: /(localhost(:[0-9]+)?)/ }));
app.use(express_1.default.json());
app.use(routes_1.default);
const port = process.env.PORT || 4000;
connection_1.default.authenticate()
    .then(() => console.log('Connected to database'))
    .catch(() => console.log('Error connecting to database'));
app.listen(port, () => console.log(`Listening on port: ${port}`));
