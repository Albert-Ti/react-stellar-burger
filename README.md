# Каноническая работа проекта Stellar Burger 
# Этап "Промежуточный проект. CRA-заготовка и структура папок под компоненты"

## Учебный сайт
## Сделан сайт в Яндекс Практикум, Альбертом Тайгибовым.

## Использованы технологии: HTML, CSS, JavaScript, REACT-JS

__React__ - это библиотека JavaScript, используемая для разработки пользовательских интерфейсов. Он позволяет создавать компоненты, которые являются переиспользуемыми и управляемыми независимыми частями пользовательского интерфейса.

Основные принципы и концепции React включают:

   1. Компонентный подход: Приложение строится из набора компонентов, которые взаимодействуют друг с другом. Компоненты могут содержать вложенные компоненты, что позволяет создавать иерархию компонентов.

   2. Виртуальный DOM: React использует виртуальный DOM для эффективного обновления только измененных частей интерфейса. Он сравнивает виртуальный DOM с реальным DOM и обновляет только необходимые элементы.

   3. JSX: Это расширение синтаксиса JavaScript, позволяющее писать HTML-подобный код прямо в JavaScript-файлах. JSX облегчает создание компонентов и их композицию.

   4. Состояние (State) и свойства (Props): Состояние используется для хранения данных, которые могут изменяться в процессе работы приложения. Свойства передаются в компоненты сверху вниз и представляют собой данные, передаваемые из родительского компонента.

   5. Жизненный цикл компонента: Компоненты React имеют различные методы жизненного цикла, такие как componentDidMount, componentDidUpdate и componentWillUnmount, которые позволяют выполнять определенные действия на разных этапах жизни компонента.

   6. Хуки (Hooks): Хуки - это новое API, представленное в React 16.8, которое позволяет функциональным компонентам использовать состояние и другие возможности, ранее доступные только классовым компонентам. Они облегчают управление состоянием и побочными эффектами.

React широко используется в разработке одностраничных приложений (SPA) и мобильных приложений. Он предоставляет эффективный и масштабируемый способ создания пользовательского интерфейса с помощью компонентного подхода и управления состоянием.



## Шпаргалка по REACT (основы)

Создание компонента:
```jsx
Copy code
import React from 'react';

class MyComponent extends React.Component {
  render() {
    return <div>Hello, World!</div>;
  }
}

export default MyComponent;
```


Рендеринг компонента:
```jsx
Copy code
import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

ReactDOM.render(<MyComponent />, document.getElementById('root'));
Состояние и обработка событий:
jsx
Copy code
import React from 'react';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.increment()}>Increment</button>
      </div>
    );
  }
}
```


Пропсы:
```jsx
Copy code
import React from 'react';

class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

export default Greeting;
jsx
Copy code
import React from 'react';
import Greeting from './Greeting';

class App extends React.Component {
  render() {
    return <Greeting name="Alice" />;
  }
}
```


Жизненный цикл компонента:
```jsx
Copy code
import React from 'react';

class MyComponent extends React.Component {
  componentDidMount() {
    // Вызывается после монтирования компонента
  }

  componentDidUpdate(prevProps, prevState) {
    // Вызывается после обновления компонента
  }

  componentWillUnmount() {
    // Вызывается перед размонтированием компонента
  }

  render() {
    return <div>My Component</div>;
  }
}
```



## REACT хуки (основыы)


useState - для работы со состоянием компонента:
```jsx
Copy code
import React, { useState } from 'react';

function MyComponent() {
  const [state, setState] = useState(initialState);

  // Изменение состояния
  setState(newState);

  return (
    <div>
      <p>State: {state}</p>
    </div>
  );
}
```


useEffect - для выполнения побочных эффектов (загрузка данных, подписка на события и т.д.):
```jsx
Copy code
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Выполнение побочного эффекта

    return () => {
      // Очистка или отмена побочного эффекта при размонтировании компонента
    };
  }, [dependency]);
  
  return <div>My Component</div>;
}
```

useContext - для работы с контекстом:
```jsx
Copy code
import React, { useContext } from 'react';

const MyContext = React.createContext();

function MyComponent() {
  const value = useContext(MyContext);

  return <div>Context Value: {value}</div>;
}
```


useReducer - для управления сложным состоянием с помощью редуктора (похож на Redux):
```jsx
Copy code
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}
```


useRef - для получения ссылки на DOM-элемент или сохранения значения между рендерами:
```jsx
Copy code
import React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus Input</button>
    </div>
  );
}
```