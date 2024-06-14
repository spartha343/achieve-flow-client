import { useEffect, useState } from "react";
import TaskModal from "../../../components/dashboard/TaskModal";
import TaskContainer from "../../../components/dashboard/mytask/TaskContainer";
import useGetUserDataFromDB from "../../../hooks/getUserDataFromDB/useGetUserDataFromDB";

const MyTasks = () => {
  const { _id } = useGetUserDataFromDB() ?? {};
  const [tasks, setTasks] = useState({ toDo: [], ongoing: [], completed: [] });

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await fetch(
        `https://achieve-flow-server.vercel.app/api/v1/tasks/${_id}`
      ).then((res) => res.json());

      const toDo = data.filter((task) => task.status === "to-do");
      const ongoing = data.filter((task) => task.status === "ongoing");
      const completed = data.filter((task) => task.status === "completed");

      setTasks({ toDo, ongoing, completed });
    };
    if (_id) {
      fetchTasks();
    }
  }, [_id]);

  const handleDropTask = async (taskId, newStatus) => {
    await fetch(
      `https://achieve-flow-server.vercel.app/api/v1/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      }
    );

    setTasks((prevTasks) => {
      // Define a mapping from status to state keys
      const statusMap = {
        "to-do": "toDo",
        ongoing: "ongoing",
        completed: "completed"
      };

      // Create a new object with updated tasks
      const updatedTasks = {
        toDo: prevTasks.toDo.filter((task) => task._id !== taskId),
        ongoing: prevTasks.ongoing.filter((task) => task._id !== taskId),
        completed: prevTasks.completed.filter((task) => task._id !== taskId)
      };

      // Find the moved task
      const movedTask = [
        ...prevTasks.toDo,
        ...prevTasks.ongoing,
        ...prevTasks.completed
      ].find((task) => task._id === taskId);

      if (movedTask) {
        movedTask.status = newStatus;
        updatedTasks[statusMap[newStatus]].push(movedTask); // Use statusMap to get the correct key
      }

      return updatedTasks;
    });
  };

  return (
    <div className="mx-3">
      <h2 className="text-xl text-center">Manage Your task</h2>
      <TaskModal />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <TaskContainer
          title="To Do"
          tasks={tasks.toDo}
          onDropTask={handleDropTask}
        />
        <TaskContainer
          title="Ongoing"
          tasks={tasks.ongoing}
          onDropTask={handleDropTask}
        />
        <TaskContainer
          title="Completed"
          tasks={tasks.completed}
          onDropTask={handleDropTask}
        />
      </div>
    </div>
  );
};

export default MyTasks;
