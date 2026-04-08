import { useState, useMemo } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTrash,
  faCheck,
  faCancel,
  faEdit,
  faAdd,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import FilterBar from "./components/FilterBar.tsx";
import TaskInput from "./components/TaskInput.tsx";
import TodoList from "./components/TodoList";

library.add(faTrash, faCheck, faCancel, faEdit, faAdd, faMoon, faSun);

// ID, title, completed
interface ToDo {
  id: number;
  title: string;
  isCompleted: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [currentEdit, setCurrentEdit] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [filter, setFilter] = useState("all");

  const isEditing = currentEdit !== null;
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addToDo = () => {
    if (!inputValue.trim()) return;

    const newToDO: ToDo = {
      id: Date.now(),
      title: inputValue,
      isCompleted: false,
    };
    setTodos([...todos, newToDO]);

    setInputValue("");
  };

  const counts = useMemo(() => {
    return {
      all: todos.length,
      pending: todos.filter((todo) => !todo.isCompleted).length,
      completed: todos.filter((todo) => todo.isCompleted).length,
    };
  }, [todos]);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "pending") return !todo.isCompleted;
      if (filter === "completed") return todo.isCompleted;
      return true;
    });
  }, [todos, filter]);

  const deleteToDo = (id: number) => {
    const newState = todos.filter((todos: ToDo) => todos.id !== id);
    if (isEditing && currentEdit === id) {
      setCurrentEdit(null);
    }
    setTodos(newState);
  };

  const completeToDo = (id: number) => {
    const newState = todos.map((todo: ToDo) => {
      return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
    });
    setTodos(newState);
  };

  const editToDo = (todo: ToDo) => {
    setCurrentEdit(todo.id);
    setEditValue(todo.title);
  };

  const updateToDo = () => {
    const newState = todos.map((todo: ToDo) => {
      return todo.id === currentEdit ? { ...todo, title: editValue } : todo;
    });
    setTodos(newState);
    setCurrentEdit(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setCurrentEdit(null);
    setEditValue("");
  };

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <div className="container">
        <div className={`themeButtons ${isDark ? "dark" : "light"}`}>
          <button className="theme-icon" onClick={() => setIsDark(!isDark)}>
            {" "}
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
          </button>
        </div>
        <TaskInput inputValue={inputValue} onInputChange={onInputChange} addToDo={addToDo} />
        <FilterBar filter={filter} setFilter={setFilter} count={counts} />
        <TodoList
          todos={filteredTodos}
          filter={filter}
          currentEdit={currentEdit}
          editValue={editValue}
          setEditValue={setEditValue}
          completeToDo={completeToDo}
          deleteToDo={deleteToDo}
          editToDo={editToDo}
          updateToDo={updateToDo}
          cancelEdit={cancelEdit}
        />
      </div>
    </div>
  );
};

export default App;
