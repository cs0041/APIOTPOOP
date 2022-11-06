"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import { Schema, model, connect } from 'mongoose'
var app = (0, express_1.default)();
var PORT = 5001;
var mongoose = require('mongoose');
// const cors = require('cors')
// app.use(cors())
mongoose.connect('mongodb://localhost/OTP');
var UserRouter = require('./api/User');
var bodyParser = require('express').json;
app.use(bodyParser());
app.use('/user', UserRouter);
app.listen(PORT, function () {
    console.log("Application started at http://localhost:".concat(PORT, "/"));
});
