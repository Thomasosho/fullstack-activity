// const express = require('express')
// const sql = require('./db')
import express from "express";
import sql from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3000;
const data = [
  { id: "1", task: "Take a bath", is_completed: true },
  { id: "2", task: "Eatttttt", is_completed: false },
  { id: "3", task: "Eas some more", is_completed: false },
  { id: "4", task: "Rest", is_completed: true },
];

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the todo list backend");
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/secret", (req, res) => {
  res.status(403).end();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
