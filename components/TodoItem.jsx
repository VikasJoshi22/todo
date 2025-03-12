import { useState } from "react";
import { useTodo } from "../context/Todo";

function TodoItem({ Todo }) {
    const [todo, setTodo] = useState({...Todo});
    const {deleteTodo, updateTodo} = useTodo();
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.msg);
    const [fadeClass, setFadeClass] = useState('');

    return (
        <div
            className={`flex items-center border border-gray-600 rounded-lg px-3 py-1.5 gap-x-3 ${fadeClass}`}
        >
            <input
                type="checkbox"
                className={`cursor-pointer h-6 w-6`}
                onChange={(e)=>{
                    if(e.target.checked==true){
                        setFadeClass('motion-opacity-out-0');
                        setTimeout(() => {
                            deleteTodo(todo.id);
                        }, 300);
                    }
                }}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    isTodoEditable ? "border-gray-700 px-2" : "border-transparent"
                }`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                onKeyDown={(e)=>{
                    if(e.code=='Enter'){
                        setIsTodoEditable(false);
                        updateTodo(todo.id, {...todo, msg: todoMsg});
                    }
                }}
                onClick={()=>{
                    setIsTodoEditable(true)
                }}
                onBlur={()=>{
                    setIsTodoEditable(false);
                }}
            />

            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm  justify-center items-center bg-gray-700 hover:bg-gray-600 shrink-0"
                onClick={() => {
                    setIsTodoEditable((prev) => !prev);
                    updateTodo(todo.id, {...todo, msg: todoMsg});
                }}
            >
                {isTodoEditable ? "📁" : "✏️"}
            </button>
        </div>
    );
}

export default TodoItem;
