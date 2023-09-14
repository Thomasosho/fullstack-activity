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

app.get("/api/todos", async (req, res) => {
  const todos = await sql`SELECT * FROM todos`
  console.log(todos)
  if (todos) {
    res.status(200).send(todos)
  } else {
    res.status(404).send("Error here!")
  }
});

app.get("/api/deyPlay", async (req, res) => {
  const todos = await sql`SELECT * FROM deyplay`
  console.log(todos)
  if (todos) {
    res.status(200).send(todos)
  } else {
    res.status(404).send("Error here!")
  }
});

// app.get("/api/todos2", async(req, res) => {
//   const todos2 = await sql `INSERT INTO todos (task,is_completed) VALUES ('Eat jollof rice', false)`
//   res.send(todos2)
// })

app.post("/api/todosPost", async (req, res) => {
  const newTodo = req.body;
  console.log('hhh', newTodo);

  try {
    const result = await sql`
      INSERT INTO todos (task, is_completed)
      VALUES (${newTodo.task}, ${newTodo.is_completed})
    `;

    if (result) {
      res.status(201).send("Successfully Created");
    } else {
      res.status(404).send("Error while creating");
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/deyPlayPost", async(req, res) => {
  const deyPlay = await sql `INSERT INTO deyplay (task, is_completed) VALUES ('Jus Dey Play', false)`
  if(deyPlay) {
    res.status(201).send("Successfully Created")
  } else {
    res.status(404).send("Error while creating")
  }
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
