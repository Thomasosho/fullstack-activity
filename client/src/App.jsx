import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);

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
        const response = await fetch('http://localhost:3000/data');

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // Handle the data by updating the state
        console.log('Osho', data);
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTodos();
  }, []); 


  return (
    <>
      <h1>T0-do List</h1>
      <input type="text" />
      <button type="button">Delete</button>
      <ul>
        {
          todos.map((todo, index) => (
            <li key={index}>
              <input type="checkbox"/> {todo.task} 
              <button type="button">
                Delete
              </button>
            </li>
          ))
        }
      </ul>
    </>
  )
}

export default App
