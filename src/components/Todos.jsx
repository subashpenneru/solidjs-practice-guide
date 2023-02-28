import { createEffect, createSignal, For } from 'solid-js';
import { createStore, produce } from 'solid-js/store';
import { useCounter } from '../context/counter';

function Todos() {
  const [count] = useCounter();
  let todoId = 0;
  let input;
  const [todos, setTodos] = createStore([]);

  createEffect(() => {
    console.log(count());
  });

  const addTodo = (text) => {
    // const [completed, setCompleted] = createSignal(false);
    // setTodos([...todos, { id: ++todoId, text, completed: false }]);
    setTodos(
      produce((todos) => {
        todos.push({ id: ++todoId, text, completed: false });
      })
    );
  };
  const toggleTodo = (id) => {
    // const todo = todos().find((t) => t.id === id);
    // if (todo) todo.setCompleted(!todo.completed());
    // setTodos(
    //   (todo) => todo.id === id,
    //   'completed',
    //   (completed) => !completed
    // );
    setTodos(
      (todo) => todo.id === id,
      produce((todo) => (todo.completed = !todo.completed))
    );
  };

  return (
    <>
      <div>
        <input ref={input} />
        <button
          onClick={(e) => {
            if (!input.value.trim()) return;
            addTodo(input.value);
            input.value = '';
          }}>
          Add Todo
        </button>
      </div>
      <For each={todos}>
        {(todo) => {
          const { id, text } = todo;
          console.log(`Creating ${text}`);
          return (
            <div>
              <input
                type='checkbox'
                checked={todo.completed}
                onchange={[toggleTodo, id]}
              />
              <span
                style={{
                  'text-decoration': todo.completed ? 'line-through' : 'none',
                }}>
                {text}
              </span>
            </div>
          );
        }}
      </For>
    </>
  );
}

export default Todos;
