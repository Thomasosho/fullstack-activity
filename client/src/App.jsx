import { useEffect, useState } from "react";
import "./App.css";
// import routes from "routes.js";

function App() {
  const [todos, setTodos] = useState([]);
  const [taskInputValue, setTaskInputValue] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTaskText, setEditedTaskText] = useState("");

  // const [tick, setTick] = useState(false);

  // console.error('rick', tick);

  // const sendTick = async (id) => {
  //   setTick(prev => !prev);
  //   try {
  //     const response = await fetch(`http://localhost:3000/api/deyPlayPostTick/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         is_completed: tick,
  //       }),
  //     });

  //     console.error('response', response.json());

  //     if (response.ok) {
  //       setTodos((prevTodos) =>
  //         prevTodos.map((todo) =>
  //           todo.id === id ? { ...todo, is_completed: tick } : todo
  //         )
  //       );
  //     } else {
  //       console.error("Failed to update todo");
  //     }
  //   } catch (error) {
  //     console.error("Error updating todo:", error);
  //   }
  // };

  const startEdit = (id, taskText) => {
    setEditTaskId(id);
    setEditedTaskText(taskText);
  }

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditedTaskText("");
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/deyPlay");

        if (!response.ok) {
          alert("Network response was not ok");
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodoSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/deyPlayPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: taskInputValue,
          is_completed: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTaskInputValue("");
      setTodos((todos) => todos.concat(data));
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/deyPlayPost/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted item from the local state (todos)
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.error("Failed to delete todo");
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/deyPlayPost/${id}`, {
        method: "PUT", // Use PUT method to update the task
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          task: editedTaskText,
          is_completed: false, // You can set this based on your logic
        }),
      });

      if (response.ok) {
        // Update the task in the local state (todos)
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === id ? { ...todo, task: editedTaskText } : todo
          )
        );

        // Reset edit state
        cancelEdit();
      } else {
        console.error("Failed to update todo");
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-black">
      <h1 className="text-white font-semibold text-4xl mt-4 mb-6">
        To-do List
      </h1>
      <form onSubmit={handleAddTodoSubmit} className="mb-4">
        <div className="flex">
          <input
            className="border p-2 flex-1 rounded-l"
            type="text"
            name="task"
            value={taskInputValue}
            onChange={(event) => {
              setTaskInputValue(event.target.value);
            }}
            placeholder="Add a task..."
          />
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-r hover:text-white hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </form>
      <ul className="list-disc pl-4">
        {todos.map((todo, i) => (
          <li key={i} className="flex items-center mb-2">
            <input
              type="checkbox"
              // checked={tick}
              onChange={() => sendTick(todo.id) }
              className="mr-2 form-checkbox h-5 w-5 text-yellow-500"
            />
            {editTaskId === todo.id ? (
              <>
                <input
                  type="text"
                  className="flex-1 border rounded p-1 text-black-300"
                  value={editedTaskText}
                  onChange={(event) => setEditedTaskText(event.target.value)}
                />
                <button
                  type="button"
                  onClick={() => saveEdit(todo.id)}
                  className="text-green-500 hover:text-green-700 pl-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="text-red-500 hover:text-red-700 pl-2"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 text-white">{todo.task}</span>
                <button
                  type="button"
                  onClick={() => startEdit(todo.id, todo.task)}
                  className="text-yellow-500 hover:text-yellow-700 pr-5"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
