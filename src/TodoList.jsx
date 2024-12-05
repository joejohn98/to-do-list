import { useReducer, useState } from "react";

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: Date.now(), text: action.payload, completed: false },
      ];
    case "REMOVE":
      return state.filter((task) => task.id !== action.payload);
    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );

    default:
      return state;
  }
};

const TodoList = () => {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const [taskText, setTaskText] = useState("");

  const handleAddTask = () => {
    dispatch({ type: "ADD_TASK", payload: taskText });
    setTaskText('')
  };

  return (
    <div>
      <h2>Todo List</h2>
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add Task.."
      />
      <button onClick={handleAddTask}>Add Todo</button>
      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{ textDecoration: task.completed ? "line-through" : "" }}
            onClick={() => dispatch({ type: "TOGGLE_TASK", payload: task.id })}
          >
            <span>
              <strong>{task.text}</strong>
            </span>
            <button
              onClick={() => dispatch({ type: "REMOVE", payload: task.id })}
              style={{marginLeft:'5px'}}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
