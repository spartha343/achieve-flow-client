import Task from "./Task";
import { useDrop } from "react-dnd";

const TaskContainer = ({ title, tasks, onDropTask }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => onDropTask(item.id, title.toLowerCase().replace(" ", "-")), // Ensure consistent status value
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      style={{ backgroundColor: isOver ? "lightgrey" : "white" }}
      className="border-2 p-5 rounded-lg mx-3"
    >
      <h2>{title}</h2>
      {tasks.map((task) => (
        <Task key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TaskContainer;
