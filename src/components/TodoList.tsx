import TodoItem from "./TodoItem";
import hiImage from "../assets/hi.png";

interface ToDo {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface Props {
  todos: ToDo[];
  filter: string;
  currentEdit: number | null;
  editValue: string;
  setEditValue: (val: string) => void;
  completeToDo: (id: number) => void;
  deleteToDo: (id: number) => void;
  editToDo: (todo: ToDo) => void;
  updateToDo: () => void;
  cancelEdit: () => void;
}

const TodoList = ({
  todos,
  filter,
  ...props
}: Props) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <div className="hi-image">
          <img src={hiImage} alt="Empty state" />
        </div>

        {filter === "pending" ? (
          <p className="empty-text">No pending tasks! Great job!</p>
        ) : filter === "completed" ? (
          <p className="empty-text">No completed tasks yet</p>
        ) : (
          <p className="empty-text">No tasks? Suspicious. Add one.</p>
        )}
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...props} />
      ))}
    </div>
  );
};

export default TodoList;