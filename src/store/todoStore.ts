import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type TodoType = {
        id: number;
        todo: string;
        isDone: boolean;
};

type States = {
        todos: Array<TodoType> | [];
};

type Actions = {
        addTodo: (todo: TodoType) => void;
        // deleteTodo: ()
        toogleTodo: (id:number, isChecked: boolean) => void;
};

export const todoStore = create<States & Actions>()(
        devtools(
                persist(
                        (set) => ({
                                todos: [],
                                addTodo: (todo: TodoType) =>
                                        set((state) => ({ todos: [todo, ...state.todos] })),
                                toogleTodo:(id:number,isChecked:boolean) => set((state)=> ({
                                    todos:  state.todos.map((item)=>{
                                        if(item.id === id) {
                                                item.isDone =isChecked
                                        }
                                        return item
                                    })
                                }))
                            }),
                        { name: 'todoStore' }
                )
        )
);
