import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCancel, faEdit } from "@fortawesome/free-solid-svg-icons";

interface ToDo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Props {
  todo: ToDo;
  currentEdit: number | null;
  editValue: string;
  setEditValue: (val: string) => void;
  completeToDo: (id: number) => void;
  deleteToDo: (id: number) => void;
  editToDo: (todo: ToDo) => void;
  updateToDo: () => void;
  cancelEdit: () => void;
}


const TodoItem = ({
  todo,
  currentEdit,
  editValue,
  setEditValue,
  completeToDo,
  deleteToDo,
  editToDo,
  updateToDo,
  cancelEdit,
}: Props) => {
  const isEditing = currentEdit === todo.id;

  return (
    <div className="todo-card">
      <div className="todo-info">
        <button
          className="done-btn todo-actions-button"
          onClick={() => completeToDo(todo.id)}
        >
          <FontAwesomeIcon icon={todo.isCompleted ? faCancel : faCheck} />
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editValue}
            autoFocus
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
            onKeyDown={(e) => {
              if (e.key === "Enter" && editValue.trim()) updateToDo();
              if (e.key === "Escape") cancelEdit();
            }}
          />
        ) : (
          <span className={`todo-title ${todo.isCompleted ? "completed" : ""}`}>
            {todo.title}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <>
            <button
              className="todo-actions-button update-btn"
              disabled={!editValue.trim()}
              onClick={updateToDo}
            >
              Update
            </button>
            <button className="todo-actions-button cancel-btn" onClick={cancelEdit}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              className="todo-actions-button edit-btn"
              onClick={() => editToDo(todo)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              className="todo-actions-button delete-btn"
              onClick={() => deleteToDo(todo.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;