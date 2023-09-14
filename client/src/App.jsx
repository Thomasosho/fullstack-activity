import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState([]);

  // Normal Promise
  // useEffect(() => {
  //   // Make a fetch GET request to your API endpoint
  //   fetch('http://localhost:3000/data')
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       // Handle the data by updating the state
  //       setTodos(data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // Async Await
  useEffect(() => {
    async function fetchTodos() {
      try {
        // Make a fetch GET request to your API endpoint
        const response = await fetch("http://localhost:3000/api/todos");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // Handle the data by updating the state
        console.log("Osho", data);
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTodos();
  }, []);

  const addTodo = async (e) => {
    e.preventDefault();
    let response = await fetch("http://127.0.0.1:3000/api/todosPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task: task,
        is_completed: false,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Success:", data);
    } else {
      console.log("Error:", response);
    }
  };

  return (
    <>
      <h1>T0-do List</h1>
      <form onSubmit={addTodo} method="post">
        <input
          name="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          type="text"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input type="checkbox" /> {todo.task}
            <button type="button">Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
