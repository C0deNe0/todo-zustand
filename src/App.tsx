import React, { useState } from 'react';
import { todoStore } from './store/todoStore';

function App() {
        const [todo, setTodo] = useState('');
        //for the methods
        const todoState = todoStore();

        const randomeId = (): number => {
                const min = 1000;
                const max = 9999;

                //this just to get some random number which we will use as a ID
                return Math.round(Math.random() * (max - min + 1) + min);
        };

        const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();

                if (todo.length > 0) {
                        todoState.addTodo({
                                id: randomeId(),
                                todo: todo,
                                isDone: false,
                        });

                        setTodo('');
                }
        };

        return (
                <>
                        <div className="h-screen w-screen flex justify-center items-center">
                                <div className="w-[600px] p-3 rounded-md shadow-lg bg-green-950 ">
                                        <h1 className="font-bold text-3xl">ToDos</h1>
                                        <p>Add a todo</p>

                                        <form onSubmit={handleSubmit}>
                                                <div className="">
                                                        <input
                                                                type="text"
                                                                className="w-full p-4 h-10 rounded-md  border border-amber-300"
                                                                placeholder="enter your todo here"
                                                                onChange={(e) =>
                                                                        setTodo(e.target.value)
                                                                }
                                                                value={todo}
                                                        />
                                                </div>
                                        </form>

                                        <div className="mt-5">
                                                {todoState.todos.length > 0 &&
                                                        todoState.todos.map((item) => (
                                                                <div className="w-full rounded-lg p-2 border border-amber-400 mb-2 flex justify-between items-cente" key={item.id}>
                                                                        <h1 className={`${item.isDone ? "line-through":""}`}>
                                                                                {item.todo}
                                                                        </h1>
                                                                <div className='flex p-2 '>
                                                                        <input type="checkbox" onChange={(e)=>{ todoState.toogleTodo(item.id,e.target.checked)}} checked={item.isDone} />
                                                                        
                                                                <button onClick={()=> todoState.deleteTodo(item.id)}>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash2-icon lucide-trash-2 text-red-700 ml-2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                                                </button>
                                                                </div>
                                                                </div>
                                                        ))}
                                        </div>
                                </div>
                        </div>
                </>
        );
}

export default App;
