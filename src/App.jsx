import { createEffect, createSignal, onMount } from 'solid-js';

import { selected } from './App.module.css';
import { CounterProvider } from './context/counter';
import Nested from './Nested';
import Todos from './Todos';

function App() {
  const [toggle, setToggle] = createSignal(false);

  const onClickHandler = (data, event) => {
    console.log(event, data);
  };

  return (
    <>
      <h1>App Component</h1>
      <button onClick={[onClickHandler, 'Subash']}>Click</button>
      <button
        onClick={() => setToggle((prev) => !prev)}
        classList={{ [selected]: toggle() }}>
        Toggle Class
      </button>

      <br />
      <br />
      <CounterProvider count={1}>
        <Todos />
        <br />
        <br />
        <Nested />
      </CounterProvider>
    </>
  );
}

export default App;
