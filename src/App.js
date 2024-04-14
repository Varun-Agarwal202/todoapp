import './App.css';
import { useState, useEffect } from "react";
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    fetch('/api/data')
    .then(response => response.json())
    .then(data => setData(data));
  }, []);
  const addToDo = () => {
    if (todo !== "") {
      fetch('http://localhost:8081/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: todo }),
      })
      .then(response => response.json())
      .then(newTodo => {
        // Update the state with the new todo
        setTodos([...todos, newTodo]);
        setTodo(""); // Clear the todo input field
      })
      .catch(err => console.log(err));
    }
  }
  
  const deleteToDo = (todoId) => {
    fetch(`http://localhost:8081/deleteTodo/${todoId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      const newTodos = todos.filter((todo) => todo.id !==todoId);
      setTodos(newTodos);
    })
    .catch(err => console.log(err));
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/users')
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
      .catch(err => console.log(err));
  }, [todos]);
  return (
    <div className="App">
      <h1>React To Do App</h1>
      
    
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addToDo} />
      <TodoList todos={data} deleteToDo={deleteToDo} />
    </div>
  );
}

export default App;
