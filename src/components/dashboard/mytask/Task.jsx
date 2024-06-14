import { useDrag } from "react-dnd";

const Task = ({ task }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="bg-gray-200 mb-2 rounded p-2"
    >
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
};

export default Task;
