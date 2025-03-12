import { useState } from "react";
import { useTodo } from "../context/Todo";

function TodoForm() {
    const {todos, addTodo} = useTodo()
    const [todo, setTodo] = useState("");

    return (
        <form onSubmit={(e)=>{
            e.preventDefault();
            addTodo({id: Date.now(), msg: todo});
            setTodo('');
        }} className="flex">
            <input
                id="todoInput"
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-gray-600 rounded-l-lg px-3 outline-none duration-150 bg-gray-700 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white">
                Add
            </button>
        </form>
    );
}

export default TodoForm;

