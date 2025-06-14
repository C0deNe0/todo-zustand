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
                                                                        <h1 key={item.id}>
                                                                                {item.todo}
                                                                        </h1>
                                                                <div>
                                                                        <input type="checkbox" onChange={(e)=>{ todoState.toogleTodo(item.id,e.target.checked)}} />
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
