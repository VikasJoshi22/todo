import { useEffect, useState } from "react";
import { TodoProvider, useTodo } from "../context/Todo";
import TodoForm from "../components/TodoForm";
import TodoItem from "../components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos((prev) => ([{id: Date.now(), ...todo}, ...prev]) );
  }
  const updateTodo = (id, todo)=>{
    setTodos((prev) => (prev.map((t) => (t.id==id ? {...todo, id: t.id} : t))))
  }
  const deleteTodo = (id) => {
    setTodos((prev) => (prev.filter((t)=>(t.id!=id))));
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length){
      setTodos(todos);
    }
  },[]);

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);

  return (
    <TodoProvider value={{updateTodo, deleteTodo, addTodo}}>
      <div className="bg-gray-900 min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="grid gap-y-3">
            {todos.map((t, index)=>{
              return  <div key={t.id} className={`motion-opacity-in-0`} style={{animationDelay: `${(index+2)*100}ms`}}><TodoItem Todo={t}/></div>
            })}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
