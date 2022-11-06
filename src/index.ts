import express, { Application, Request, Response } from 'express'
// import { Schema, model, connect } from 'mongoose'
const app: Application = express()
const PORT: number = 5001
const mongoose = require('mongoose')
// const cors = require('cors')

// app.use(cors())
mongoose.connect('mongodb://localhost/OTP')
const APIRouter = require('./APIRouter')

const bodyParser = require('express').json
app.use(bodyParser())

app.use('/user', APIRouter)

app.listen(PORT, () => {
  console.log(`Application started at http://localhost:${PORT}/`)
})
