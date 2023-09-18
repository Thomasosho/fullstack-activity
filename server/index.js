import express from "express";
import sql from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.get("/", (req, res) => {
  res.send("Welcome to the todo list backend");
});

app.get("/api/deyPlay", async (req, res) => {
  const todos = await sql`SELECT * FROM todos`;
  if (todos) {
    res.status(200).send(todos);
  } else {
    res.status(404).send("Error here!");
  }
});

app.post("/api/deyPlayPost", async (req, res) => {
  const { task, is_completed } = req.body;
  // const task = req.body.task;
  // const is_completed = req.body.is_completed;
  const deyPlayPost =
    await sql`INSERT INTO todos (task, is_completed) VALUES (${task}, ${is_completed}) RETURNING *`;
  if (deyPlayPost) {
    res.status(201).send(deyPlayPost);
  } else {
    res.status(500).send("Internal server Error");
  }
});

app.put("/api/deyPlayPost/:id", async (req, res) => {
  const { id } = req.params;
  // const id = req.params.id
  const { task, is_completed } = req.body;

  try {
    const updatedTodo = await sql`
      UPDATE todos
      SET task = ${task}, is_completed = ${is_completed}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updatedTodo && updatedTodo.length > 0) {
      res.status(200).json(updatedTodo[0]);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).send("Internal server error");
  }
});

// app.put("/api/deyPlayPostTick/:id", async (req, res) => {
//   const { id } = req.params;
//   const { is_completed } = req.body;

//   try {
//     const updatedTodo = await sql`
//       UPDATE todos
//       SET is_completed = ${is_completed}
//       WHERE id = ${id}
//       RETURNING *
//     `;

//     if (updatedTodo && updatedTodo.length > 0) {
//       res.status(200).json(updatedTodo[0]);
//     } else {
//       res.status(404).send("Todo not found");
//     }
//   } catch (error) {
//     console.error("Error updating todo:", error);
//     res.status(500).send("Internal server error");
//   }
// });

app.delete("/api/deyPlayPost/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo =
      await sql`DELETE FROM todos WHERE id = ${id} RETURNING *`;

    if (deletedTodo && deletedTodo.length > 0) {
      res.status(200).json(deletedTodo[0]);
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).send("Internal server error");
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
