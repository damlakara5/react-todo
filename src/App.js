import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([
    {todo : "Learn Javascript" , status: "completed"},
    {todo : "Learn React" , status: "active"},
    {todo : "Have a life!" , status: "active"},
    
  ])
const [inputValue, setInputValue] = useState("")
const hasCompletedTodos = todos.some(todo => todo.status === "completed");


  const handleAddTodo = (e) => {

    if(e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setTodos(prevState => ([
        ...prevState,
        { todo: inputValue, status: "active" }
      ]));
      setInputValue(''); // Clear the input field
    }
  }

  const changeStatus = (todoItem) => {
    setTodos(todos.map(item => {
      if (item.todo === todoItem.todo) {
        return { ...item, status: item.status === 'active' ? 'completed' : 'active' };
      }
      return item;
    }));
  }

  const handleRemoveTodo = (todo) => {
    const newTodo = todos.filter(el => el.todo !== todo.todo)
    setTodos(newTodo)
  }

  useEffect(() => {
    console.log(todos)
  } , [todos])

  return (
  <>
      <section className="todoapp">
	<header className="header">
		<h1>todos</h1>
		<form >
			<input className="new-todo" placeholder="What needs to be done?"  value={inputValue} onChange={(e) => 
  setInputValue(e.target.value)} onKeyDown={handleAddTodo} autoFocus />
		</form>
	</header>
	
	<section className="main">
		<input className="toggle-all" type="checkbox" />
		<label for="toggle-all">
			Mark all as complete
		</label>

		<ul className="todo-list">
			
			{
        todos.map(todo => 
          <li className={`${todo.status === "completed" && "completed"}`}  >
            <div className="view">
              <input className="toggle" type="checkbox" onClick={(e) => changeStatus(todo) } />
              <label> {todo.todo} </label>
              <button className="destroy" onClick={() => handleRemoveTodo(todo)} ></button>
            </div>
          </li>
          )
      }
		
		</ul>
	</section>

	<footer className="footer">
		<span className="todo-count">
			<strong> {todos.length} </strong>
			items left
		</span>

		<ul className="filters">
			<li>
				<a href="#/" className="selected">All</a>
			</li>
			<li>
				<a href="#/"  onClick={() => setTodos(todos.filter(el => el.status === "active" ))}>Active</a>
			</li>
			<li>
				<a href="#/"  onClick={() => setTodos(todos.filter(el => el.status === "completed" ))}>Completed</a>
			</li>
		</ul>

    {hasCompletedTodos && (
      <button
        onClick={() => setTodos(todos.filter(el => el.status === "active"))}
        className="clear-completed"
      >
        Clear completed
      </button>
    )}
	</footer>
</section>

<footer className="info">
	<p>Click to edit a todo</p>
	<p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
	<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
</footer>
  </>
  );
}

export default App;
