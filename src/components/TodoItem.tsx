// A single row containing the task text and the Edit/Delete/Check buttons.
import { faCancel } from "@fortawesome/free-solid-svg-icons/faCancel";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faEdit } from "@fortawesome/free-solid-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ToDo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface TodoItemProps {
  todo:ToDo,
  isEditing: boolean,
  setCurrentEdit: (id: number | null) => void,
  setEditValue: (value: string) => void,
  deleteToDo: (id: number) => void,
  completeToDo: (id: number) => void,
}

const TodoItem = ({todo, isEditing, setCurrentEdit, setEditValue, deleteToDo, completeToDo}: TodoItemProps) => {
  return (
    <div className="todo-item">
      <span className={todo.isCompleted ? "completed" : ""}>{todo.title}</span>
      <div className="buttons">
        <button onClick={() => completeToDo(todo.id)}>
          {todo.isCompleted ? <FontAwesomeIcon icon={faCancel} /> : <FontAwesomeIcon icon={faCheck} />}
        </button>
        <button onClick={() => {
          setCurrentEdit(todo.id);
          setEditValue(todo.title);
        }} disabled={isEditing}>
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button onClick={() => deleteToDo(todo.id)} disabled={isEditing}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  )
};

export default TodoItem;
