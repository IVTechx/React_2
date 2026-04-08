//  The form at the top to type and submit new tasks.
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface TaskInputProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addToDo: () => void;
}


const TaskInput = ({inputValue, onInputChange, addToDo}: TaskInputProps) => {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addToDo();
  };
  return (
    <form onSubmit={handleSubmit} className="task-input">
      <h1 className="form-title">To Do List</h1>
      <div className="input-group">
        <input
          type="text"
          className="main-input"
          onChange={onInputChange}
          value={inputValue}
          placeholder="Type task description..."
        />
        <button type="submit" className="add-btn" disabled={!inputValue.trim()}>
          <FontAwesomeIcon icon={faAdd} /> Add{" "}
        </button>
      </div>
    </form>
  );
};

export default TaskInput;
